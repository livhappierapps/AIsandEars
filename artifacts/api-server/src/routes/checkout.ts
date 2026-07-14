import { Router, type IRouter } from "express";
import { getWhopClient } from "../whopClient";
import { storage } from "../storage";
import crypto from "crypto";

const router: IRouter = Router();

const VALID_TIERS = new Set(["audio-monthly", "full-monthly", "audio-session", "full-session"]);

// Whop plan IDs — set via env vars after running seedWhop
const WHOP_PLAN_IDS: Record<string, string | undefined> = {
  "audio-monthly": process.env.WHOP_PLAN_AUDIO_MONTHLY,
  "full-monthly": process.env.WHOP_PLAN_FULL_MONTHLY,
  "audio-session": process.env.WHOP_PLAN_AUDIO_SESSION,
  "full-session": process.env.WHOP_PLAN_FULL_SESSION,
};

function getBaseUrl() {
  const domain = process.env.REPLIT_DOMAINS?.split(",")[0];
  return domain ? `https://${domain}` : "http://localhost:80";
}

const ALLOWED_CUSTOM_PREFIXES = ["ais-and-ears-native://"];

// POST /api/checkout
// Body: { tier, successUrl?, cancelUrl? }
router.post("/checkout", async (req, res): Promise<void> => {
  const {
    tier,
    successUrl: customSuccessUrl,
    cancelUrl: customCancelUrl,
  } = req.body;

  if (!tier) {
    res.status(400).json({ error: "tier is required" });
    return;
  }
  if (!VALID_TIERS.has(tier)) {
    res.status(400).json({
      error: `Invalid tier. Must be one of: ${[...VALID_TIERS].join(", ")}`,
    });
    return;
  }

  const planId = WHOP_PLAN_IDS[tier];
  if (!planId) {
    res.status(503).json({
      error: "payment_unavailable",
      message: "Whop plan not configured. Check WHOP_PLAN_* environment variables.",
    });
    return;
  }

  const baseUrl = getBaseUrl();

  if (customSuccessUrl) {
    const isAllowed =
      customSuccessUrl.startsWith(baseUrl) ||
      ALLOWED_CUSTOM_PREFIXES.some((p) => customSuccessUrl.startsWith(p));
    if (!isAllowed) {
      res.status(400).json({ error: "Invalid successUrl scheme" });
      return;
    }
  }
  if (customCancelUrl) {
    const isAllowed =
      customCancelUrl.startsWith(baseUrl) ||
      ALLOWED_CUSTOM_PREFIXES.some((p) => customCancelUrl.startsWith(p));
    if (!isAllowed) {
      res.status(400).json({ error: "Invalid cancelUrl scheme" });
      return;
    }
  }

  const redirectUrl = customSuccessUrl ?? `${baseUrl}/?success=true&tier=${encodeURIComponent(tier)}`;

  try {
    const whop = await getWhopClient();
    const result = await whop.checkoutConfigurations.create({
      plan_id: planId,
      redirect_url: redirectUrl,
    });

    res.json({
      url: result.purchase_url ?? `https://whop.com/checkout/${planId}`,
      checkoutId: result.id,
      tier,
    });
  } catch (err: any) {
    req.log?.error({ err: err.message }, "Whop checkout error");
    res.status(503).json({
      error: "payment_unavailable",
      message: err.message ?? "Failed to create Whop checkout",
    });
  }
});

// GET /api/checkout/verify?membership_id=mem_xxx&tier=audio-monthly
// Called after Whop redirects back with membership_id in query params.
// Verifies with Whop that the membership is valid before creating a DB session.
router.get("/checkout/verify", async (req, res): Promise<void> => {
  const { membership_id, tier } = req.query as { membership_id?: string; tier?: string };

  if (!membership_id || !tier) {
    res.status(400).json({ error: "membership_id and tier are required" });
    return;
  }

  if (!VALID_TIERS.has(tier)) {
    res.status(400).json({
      error: `Invalid tier. Must be one of: ${[...VALID_TIERS].join(", ")}`,
    });
    return;
  }

  try {
    const whop = await getWhopClient();

    // Verify the membership is valid (paid and not expired)
    const membership = await whop.memberships.retrieve(membership_id);
    if (!membership || membership.status !== "active") {
      res.status(400).json({ error: "Membership is not active" });
      return;
    }

    // Check we don't already have a session for this membership
    let existing = await storage.getSessionByPaymentId(membership_id);
    if (!existing) {
      const isTimedSession = tier.includes("session");
      existing = await storage.createSession({
        id: crypto.randomUUID(),
        stripeSessionId: membership_id, // DB column kept as-is; stores Whop membership ID
        tier,
        expiresAt: isTimedSession ? new Date(Date.now() + 30 * 60 * 1000) : null,
        used: false,
      });
    }

    res.json({
      valid: true,
      tier: existing.tier,
      sessionId: existing.id,
      expiresAt: existing.expiresAt?.toISOString() ?? null,
    });
  } catch (err: any) {
    req.log?.error({ err: err.message }, "Whop verify error");
    res.status(400).json({ error: err.message ?? "Verification failed" });
  }
});

export default router;
