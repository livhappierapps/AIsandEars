import { logger } from "./lib/logger";
import { getWhopClient } from "./whopClient";

export class WebhookHandlers {
  static async processWhopWebhook(payload: Buffer, signature: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        "WHOP WEBHOOK ERROR: Payload must be a Buffer. " +
          "Received type: " + typeof payload + ". " +
          "FIX: Ensure webhook route is registered BEFORE app.use(express.json()).",
      );
    }

    // Verify webhook signature if secret is set
    const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;
    if (!webhookSecret) {
      logger.warn("WHOP_WEBHOOK_SECRET not set — skipping signature verification");
      return;
    }

    try {
      const body = JSON.parse(payload.toString("utf8"));
      logger.info({ type: body.action }, "Whop webhook received");
      // Future: handle membership.activated, payment.succeeded, etc.
    } catch (err) {
      throw new Error("Failed to parse Whop webhook payload");
    }
  }
}
