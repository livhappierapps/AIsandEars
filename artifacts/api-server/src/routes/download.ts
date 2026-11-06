import { request as httpsRequest } from "node:https";
import type { IncomingMessage } from "node:http";
import { Router, type Request, type Response } from "express";
import { logger } from "../lib/logger";

const router = Router();

// The previously pinned artifact returns 404. An operator must approve a new release.
function approvedApkUrl(): string | null {
  const raw = process.env.APPROVED_APK_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.search &&
      url.hostname === "expo.dev" &&
      url.pathname.startsWith("/artifacts/eas/")
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}
router.get("/status", (_req, res) => {
  res.json({ apkAvailable: !!approvedApkUrl() && !!process.env.EXPO_TOKEN });
});

/** Follow HTTP redirects server-side, stripping auth on hops after the first. */
function fetchFollowRedirects(
  url: string,
  authHeader: string,
  hopsLeft = 6,
): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const isFirst = hopsLeft === 6;

    const req = httpsRequest(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: "GET",
        headers: isFirst ? { Authorization: authHeader } : {},
      },
      (res) => {
        if (
          res.statusCode != null &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          if (hopsLeft <= 0) {
            reject(new Error("Too many redirects"));
            return;
          }
          res.resume(); // drain and discard body
          const next = new URL(res.headers.location, url).toString();
          resolve(fetchFollowRedirects(next, authHeader, hopsLeft - 1));
        } else {
          resolve(res);
        }
      },
    );

    req.on("error", reject);
    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });
    req.end();
  });
}

/**
 * GET /api/download/apk
 * Resolves the EAS artifact URL through server-side redirect following,
 * then streams the APK directly to the client.
 */
router.get("/apk", async (req: Request, res: Response): Promise<void> => {
  const token = process.env.EXPO_TOKEN;
  const apkUrl = approvedApkUrl();
  if (!token || !apkUrl) {
    res.status(503).json({ error: "APK not available" });
    return;
  }

  try {
    const upstream = await fetchFollowRedirects(apkUrl, `Bearer ${token}`);

    if (upstream.statusCode !== 200) {
      logger.warn(
        { status: upstream.statusCode },
        "APK upstream non-200 after redirects",
      );
      upstream.resume();
      res.status(502).json({ error: "APK unavailable upstream" });
      return;
    }

    res.setHeader("Content-Type", "application/vnd.android.package-archive");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="aisandears.apk"',
    );

    const length = upstream.headers["content-length"];
    if (length) res.setHeader("Content-Length", length);

    res.on("close", () => upstream.destroy());
    upstream.pipe(res);

    upstream.on("error", (err: Error) => {
      logger.error({ err }, "APK stream error");
      if (!res.headersSent) res.status(502).json({ error: "Stream error" });
    });
  } catch (err) {
    logger.error({ err }, "APK download failed");
    if (!res.headersSent) res.status(502).json({ error: "Download failed" });
  }
});

export default router;
