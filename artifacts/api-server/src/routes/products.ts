import { Router, type IRouter } from "express";
import { storage } from "../storage";
import { getUncachableStripeClient } from "../stripeClient";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// Hardcoded fallback products — matches what was created in Stripe
const FALLBACK_PRODUCTS = [
  {
    id: "prod-audio-monthly",
    name: "Audio Monthly",
    description: "Unlimited audio sessions — Leo hears you 24/7",
    prices: [
      {
        id: "price_1TGDzTPnPNh4x29isbIS2PnE",
        unit_amount: 599,
        currency: "usd",
        recurring: { interval: "month" },
        metadata: { tier: "audio-monthly" },
      },
    ],
  },
  {
    id: "prod-full-monthly",
    name: "Full Monthly",
    description: "Unlimited audio + vision — Leo sees and hears you 24/7",
    prices: [
      {
        id: "price_1TGDzUPnPNh4x29iqfTcK073",
        unit_amount: 1099,
        currency: "usd",
        recurring: { interval: "month" },
        metadata: { tier: "full-monthly" },
      },
    ],
  },
  {
    id: "prod-audio-session",
    name: "Audio Session",
    description: "30-minute audio session — Leo listens to you",
    prices: [
      {
        id: "price_1TGDzUPnPNh4x29i3mTtQ1RE",
        unit_amount: 299,
        currency: "usd",
        recurring: null,
        metadata: { tier: "audio-session" },
      },
    ],
  },
  {
    id: "prod-full-session",
    name: "Full Session",
    description: "30-minute audio + vision session — Leo's full attention",
    prices: [
      {
        id: "price_1TGDzVPnPNh4x29iJe6Cc0yo",
        unit_amount: 499,
        currency: "usd",
        recurring: null,
        metadata: { tier: "full-session" },
      },
    ],
  },
];

router.get("/products", async (_req, res): Promise<void> => {
  // Try live DB first (populated by stripe-replit-sync)
  try {
    const rows = await storage.listProductsWithPrices();
    const productsMap = new Map<string, any>();
    for (const row of rows as any[]) {
      if (!productsMap.has(row.product_id)) {
        productsMap.set(row.product_id, {
          id: row.product_id,
          name: row.product_name,
          description: row.product_description ?? "",
          prices: [],
        });
      }
      if (row.price_id) {
        productsMap.get(row.product_id).prices.push({
          id: row.price_id,
          unit_amount: row.unit_amount,
          currency: row.currency,
          recurring: row.recurring ?? null,
          metadata: row.price_metadata ?? null,
        });
      }
    }
    const dbProducts = Array.from(productsMap.values());
    if (dbProducts.length > 0) {
      res.json({ data: dbProducts });
      return;
    }
  } catch (_dbErr) {
    // DB not available — fall through
  }

  // Try live Stripe API next
  try {
    const stripe = await getUncachableStripeClient();
    const [products, prices] = await Promise.all([
      stripe.products.list({ active: true, limit: 20 }),
      stripe.prices.list({ active: true, limit: 40 }),
    ]);
    const productsMap = new Map<string, any>();
    for (const p of products.data) {
      productsMap.set(p.id, { id: p.id, name: p.name, description: p.description ?? "", prices: [] });
    }
    for (const pr of prices.data) {
      const productId = typeof pr.product === "string" ? pr.product : pr.product.id;
      if (productsMap.has(productId)) {
        productsMap.get(productId).prices.push({
          id: pr.id,
          unit_amount: pr.unit_amount,
          currency: pr.currency,
          recurring: pr.recurring ?? null,
          metadata: pr.metadata ?? null,
        });
      }
    }
    const stripeProducts = Array.from(productsMap.values());
    if (stripeProducts.length > 0) {
      res.json({ data: stripeProducts });
      return;
    }
  } catch (_stripeErr) {
    logger.warn("Stripe API unavailable — using hardcoded fallback products");
  }

  // Hardcoded fallback — always shows the four tiers
  res.json({ data: FALLBACK_PRODUCTS });
});

export default router;
