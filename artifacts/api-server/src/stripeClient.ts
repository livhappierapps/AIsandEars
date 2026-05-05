import Stripe from 'stripe';

export async function getUncachableStripeClient(): Promise<Stripe> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set. Please add it in Replit Secrets.');
  }
  // Key must start with sk_test_ or sk_live_ — the mk_ "Restricted key" prefix is invalid here
  return new Stripe(secretKey, { apiVersion: '2025-08-27.basil' as any });
}

export async function getStripeSecretKey(): Promise<string> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error('STRIPE_SECRET_KEY not set');
  return secretKey;
}
