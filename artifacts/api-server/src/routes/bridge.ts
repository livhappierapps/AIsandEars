/**
 * bridge.ts — Trusted external app session creation
 *
 * Allows a bridge app (e.g. a Leo testing harness or a sibling AI project)
 * to create a paid session without going through the payment system. Gated behind a
 * shared secret key (BRIDGE_API_KEY env var).
 *
 * Flow:
 *   POST /api/bridge/session { apiKey, tier?, durationMinutes? }
 *   → validate apiKey against BRIDGE_API_KEY env var
 *   → create row in paid_sessions
 *   → return { sessionId, tier, expiresAt, wsUrl, visionUrl }
 *
 * The returned sessionId works immediately with:
 *   wss://<domain>/api/grok-live?sessionId=<sessionId>
 *   POST https://<domain>/api/grok-vision  { sessionId, imageData, ... }
 *
 * Security notes:
 *   - Only active if BRIDGE_API_KEY is set in env (silently 404 otherwise)
 *   - Key should be kept server-side in the bridge app — never expose to clients
 *   - Sessions created here are tracked in paid_sessions same as Whop sessions
 *   - Tier defaults to "full-session" (voice + vision, 30 min)
 */

import { timingSafeEqual } from "crypto";
import { Router, type Request, type Response } from "express";
import { storage } from "../storage";
import { logger } from "../lib/logger";

const router = Router();

const VALID_TIERS = new Set([
  "audio-monthly",
  "full-monthly",
  "audio-session",
  "full-session",
]);

router.post("/session", async (req: Request, res: Response): Promise<void> => {
  const bridgeKey = process.env.BRIDGE_API_KEY;

  // If BRIDGE_API_KEY is not configured, this endpoint doesn't exist
  if (!bridgeKey) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const { apiKey, tier = "full-session", durationMinutes = 30 } = req.body as {
    apiKey?: unknown;
    tier?: unknown;
    durationMinutes?: unknown;
  };

  if (typeof apiKey !== "string" || !apiKey) {
    res.status(400).json({ error: "apiKey is required" });
    return;
  }

  // Timing-safe comparison — prevents timing attacks on the key check
  const safeEqual =
    apiKey.length === bridgeKey.length &&
    timingSafeEqual(Buffer.from(apiKey), Buffer.from(bridgeKey));

  if (!safeEqual) {
    logger.warn({ ip: req.ip }, "Bridge session: invalid API key");
    res.status(401).json({ error: "Invalid API key" });
    return;
  }

  const resolvedTier = typeof tier === "string" ? tier : "full-session";
  if (!VALID_TIERS.has(resolvedTier)) {
    res.status(400).json({
      error: `Invalid tier. Valid options: ${[...VALID_TIERS].join(", ")}`,
    });
    return;
  }

  const resolvedDuration =
    typeof durationMinutes === "number" &&
    Number.isFinite(durationMinutes) &&
    durationMinutes >= 1 &&
    durationMinutes <= 480
      ? Math.floor(durationMinutes)
      : 30;

  const expiresAt = new Date(Date.now() + resolvedDuration * 60 * 1000);

  const session = await storage.createSession({
    id: crypto.randomUUID(),
    stripeSessionId: `bridge_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`, // DB column kept as-is
    tier: resolvedTier,
    expiresAt,
  });

  // APP_BASE_URL covers Render/Cloudflare; falls back to Replit vars for backwards compat
  const rawBase =
    process.env.APP_BASE_URL ??
    (process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : null) ??
    (process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]?.trim()}` : null) ??
    "";
  const domain = rawBase.replace(/^https?:\/\//, "").replace(/\/$/, "");

  logger.info(
    { sessionId: session.id, tier: resolvedTier, durationMinutes: resolvedDuration },
    "Bridge session created",
  );

  res.status(201).json({
    sessionId: session.id,
    tier: resolvedTier,
    expiresAt: expiresAt.toISOString(),
    durationMinutes: resolvedDuration,
    // Plug these directly into your bridge app
    wsUrl: `wss://${domain}/api/grok-live?sessionId=${session.id}`,
    visionUrl: `https://${domain}/api/grok-vision`,
  });
});

export default router;
