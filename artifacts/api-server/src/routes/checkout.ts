import { Router, type IRouter } from "express";
import { getUncachableStripeClient } from "../stripeClient";
import { storage } from "../storage";
import crypto from "crypto";

const router: IRouter = Router();

router.post("/checkout", async (req, res) => {
  const { priceId, tier } = req.body;

  if (!priceId || !tier) {
    return res.status(400).json({ error: "priceId and tier are required" });
  }

  try {
    const stripe = await getUncachableStripeClient();

    const isSession = tier.includes("session");
    const baseUrl = `https://${process.env.REPLIT_DOMAINS?.split(",")[0]}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: isSession ? "payment" : "subscription",
      success_url: `${baseUrl}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?cancelled=true`,
      metadata: { tier },
    });

    res.json({ url: session.url });
  } catch (err: any) {
    req.log?.error({ err }, "Checkout error");
    res.status(500).json({ error: err.message ?? "Checkout failed" });
  }
});

router.get("/checkout/verify", async (req, res) => {
  const { session_id } = req.query as { session_id?: string };

  if (!session_id) {
    return res.status(400).json({ error: "session_id is required" });
  }

  try {
    const stripe = await getUncachableStripeClient();
    const stripeSession = await stripe.checkout.sessions.retrieve(session_id);

    if (stripeSession.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const tier = (stripeSession.metadata?.tier ?? "audio-session") as string;
    const isTimedSession = tier.includes("session");

    let existing = await storage.getSessionByStripeId(session_id);
    if (!existing) {
      const expiresAt = isTimedSession
        ? new Date(Date.now() + 30 * 60 * 1000)
        : null;

      existing = await storage.createSession({
        id: crypto.randomUUID(),
        stripeSessionId: session_id,
        tier,
        expiresAt,
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
    req.log?.error({ err }, "Verify error");
    res.status(400).json({ error: err.message ?? "Verification failed" });
  }
});

export default router;
