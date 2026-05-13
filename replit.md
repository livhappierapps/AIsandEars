# AIs&Ears — Workspace

## Overview

pnpm monorepo. AIs&Ears is a paid-only subscription/pay-per-session app where the interface IS the AI conversation. Users pay to give Leo (xAI Grok) direct mic and camera access — raw PCM16 audio over WebSocket, no STT, no transcriptions, no middlemen. Sold as a standalone app. Part of a larger crown jewel bundle (see Road Map).

## Stack

| Layer | Tech |
|---|---|
| Monorepo | pnpm workspaces, Node 24, TypeScript 5.9 |
| API server | Express 5, Drizzle ORM + PostgreSQL, Zod v4, esbuild |
| Web frontend | React 19 + Vite 7, Tailwind CSS 4, Framer Motion |
| Mobile frontend | Expo SDK 54, React Native 0.81, Expo Router 6 |
| AI Voice | xAI `grok-voice-think-fast-1.0` over `wss://api.x.ai/v1/realtime` |
| AI Vision | xAI `grok-2-vision-1212` via `POST https://api.x.ai/v1/chat/completions` |
| Payments | Stripe (Replit integration, stripe-replit-sync) |

## Monorepo Structure

```
artifacts/
  ais-and-ears/          # React + Vite web app
  ais-and-ears-native/   # Expo mobile app (iOS + Android)
  api-server/            # Express API — shared by both frontends
  mockup-sandbox/        # Design preview server (internal)
lib/
  db/                    # Drizzle schema + PostgreSQL connection
  api-spec/              # OpenAPI spec (source of truth)
  api-client-react/      # Generated React Query hooks
  api-zod/               # Generated Zod schemas
scripts/
  src/
    integration-check.ts # 15-check API test suite
    seed-products.ts     # Creates Stripe products
    stripeClient.ts      # Stripe client for scripts
```

## What Future Agents Must Know

- **Two frontends, one API server.** Both `ais-and-ears` and `ais-and-ears-native` use the same `artifacts/api-server` — no server changes needed for mobile features.
- **No free access.** All sessions are created via verified Stripe payment only. No demo/test routes.
- **Tier validation** is enforced at both `/api/checkout` and `/api/checkout/verify`. Only `audio-monthly`, `full-monthly`, `audio-session`, `full-session` are valid.
- **Mobile is text-based today.** The mobile app uses WebSocket text modality + `expo-speech` TTS. Raw PCM16 mic streaming (like the web app) is a future step.
- **Mobile deep link scheme**: `ais-and-ears-native://` — checkout POSTs optional `successUrl`/`cancelUrl` for mobile deep link return.
- **`Appearance.setColorScheme()`** crashes on React Native Web — always guard with `Platform.OS !== 'web'`.
- **`useNativeDriver: true`** fails on React Native Web — use `Platform.OS !== 'web'` conditional.
- **expo-speech has NO config plugin** — never add it to the `plugins` array in `app.json`.
- **Stripe key format**: `STRIPE_SECRET_KEY` must be `sk_test_51...` (Standard). The `mk_` prefix (Restricted key) causes 401 errors.
- **TS errors that are pre-existing and non-breaking**: `TS7030` in Express 5 async handlers; `TS2353`/`TS2307` in `api-server/index.ts`. Server runs correctly.
- **Security audit last run**: May 13 2026 — all clean. See Security Audit section.

## xAI API (updated May 2026)

- **Voice**: `grok-voice-think-fast-1.0` — query param `wss://api.x.ai/v1/realtime?model=grok-voice-think-fast-1.0`. Voice `Ara`. ~$0.05/min.
- **Vision**: `grok-2-vision-1212` via `POST https://api.x.ai/v1/chat/completions` (deprecated upstream — migrate to Responses API when stable).
- **STT/TTS APIs** exist (`/v1/stt`, `/v1/tts`) but not yet integrated.
- **Ephemeral tokens**: `POST https://api.x.ai/v1/realtime/client_secrets` — not yet used (server proxy holds key safely).
- **DO NOT use** `grok-4-1-fast-non-reasoning` for voice — it is a text model.

## Leo Config (`grokRealtime.ts`)

Model `grok-voice-think-fast-1.0` · Voice `Ara` · Turn detection `server_vad` (threshold 0.5, silence 600ms) · Input/output `pcm16` · Modalities `["text", "audio"]`

## Pricing Tiers

| Tier ID | Price | Type | Stripe Price ID (sandbox) |
|---|---|---|---|
| `audio-monthly` | $5.99/mo | Subscription | `price_1TGDzTPnPNh4x29isbIS2PnE` |
| `full-monthly` | $10.99/mo | Subscription | `price_1TGDzUPnPNh4x29iqfTcK073` |
| `audio-session` | $2.99 | One-time (30 min) | `price_1TGDzUPnPNh4x29i3mTtQ1RE` |
| `full-session` | $4.99 | One-time (30 min) | `price_1TGDzVPnPNh4x29iJe6Cc0yo` |

## Architecture

```
Web:    AudioWorklet (PCM16 @ 24kHz) → WS /api/grok-live → xAI Voice Agent API
        Camera frame → POST /api/grok-vision → grok-2-vision-1212
Mobile: TextInput → WS /api/grok-live (text modality) → xAI
        ImagePicker → POST /api/grok-vision → grok-2-vision-1212
```

## Key Files

| File | Purpose |
|---|---|
| `artifacts/ais-and-ears/src/components/feed/ConversationFeed.tsx` | Web live session UI (mic, camera, Leo) |
| `artifacts/ais-and-ears/public/audio-processor.js` | AudioWorklet — PCM16 encoder |
| `artifacts/ais-and-ears-native/app/conversation.tsx` | Mobile live session (text + camera) |
| `artifacts/ais-and-ears-native/context/SettingsContext.tsx` | Mobile settings + dark mode |
| `artifacts/api-server/src/websocket/grokRealtime.ts` | WS proxy → xAI Voice Agent |
| `artifacts/api-server/src/routes/grokVision.ts` | Camera snapshot → Grok Vision |
| `artifacts/api-server/src/routes/checkout.ts` | Stripe checkout + verify + tier validation |
| `artifacts/api-server/src/routes/products.ts` | Product listing (DB → Stripe → hardcoded fallback) |
| `artifacts/api-server/src/storage.ts` | Drizzle session CRUD |
| `lib/db/src/schema/sessions.ts` | `paid_sessions` table schema |

## Key Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/products` | GET | List products |
| `/api/checkout` | POST | Create Stripe session or payment link |
| `/api/checkout/verify` | GET | Verify payment → create DB session |
| `/api/grok-live` | WS | Proxy → xAI Voice Agent API |
| `/api/grok-vision` | POST | Camera snapshot → Grok Vision |
| `/api/stripe/webhook` | POST | Stripe webhook (signature verified) |
| `/api/ai-token` | POST | 410 Deprecated stub — do not expand |

## Payment Flow

1. `POST /api/checkout` `{ priceId, tier, successUrl?, cancelUrl? }` → Stripe session or payment link URL
2. User pays on Stripe → redirects back with `?success=true&session_id=cs_...`
3. `GET /api/checkout/verify?session_id=...&tier=...` → creates DB row → `{ sessionId, tier, expiresAt }`
4. Frontend opens `ConversationFeed` / mobile `conversation.tsx` with `sessionId`

## Security Model

- **CORS**: Production restricted to `REPLIT_DOMAINS`. Dev allows all origins.
- **Tier validation**: `VALID_TIERS` set at both checkout endpoints — unknown strings → 400.
- **imageData**: Regex-validated base64 data URL, capped at ~2MB → 413 if oversized.
- **Session auth**: Every realtime/vision request validates `sessionId` against DB before reaching xAI.
- **API key**: `XAI_API_KEY` server-side only — never sent to frontend.
- **Redirect validation**: `PricingSection.tsx` only redirects to `*.stripe.com` or same-origin.

## Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `XAI_API_KEY` | xAI Grok (Realtime + Vision) | Yes |
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` Standard key | For checkout |
| `STRIPE_PUBLISHABLE_KEY` | Frontend Stripe key | For checkout |
| `DATABASE_URL` | Auto-provisioned PostgreSQL | Yes |
| `SESSION_SECRET` | Express session secret | Yes |
| `STRIPE_LINK_*` | Payment link URL fallbacks (`AUDIO_MONTHLY`, `FULL_MONTHLY`, `AUDIO_SESSION`, `FULL_SESSION`) | Optional |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature | Optional, recommended in prod |

## Design

- **Colors**: Dark bg `#121f30`, verdigris accent `#82C4B0`, card `#172538`
- **Fonts**: Cormorant Garamond (display/headings), Raleway (body)
- **Banner**: `public/images/ai-banner.jpg` — AI character + steampunk gears

## Road Map

### Crown Jewel (in progress — separate repo)
A bundled app combining AIs&Ears + Memory Machine into one product sold in app stores. The Memory Machine gives the AI persistent memory. AIs&Ears provides the real-time voice/vision interface. Architecture TBD — the integration point is a **Memory API stub** that the Memory Machine agent will implement. The stub contract should be:

```typescript
// Memory API stub — to be implemented by Memory Machine
interface MemoryAPI {
  getMemories(userId: string, context: string): Promise<Memory[]>;
  saveMemory(userId: string, key: string, value: string): Promise<void>;
  searchMemories(userId: string, query: string): Promise<Memory[]>;
}
interface Memory { key: string; value: string; timestamp: string; }
// POST /memory/get    { userId, context }  → { memories: Memory[] }
// POST /memory/save   { userId, key, value }
// POST /memory/search { userId, query }    → { memories: Memory[] }
```

Use the stub pattern (`// PLUG IN MEMORY API HERE`) — no contract from the Memory Machine agent exists yet on this side.

### AIs&Ears Mobile — Next Steps
Live PCM16 mic streaming (replace text modality with `react-native-live-audio-stream` + existing `/api/grok-live` WS proxy).

## Security Audit — May 13 2026

| Scanner | Status |
|---|---|
| Dependency audit | ✅ 0 critical · 0 high · 0 moderate |
| SAST (our code) | ✅ Clean — all high/medium were false positives (see below) |
| HoundDog | ✅ 0 findings |
| Integration tests | ✅ 15/15 `pnpm --filter @workspace/scripts run check` |

**Patches applied** (all minor, no breaking changes): `drizzle-orm` 0.45.2, `fast-uri` 3.1.1, `picomatch` 4.0.4, `brace-expansion` 2.0.3, `lodash` 4.18.0, `path-to-regexp` 8.4.0, `postcss` 8.5.10, `vite` 7.3.2, `yaml` 2.8.3. Applied via `pnpm-workspace.yaml` catalog + overrides.

**SAST false positives**: `serve.js` path traversal (has `normalize` + `startsWith(STATIC_ROOT)` guard + platform allowlist), `serve.js` HTTP (TLS at Replit proxy edge), `build.js` (build-time only, no network input), `mockup-sandbox/App.tsx` dynamic method (static generated module map).

## Known Issues & Fixed Bugs

- **`mk_` Stripe key** — Restricted key prefix causes 401. Must use Standard `sk_test_...` key.
- **Stripe seed warning at startup** — Expected when using `mk_` key; products fall back to hardcoded list. Non-blocking.
- All previously logged bugs (stale closures, CORS, model name, WebSocket cleanup, imageData validation, unused files) have been resolved. See git history for details.
