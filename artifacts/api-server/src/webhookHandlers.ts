import Stripe from 'stripe';
import { getStripeSecretKey } from './stripeClient';
import { logger } from './lib/logger';

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        'STRIPE WEBHOOK ERROR: Payload must be a Buffer. ' +
          'Received type: ' + typeof payload + '. ' +
          'FIX: Ensure webhook route is registered BEFORE app.use(express.json()).'
      );
    }

    const secretKey = await getStripeSecretKey();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      logger.warn("STRIPE_WEBHOOK_SECRET not set — skipping webhook signature verification");
      return;
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2025-08-27.basil' as any });
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    logger.info({ type: event.type }, "Stripe webhook received");
  }
}
