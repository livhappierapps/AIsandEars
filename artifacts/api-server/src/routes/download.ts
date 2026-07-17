import { Router, type Request, type Response } from "express";

const router = Router();

const APK_URL =
  "https://expo.dev/artifacts/eas/KqxuB7hg8lP652ibwoYzKclVMkzTSYrncFWnoXEQLf0.apk";

router.get("/apk", async (_req: Request, res: Response): Promise<void> => {
  const token = process.env.EXPO_TOKEN;
  if (!token) {
    res.status(503).json({ error: "APK not available" });
    return;
  }

  const upstream = await fetch(APK_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!upstream.ok || !upstream.body) {
    res.status(502).json({ error: "Failed to fetch APK" });
    return;
  }

  res.setHeader("Content-Type", "application/vnd.android.package-archive");
  res.setHeader("Content-Disposition", 'attachment; filename="aisandears.apk"');

  const contentLength = upstream.headers.get("content-length");
  if (contentLength) res.setHeader("Content-Length", contentLength);

  const { Readable } = await import("stream");
  Readable.fromWeb(upstream.body as import("stream/web").ReadableStream).pipe(res);
});

export default router;
