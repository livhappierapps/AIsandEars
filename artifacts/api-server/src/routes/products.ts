import { Router, type IRouter } from "express";
import { getWhopClient } from "../whopClient";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// Hardcoded fallback — Whop plan IDs + canonical tier metadata
const FALLBACK_PRODUCTS = [
  {
    id: process.env.WHOP_PLAN_AUDIO_MONTHLY ?? "plan_nOiAkCNkabcuI",
    name: "Audio Monthly",
    description: "Unlimited audio sessions — Leo hears you 24/7",
    prices: [
      {
        id: process.env.WHOP_PLAN_AUDIO_MONTHLY ?? "plan_nOiAkCNkabcuI",
        unit_amount: 599,
        currency: "usd",
        recurring: { interval: "month" },
        metadata: { tier: "audio-monthly" },
      },
    ],
  },
  {
    id: process.env.WHOP_PLAN_FULL_MONTHLY ?? "plan_GpVrV4qfY7w1r",
    name: "Full Monthly",
    description: "Unlimited audio + vision — Leo sees and hears you 24/7",
    prices: [
      {
        id: process.env.WHOP_PLAN_FULL_MONTHLY ?? "plan_GpVrV4qfY7w1r",
        unit_amount: 1099,
        currency: "usd",
        recurring: { interval: "month" },
        metadata: { tier: "full-monthly" },
      },
    ],
  },
  {
    id: process.env.WHOP_PLAN_AUDIO_SESSION ?? "plan_sGuJXPFZipTzB",
    name: "Audio Session",
    description: "30-minute audio session — Leo listens to you",
    prices: [
      {
        id: process.env.WHOP_PLAN_AUDIO_SESSION ?? "plan_sGuJXPFZipTzB",
        unit_amount: 299,
        currency: "usd",
        recurring: null,
        metadata: { tier: "audio-session" },
      },
    ],
  },
  {
    id: process.env.WHOP_PLAN_FULL_SESSION ?? "plan_T3sw3zyV777y2",
    name: "Full Session",
    description: "30-minute audio + vision session — Leo's full attention",
    prices: [
      {
        id: process.env.WHOP_PLAN_FULL_SESSION ?? "plan_T3sw3zyV777y2",
        unit_amount: 499,
        currency: "usd",
        recurring: null,
        metadata: { tier: "full-session" },
      },
    ],
  },
];

// Tier tag from plan title
const TIER_FOR_TITLE: Record<string, string> = {
  "Audio Monthly": "audio-monthly",
  "Full Monthly": "full-monthly",
  "Audio Session": "audio-session",
  "Full Session": "full-session",
};

const PRICE_FOR_TIER: Record<string, number> = {
  "audio-monthly": 599,
  "full-monthly": 1099,
  "audio-session": 299,
  "full-session": 499,
};

router.get("/products", async (_req, res): Promise<void> => {
  try {
    const whop = await getWhopClient();
    const companyId = process.env.WHOP_COMPANY_ID;
    if (!companyId) throw new Error("WHOP_COMPANY_ID not set");

    const plansResp = await whop.plans.list({ company_id: companyId });
    const plans = plansResp?.data ?? [];

    if (plans.length > 0) {
      const products = plans
        .filter((plan: any) => plan.visibility !== "archived")
        .map((plan: any) => {
          const title: string = plan.product?.title ?? "";
          const tier = TIER_FOR_TITLE[title] ?? title.toLowerCase().replace(/\s+/g, "-");
          const isSubscription = plan.plan_type === "renewal";
          const priceInCents = Math.round((plan.renewal_price || plan.initial_price || 0) * 100);
          return {
            id: plan.id,
            name: title,
            description: plan.description ?? "",
            prices: [
              {
                id: plan.id,
                unit_amount: priceInCents || PRICE_FOR_TIER[tier] || 0,
                currency: plan.currency ?? "usd",
                recurring: isSubscription ? { interval: "month" } : null,
                metadata: { tier },
              },
            ],
          };
        });
      res.json({ data: products });
      return;
    }
  } catch (err: any) {
    logger.warn({ err: err.message }, "Whop API unavailable — using fallback products");
  }

  res.json({ data: FALLBACK_PRODUCTS });
});

export default router;
