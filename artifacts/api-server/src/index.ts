import { createServer } from "http";
import { runMigrations } from "stripe-replit-sync";
import app from "./app";
import { logger } from "./lib/logger";
import { attachGrokRealtimeProxy } from "./websocket/grokRealtime";

async function initStripeSchema() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    logger.warn("DATABASE_URL not set, skipping Stripe schema init");
    return;
  }
  try {
    logger.info("Initializing Stripe schema...");
    await runMigrations({ databaseUrl, schema: "stripe" });
    logger.info("Stripe schema ready");
  } catch (err) {
    logger.warn({ err }, "Stripe schema migration failed — non-critical");
  }
}

async function seedProductsFromStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey.startsWith("mk_")) {
    logger.warn("STRIPE_SECRET_KEY missing or is a restricted key (mk_) — skipping product seed");
    return;
  }

  try {
    // Dynamically import Stripe to use our own key
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(secretKey, { apiVersion: "2025-08-27.basil" as any });

    const [products, prices] = await Promise.all([
      stripe.products.list({ active: true, limit: 20 }),
      stripe.prices.list({ active: true, limit: 40 }),
    ]);

    logger.info({ count: products.data.length }, "Fetched products from Stripe — caching in DB");

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) return;

    const { Pool } = await import("pg");
    const pool = new Pool({ connectionString: databaseUrl, max: 2 });

    for (const p of products.data) {
      await pool.query(
        `INSERT INTO stripe.products (id, name, description, active, metadata, created, updated)
         VALUES ($1, $2, $3, $4, $5, to_timestamp($6), to_timestamp($6))
         ON CONFLICT (id) DO UPDATE
           SET name = EXCLUDED.name,
               description = EXCLUDED.description,
               active = EXCLUDED.active,
               metadata = EXCLUDED.metadata,
               updated = EXCLUDED.updated`,
        [p.id, p.name, p.description ?? "", p.active, JSON.stringify(p.metadata ?? {}), p.created]
      );
    }

    for (const pr of prices.data) {
      const productId = typeof pr.product === "string" ? pr.product : pr.product.id;
      await pool.query(
        `INSERT INTO stripe.prices (id, product, unit_amount, currency, recurring, active, metadata, created, updated)
         VALUES ($1, $2, $3, $4, $5, $6, $7, to_timestamp($8), to_timestamp($8))
         ON CONFLICT (id) DO UPDATE
           SET unit_amount = EXCLUDED.unit_amount,
               currency = EXCLUDED.currency,
               recurring = EXCLUDED.recurring,
               active = EXCLUDED.active,
               metadata = EXCLUDED.metadata,
               updated = EXCLUDED.updated`,
        [
          pr.id,
          productId,
          pr.unit_amount,
          pr.currency,
          pr.recurring ? JSON.stringify(pr.recurring) : null,
          pr.active,
          JSON.stringify(pr.metadata ?? {}),
          pr.created,
        ]
      );
    }

    await pool.end();
    logger.info({ products: products.data.length, prices: prices.data.length }, "Stripe products seeded to DB");
  } catch (err: any) {
    logger.warn({ err: err.message }, "Could not seed Stripe products to DB — products endpoint will fetch live from Stripe");
  }
}

const rawPort = process.env["PORT"];
if (!rawPort) throw new Error("PORT environment variable is required but was not provided.");
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) throw new Error(`Invalid PORT value: "${rawPort}"`);

await initStripeSchema();
await seedProductsFromStripe();

const httpServer = createServer(app);
attachGrokRealtimeProxy(httpServer);

httpServer.listen(port, () => {
  logger.info({ port }, "Server listening");
});
