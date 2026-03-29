# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the AIs&Ears app — a subscription service that gives AI assistants real microphone and camera access.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Payments**: Stripe (via Replit integration, stripe-replit-sync)
- **Frontend**: React + Vite, Tailwind CSS, Framer Motion

## App: AIs&Ears

Subscription/pay-per-session app that gives AI assistants live microphone and camera access via OpenAI Realtime API.

### Pricing Tiers (in Stripe)
- `audio-monthly` — $5.99/month subscription (Audio-only 24/7)
- `full-monthly` — $10.99/month subscription (Audio + video 24/7)
- `audio-session` — $2.99 one-time (30-min audio session)
- `full-session` — $4.99 one-time (30-min audio + video session)

### AI Connection
- After payment, POST /api/ai-token generates an ephemeral OpenAI Realtime API token
- Requires `OPENAI_API_KEY` env var to be set for live AI connection
- Without it, returns `mode: "demo"` and the UI shows instructions to set up the key

### Environment Variables Needed
- `OPENAI_API_KEY` — for live AI (OpenAI Realtime API gpt-4o-realtime-preview)
- `DATABASE_URL` — auto-provisioned by Replit
- Stripe keys — managed via Replit Stripe integration

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server (Stripe, checkout, AI token)
│   └── ais-and-ears/       # React + Vite frontend (dark neon-green UI)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
│       └── src/schema/sessions.ts  # paid_sessions table
├── scripts/
│   └── src/
│       ├── stripeClient.ts     # Stripe client for scripts
│       └── seed-products.ts    # Creates all 4 Stripe products
```

## Key Routes

- `GET /api/products` — list all products with prices (falls back to Stripe API if DB not synced)
- `POST /api/checkout` — create Stripe checkout session
- `GET /api/checkout/verify?session_id=...` — verify payment and create/get session
- `POST /api/ai-token` — get ephemeral OpenAI Realtime token (requires valid sessionId)
- `POST /api/stripe/webhook` — Stripe webhook handler

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/scripts exec tsx src/seed-products.ts` — (re-)seed Stripe products
