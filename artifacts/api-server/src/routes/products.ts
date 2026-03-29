import { Router, type IRouter } from "express";
import { storage } from "../storage";
import { getUncachableStripeClient } from "../stripeClient";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.get("/products", async (_req, res) => {
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

    res.json({ data: Array.from(productsMap.values()) });
  } catch (_dbErr) {
    try {
      const stripe = await getUncachableStripeClient();
      const [products, prices] = await Promise.all([
        stripe.products.list({ active: true, limit: 20 }),
        stripe.prices.list({ active: true, limit: 40 }),
      ]);

      const productsMap = new Map<string, any>();
      for (const p of products.data) {
        productsMap.set(p.id, {
          id: p.id,
          name: p.name,
          description: p.description ?? "",
          prices: [],
        });
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

      res.json({ data: Array.from(productsMap.values()) });
    } catch (stripeErr) {
      logger.error({ err: stripeErr }, "Failed to fetch products from Stripe");
      res.json({ data: [] });
    }
  }
});

export default router;
