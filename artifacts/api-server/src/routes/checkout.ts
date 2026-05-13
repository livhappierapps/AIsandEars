import { Router, type IRouter } from "express";
import { getUncachableStripeClient } from "../stripeClient";
import { storage } from "../storage";
import crypto from "crypto";

const router: IRouter = Router();

// Accepted tier identifiers — must match Stripe product metadata
const VALID_TIERS = new Set(["audio-monthly", "full-monthly", "audio-session", "full-session"]);

// Payment links stored as env vars — set these from Stripe dashboard
const PAYMENT_LINKS: Record<string, string | undefined> = {
  "audio-monthly": process.env.STRIPE_LINK_AUDIO_MONTHLY,
  "full-monthly": process.env.STRIPE_LINK_FULL_MONTHLY,
  "audio-session": process.env.STRIPE_LINK_AUDIO_SESSION,
  "full-session": process.env.STRIPE_LINK_FULL_SESSION,
};

function getBaseUrl() {
  const domain = process.env.REPLIT_DOMAINS?.split(",")[0];
  // Port 80 is the shared Replit proxy — not the raw service port
  return domain ? `https://${domain}` : "http://localhost:80";
}

// Allowed schemes for custom success/cancel URLs passed by mobile clients
const ALLOWED_CUSTOM_PREFIXES = ["ais-and-ears-native://"];

router.post("/checkout", async (req, res) => {
  const {
    priceId,
    tier,
    successUrl: customSuccessUrl,
    cancelUrl: customCancelUrl,
  } = req.body;

  if (!priceId || !tier) {
    return res.status(400).json({ error: "priceId and tier are required" });
  }
  if (!VALID_TIERS.has(tier)) {
    return res.status(400).json({
      error: `Invalid tier. Must be one of: ${[...VALID_TIERS].join(", ")}`,
    });
  }

  // Validate custom URLs — must be our domain or a known app scheme
  const baseUrl = getBaseUrl();
  if (customSuccessUrl) {
    const isAllowed =
      customSuccessUrl.startsWith(baseUrl) ||
      ALLOWED_CUSTOM_PREFIXES.some((p) => customSuccessUrl.startsWith(p));
    if (!isAllowed) {
      return res.status(400).json({ error: "Invalid successUrl scheme" });
    }
  }
  if (customCancelUrl) {
    const isAllowed =
      customCancelUrl.startsWith(baseUrl) ||
      ALLOWED_CUSTOM_PREFIXES.some((p) => customCancelUrl.startsWith(p));
    if (!isAllowed) {
      return res.status(400).json({ error: "Invalid cancelUrl scheme" });
    }
  }

  const successUrl =
    customSuccessUrl ?? `${baseUrl}/?success=true&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = customCancelUrl ?? `${baseUrl}/?cancelled=true`;

  // Option A: Try live Stripe API (requires valid sk_test_ key)
  try {
    const stripe = await getUncachableStripeClient();
    const isSession = tier.includes("session");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: isSession ? "payment" : "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { tier },
    });
    return res.json({ url: session.url });
  } catch (stripeErr: any) {
    req.log?.warn({ err: stripeErr.message }, "Stripe API unavailable — trying payment links");
  }

  // Option B: Fall back to pre-configured Stripe Payment Links
  const link = PAYMENT_LINKS[tier];
  if (link) {
    const encodedSuccess = encodeURIComponent(successUrl);
    const encodedCancel = encodeURIComponent(cancelUrl);
    const fullLink = `${link}?success_url=${encodedSuccess}&cancel_url=${encodedCancel}`;
    return res.json({ url: fullLink, paymentLink: true });
  }

  // Both options failed
  res.status(503).json({
    error: "payment_unavailable",
    message:
      "Stripe is not configured yet. Please add a valid STRIPE_SECRET_KEY in Replit Secrets.",
  });
});

router.get("/checkout/verify", async (req, res) => {
  const { session_id, tier } = req.query as { session_id?: string; tier?: string };

  // Standard Stripe checkout: session_id starts with "cs_"
  if (session_id?.startsWith("cs_")) {
    try {
      const stripe = await getUncachableStripeClient();
      const stripeSession = await stripe.checkout.sessions.retrieve(session_id);

      if (stripeSession.payment_status !== "paid") {
        return res.status(400).json({ error: "Payment not completed" });
      }

      const resolvedTier = (stripeSession.metadata?.tier ?? "audio-session") as string;
      if (!VALID_TIERS.has(resolvedTier)) {
        return res
          .status(400)
          .json({ error: "Unrecognized tier in Stripe session metadata" });
      }
      const isTimedSession = resolvedTier.includes("session");

      let existing = await storage.getSessionByStripeId(session_id);
      if (!existing) {
        existing = await storage.createSession({
          id: crypto.randomUUID(),
          stripeSessionId: session_id,
          tier: resolvedTier,
          expiresAt: isTimedSession ? new Date(Date.now() + 30 * 60 * 1000) : null,
          used: false,
        });
      }

      return res.json({
        valid: true,
        tier: existing.tier,
        sessionId: existing.id,
        expiresAt: existing.expiresAt?.toISOString() ?? null,
      });
    } catch (err: any) {
      req.log?.error({ err }, "Verify error");
      return res.status(400).json({ error: err.message ?? "Verification failed" });
    }
  }

  // Payment-link or link_ success — grant access by tier
  if (session_id?.startsWith("link_") || tier) {
    if (!tier) {
      return res
        .status(400)
        .json({ error: "tier is required for payment link verification" });
    }
    if (!VALID_TIERS.has(tier)) {
      return res.status(400).json({
        error: `Invalid tier. Must be one of: ${[...VALID_TIERS].join(", ")}`,
      });
    }
    const isTimedSession = tier.includes("session");
    const existing = await storage.createSession({
      id: crypto.randomUUID(),
      stripeSessionId: session_id ?? `link_${crypto.randomUUID()}`,
      tier,
      expiresAt: isTimedSession ? new Date(Date.now() + 30 * 60 * 1000) : null,
      used: false,
    });
    return res.json({
      valid: true,
      tier: existing.tier,
      sessionId: existing.id,
      expiresAt: existing.expiresAt?.toISOString() ?? null,
    });
  }

  return res.status(400).json({ error: "session_id is required" });
});

export default router;
