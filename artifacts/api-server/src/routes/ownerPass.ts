/**
 * ownerPass.ts — private owner access without Whop.
 *
 *   POST /api/owner-pass { code }
 *   → 404 when OWNER_PASS is unset (or too short to be safe), so the route
 *     looks like it does not exist on deployments that do not use it
 *   → 429 after too many failed attempts from one client
 *   → 401 on a wrong code
 *   → 200 { valid, tier, sessionId, expiresAt, comp: true } on success
 *
 * A successful pass creates the same paid_sessions row a verified Whop
 * membership creates, so the voice socket, vision and music routes accept it
 * unchanged. It is marked as a complimentary owner session through its
 * payment id prefix ("owner_comp_") — never a Whop "mem_" id — so it cannot
 * be confused with a paid membership. No schema change is needed.
 */

import { createHash, randomUUID, timingSafeEqual } from "crypto";
import { Router, type Request, type Response } from "express";
import { storage } from "../storage";
import { logger } from "../lib/logger";

export const OWNER_TIER = "full-monthly"; // voice + vision
export const OWNER_SESSION_HOURS = 24;
export const OWNER_PAYMENT_PREFIX = "owner_comp_";
export const MIN_OWNER_PASS_LENGTH = 24;
export const MAX_FAILED_ATTEMPTS = 5;
export const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

const failures = new Map<string, { count: number; resetAt: number }>();

/** Test hook: clear the in-memory limiter. */
export function resetOwnerPassLimiter(): void {
  failures.clear();
}

function clientKey(req: Request): string {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function digest(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

/** Constant-time comparison on fixed-length hashes (no length leak). */
export function ownerPassMatches(submitted: string, expected: string): boolean {
  return timingSafeEqual(digest(submitted), digest(expected));
}

const router = Router();

router.post("/owner-pass", async (req: Request, res: Response): Promise<void> => {
  const expected = process.env.OWNER_PASS?.trim();
  if (!expected || expected.length < MIN_OWNER_PASS_LENGTH) {
    if (expected) {
      logger.warn(
        "OWNER_PASS is set but shorter than the minimum length; owner pass disabled",
      );
    }
    res.status(404).json({ error: "Not found" });
    return;
  }

  const key = clientKey(req);
  const now = Date.now();
  let entry = failures.get(key);
  if (entry && entry.resetAt <= now) {
    failures.delete(key);
    entry = undefined;
  }
  if (entry && entry.count >= MAX_FAILED_ATTEMPTS) {
    res.setHeader("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
    res.status(429).json({ error: "Too many attempts. Try again later." });
    return;
  }

  const code = (req.body ?? {}).code;
  if (typeof code !== "string" || !code.trim() || code.length > 512) {
    res.status(400).json({ error: "code is required" });
    return;
  }

  if (!ownerPassMatches(code.trim(), expected)) {
    const next = entry ?? { count: 0, resetAt: now + ATTEMPT_WINDOW_MS };
    next.count += 1;
    failures.set(key, next);
    logger.warn({ event: "owner_pass_rejected" }, "Owner pass: wrong code");
    res.status(401).json({ error: "That code didn't work." });
    return;
  }

  failures.delete(key);
  try {
    const session = await storage.createSession({
      id: randomUUID(),
      stripeSessionId: `${OWNER_PAYMENT_PREFIX}${randomUUID()}`, // column name is historical
      tier: OWNER_TIER,
      expiresAt: new Date(now + OWNER_SESSION_HOURS * 60 * 60 * 1000),
      used: false,
    });
    logger.info(
      { event: "owner_pass_session", sessionId: session.id },
      "Owner pass session created",
    );
    res.json({
      valid: true,
      comp: true,
      tier: session.tier,
      sessionId: session.id,
      expiresAt: session.expiresAt?.toISOString() ?? null,
    });
  } catch (err: any) {
    req.log?.error({ err: err?.message }, "Owner pass session error");
    res.status(500).json({ error: "Could not start an owner session" });
  }
});

export default router;
