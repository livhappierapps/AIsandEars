import Stripe from 'stripe';

function getEnvSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY environment variable is not set");
  if (key.startsWith("mk_")) throw new Error("STRIPE_SECRET_KEY is a restricted key (mk_). Please use your sk_test_ or sk_live_ secret key from https://dashboard.stripe.com/test/apikeys");
  return key;
}

function getEnvPublishableKey(): string {
  const key = process.env.STRIPE_PUBLISHABLE_KEY;
  if (!key) throw new Error("STRIPE_PUBLISHABLE_KEY environment variable is not set");
  return key;
}

export async function getUncachableStripeClient() {
  const secretKey = getEnvSecretKey();
  return new Stripe(secretKey, { apiVersion: '2025-08-27.basil' as any });
}

export async function getStripePublishableKey() {
  return getEnvPublishableKey();
}

export async function getStripeSecretKey() {
  return getEnvSecretKey();
}
