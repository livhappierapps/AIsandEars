import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { randomUUID } from "crypto";
import router from "./routes";
import { logger } from "./lib/logger";
import { WebhookHandlers } from "./webhookHandlers";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    // Assign a unique request ID to every request for log correlation
    genReqId: () => randomUUID(),
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
    // Log errors at error level, 4xx at warn, 5xx at error
    customLogLevel(_req, res, err) {
      if (err || res.statusCode >= 500) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },
  }),
);

// Whop webhook must be registered BEFORE express.json() so it receives the raw Buffer
app.post(
  "/api/whop/webhook",
  express.raw({ type: "application/json" }),
  async (req, res): Promise<void> => {
    const signature = req.headers["whop-signature"] as string | undefined;
    if (!signature) {
      res.status(400).json({ error: "Missing whop-signature" });
      return;
    }
    try {
      await WebhookHandlers.processWhopWebhook(req.body as Buffer, signature);
      res.status(200).json({ received: true });
    } catch (err: any) {
      logger.error({ err }, "Webhook error");
      res.status(400).json({ error: "Webhook processing error" });
    }
  },
);

// CORS — in production restrict to known Replit domains; in dev allow all origins
const productionOrigins: string[] = process.env.REPLIT_DOMAINS
  ? process.env.REPLIT_DOMAINS.split(",").map((d) => `https://${d.trim()}`)
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (productionOrigins.length === 0) return callback(null, true);
      if (productionOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin '${origin}' not permitted`));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api", router);

// ── Global error handler ───────────────────────────────────────────────────
// Catches any error passed to next(err) or thrown inside async route handlers
// that have been wrapped with express-async-errors or similar. Logs a
// structured error record and returns a JSON error response.
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const status: number = typeof err.status === "number" ? err.status
    : typeof err.statusCode === "number" ? err.statusCode
    : 500;
  req.log?.error(
    { err, status, reqId: req.id },
    "Unhandled route error",
  );
  if (!res.headersSent) {
    res.status(status).json({ error: err.message ?? "Internal server error" });
  }
});

export default app;
