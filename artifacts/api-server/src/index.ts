import { runMigrations } from "stripe-replit-sync";
import { getStripeSync } from "./stripeClient";
import app from "./app";
import { logger } from "./lib/logger";

async function initStripe() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    logger.warn("DATABASE_URL not set, skipping Stripe initialization");
    return;
  }

  try {
    logger.info("Initializing Stripe schema...");
    await runMigrations({ databaseUrl, schema: "stripe" });
    logger.info("Stripe schema ready");
  } catch (err) {
    logger.error({ err }, "Failed to run Stripe migrations");
    return;
  }

  try {
    const stripeSync = await getStripeSync();

    const domains = process.env.REPLIT_DOMAINS?.split(",")[0];
    if (domains) {
      const webhookBaseUrl = `https://${domains}`;
      const webhookResult = await stripeSync.findOrCreateManagedWebhook(
        `${webhookBaseUrl}/api/stripe/webhook`
      );
      logger.info({ url: webhookResult?.webhook?.url }, "Webhook configured");
    }

    stripeSync
      .syncBackfill()
      .then(() => logger.info("Stripe data synced"))
      .catch((err: Error) => logger.warn({ err }, "Stripe backfill skipped (products will appear after first webhook)"));
  } catch (err) {
    logger.warn({ err }, "Stripe webhook/backfill setup skipped — server will still work for payments");
  }
}

const rawPort = process.env["PORT"];
if (!rawPort) {
  throw new Error("PORT environment variable is required but was not provided.");
}
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

await initStripe();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }
  logger.info({ port }, "Server listening");
});
