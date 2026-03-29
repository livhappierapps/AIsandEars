import { getUncachableStripeClient } from './stripeClient';

const PRODUCTS = [
  {
    name: "Audio Monthly",
    description: "Raw mic feed 24/7 to any AI — pay once, stream forever",
    metadata: { tier: "audio-monthly" },
    price: { unit_amount: 599, currency: "usd", recurring: { interval: "month" as const } },
  },
  {
    name: "Full Monthly",
    description: "Live mic + camera snapshots 24/7 — give your AI real eyes & ears",
    metadata: { tier: "full-monthly" },
    price: { unit_amount: 1099, currency: "usd", recurring: { interval: "month" as const } },
  },
  {
    name: "Audio Session",
    description: "30-minute audio-only session — try it out",
    metadata: { tier: "audio-session" },
    price: { unit_amount: 299, currency: "usd" },
  },
  {
    name: "Full Session",
    description: "30-minute audio + video session — the full experience",
    metadata: { tier: "full-session" },
    price: { unit_amount: 499, currency: "usd" },
  },
];

async function seedProducts() {
  const stripe = await getUncachableStripeClient();

  for (const product of PRODUCTS) {
    const existing = await stripe.products.search({
      query: `metadata['tier']:'${product.metadata.tier}' AND active:'true'`,
    });

    if (existing.data.length > 0) {
      console.log(`✓ ${product.name} already exists (${existing.data[0].id})`);
      continue;
    }

    const created = await stripe.products.create({
      name: product.name,
      description: product.description,
      metadata: product.metadata,
    });

    const priceData: any = {
      product: created.id,
      unit_amount: product.price.unit_amount,
      currency: product.price.currency,
      metadata: product.metadata,
    };

    if ((product.price as any).recurring) {
      priceData.recurring = (product.price as any).recurring;
    }

    const price = await stripe.prices.create(priceData);

    console.log(`✓ Created ${product.name} — product: ${created.id}, price: ${price.id} ($${product.price.unit_amount / 100})`);
  }

  console.log('\nAll products seeded! Webhooks will sync to your database automatically.');
}

seedProducts().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
