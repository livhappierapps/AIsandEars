# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains **AIs&Ears** — a subscription/pay-per-session web app where the app IS the AI conversation interface. Users pay to give their device microphone and camera directly to Leo (powered by xAI Grok) via raw PCM16 audio streamed over a WebSocket proxy. No transcriptions, no middlemen.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **Build**: esbuild (CJS bundle)
- **Payments**: Stripe (via Replit integration, stripe-replit-sync)
- **Frontend**: React + Vite, Tailwind CSS, Framer Motion
- **AI**: xAI Grok Realtime WebSocket (`wss://api.x.ai/v1/realtime`) + Grok Vision REST (`grok-2-vision-1212`)

## App: AIs&Ears

### Core Concept
AIs&Ears IS the conversation interface. After paying, users talk to Leo inside the app with mic and camera always available. Raw PCM16 audio (16-bit LE, 24kHz) is streamed directly to xAI's Realtime WebSocket API — no speech-to-text, no transcriptions, no middlemen.

### Pricing Tiers (Stripe products)
| Tier | Price | Type | Features |
|---|---|---|---|
| `audio-monthly` | $5.99/mo | Subscription | Audio-only 24/7 |
| `full-monthly` | $10.99/mo | Subscription | Audio + camera 24/7 |
| `audio-session` | $2.99 | One-time | 30-min audio session |
| `full-session` | $4.99 | One-time | 30-min audio + camera session |

Hardcoded Stripe sandbox price IDs (from Replit Stripe integration):
- `audio-monthly`: `price_1TGDzTPnPNh4x29isbIS2PnE`
- `full-monthly`: `price_1TGDzUPnPNh4x29iqfTcK073`
- `audio-session`: `price_1TGDzUPnPNh4x29i3mTtQ1RE`
- `full-session`: `price_1TGDzVPnPNh4x29iJe6Cc0yo`

**No free/demo tiers.** All access is paid only.

### Architecture

```
User Browser
  ├── AudioWorklet (pcm16-processor) → PCM16 chunks @ 24kHz
  ├── WebSocket → /api/grok-live → xAI Realtime WebSocket (Leo's voice)
  └── Camera frame → POST /api/grok-vision → grok-2-vision-1212 REST
```

#### Key Files
- `artifacts/ais-and-ears/src/components/feed/ConversationFeed.tsx` — primary session UI (mic, camera, Leo responses)
- `artifacts/ais-and-ears/public/audio-processor.js` — AudioWorklet: raw PCM16 chunks every 100ms
- `artifacts/api-server/src/websocket/grokRealtime.ts` — WebSocket proxy to `wss://api.x.ai/v1/realtime`
- `artifacts/api-server/src/routes/grokVision.ts` — REST vision snapshots via `grok-2-vision-1212`
- `artifacts/api-server/src/routes/checkout.ts` — Stripe checkout + verify, payment link fallback
- `artifacts/api-server/src/routes/products.ts` — product listing with hardcoded fallback
- `artifacts/api-server/src/storage.ts` — Drizzle session CRUD
- `lib/db/src/schema/sessions.ts` — `paid_sessions` table schema

#### Leo Config (grokRealtime.ts)
- Model: `grok-4-1-fast-non-reasoning`
- Voice: `Ara`
- Turn detection: `server_vad` (threshold 0.5, silence 600ms)
- Input/output: `pcm16`
- Modalities: `["text", "audio"]`

### Frontend Tabs
1. **Home** — Hero banner with AI character image, "Choose Your Uplink" CTA → Packages tab
2. **Packages** — Four paid tiers, Stripe checkout on click, success redirects back with session
3. **Settings** — Mic toggle, camera toggle, verbal responses toggle, auto-vision toggle, dark/light mode (all persisted via `SettingsContext` → localStorage)

### Payment Flow
1. User picks a tier → `POST /api/checkout` with `{ priceId, tier }`
2. **Path A** (valid Stripe key): Creates Stripe Checkout session → redirects to `stripe.com/pay/...` → returns with `?success=true&session_id=cs_...`
3. **Path B** (payment links configured): Uses `STRIPE_LINK_*` env vars → redirects to Stripe Payment Link with success/cancel URLs embedded
4. On return: `GET /api/checkout/verify?session_id=...&tier=...` → creates DB session → returns `{ sessionId, tier, expiresAt }`
5. `ConversationFeed` opens with the verified sessionId

## Key Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/products` | GET | List products (DB → Stripe API → hardcoded fallback) |
| `/api/checkout` | POST | Create Stripe checkout session or payment link |
| `/api/checkout/verify` | GET | Verify payment, create/return DB session |
| `/api/grok-live` | WS | WebSocket proxy → xAI Realtime |
| `/api/grok-vision` | POST | Camera snapshot → Grok Vision REST |
| `/api/stripe/webhook` | POST | Stripe webhook (signature verified) |

## Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `XAI_API_KEY` | xAI Grok API key (Realtime + Vision) | **Yes** |
| `STRIPE_SECRET_KEY` | Must be `sk_test_...` or `sk_live_...` | For Stripe checkout |
| `STRIPE_PUBLISHABLE_KEY` | Frontend Stripe key | For Stripe checkout |
| `DATABASE_URL` | Auto-provisioned by Replit PostgreSQL | Yes |
| `SESSION_SECRET` | Express session secret | Yes |
| `STRIPE_LINK_AUDIO_MONTHLY` | Payment link URL fallback | Optional |
| `STRIPE_LINK_FULL_MONTHLY` | Payment link URL fallback | Optional |
| `STRIPE_LINK_AUDIO_SESSION` | Payment link URL fallback | Optional |
| `STRIPE_LINK_FULL_SESSION` | Payment link URL fallback | Optional |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature secret | Optional |

> ⚠️ `STRIPE_SECRET_KEY` must be a standard `sk_test_51...` key from dashboard.stripe.com/test/apikeys → Standard keys. The `mk_` prefix (Restricted key format) is invalid and will cause 401 errors.

## Design

- **Colors**: Deep navy-teal background, verdigris accent (`#82C4B0`), dark glass panels
- **Fonts**: Cormorant Garamond (display/headings), Raleway (body)
- **Banner**: `public/images/ai-banner.jpg` — AI character close-up with steampunk gears
- **Theme**: Dark by default, light mode toggle in Settings

## Monorepo Structure

```text
├── artifacts/
│   ├── api-server/         # Express API server (Stripe, xAI proxy, checkout)
│   └── ais-and-ears/       # React + Vite frontend
├── lib/
│   ├── db/                 # Drizzle ORM schema + PostgreSQL connection
│   └── (api-spec, api-client-react, api-zod — legacy, not actively used)
├── scripts/
│   └── src/seed-products.ts  # Creates all 4 Stripe products
```

## TypeScript

Every package extends `tsconfig.base.json` (`composite: true`). Root `tsconfig.json` lists all packages as project references.

- **Always typecheck from root**: `pnpm run typecheck`
- Run seeds: `pnpm --filter @workspace/scripts exec tsx src/seed-products.ts`

## Easy Ways to Save or Share

### Samsung A17
1. Open the app in Chrome.
2. Tap the **three dots** menu.
3. Tap **Add to Home screen**.
4. Rename it if you want, then tap **Add**.

To save a page or screenshot:
- Use the browser menu → **Download** or **Share**
- Or take a screenshot with the phone buttons and save it to Gallery

### iPhone 13
1. Open the app in Safari.
2. Tap the **Share** button.
3. Tap **Add to Home Screen**.
4. Tap **Add**.

To save content:
- Tap **Share** → **Save to Files** for pages/files
- Or take a screenshot with the Side button + Volume Up
- Screenshots save automatically to Photos

## Known Bugs Fixed (history)
- `checkout.ts`: `fullLink` was computed but `link` was returned — payment link success/cancel URLs were ignored. Fixed to return `fullLink`.
- `checkout.ts verify`: Logic order bug — `session_id` undefined fell into wrong branch. Restructured to check `cs_` prefix first.
- `ConversationFeed`: `handleEnd` stale closure in session timer — fixed with a ref (`handleEndRef`) that stays in sync.
- `ConversationFeed`: `getUserMedia({ audio: false, video: false })` crash when both mic and camera disabled — guarded with `if (useMic || useCam)` before calling getUserMedia.
