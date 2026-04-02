import Stripe from 'stripe';

// Use STRIPE_SECRET_KEY directly — mk_ (restricted) keys can have checkout permissions
// depending on how they were configured in the Stripe dashboard
export async function getUncachableStripeClient(): Promise<Stripe> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set. Please add it in Replit Secrets.');
  }
  return new Stripe(secretKey, { apiVersion: '2025-08-27.basil' as any });
}

export async function getStripePublishableKey(): Promise<string> {
  return process.env.STRIPE_PUBLISHABLE_KEY ?? '';
}

export async function getStripeSecretKey(): Promise<string> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error('STRIPE_SECRET_KEY not set');
  return secretKey;
}
