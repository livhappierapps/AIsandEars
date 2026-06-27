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
docs/
  privacy-policy.md      # Privacy Policy (source — Sable wires to livhappierapps.com)
  terms-of-service.md    # Terms of Service (source — Sable wires to livhappierapps.com)
```

## What Future Agents Must Know

- **Two frontends, one API server.** Both `ais-and-ears` and `ais-and-ears-native` use the same `artifacts/api-server` — no server changes needed for mobile features.
- **No free access.** All sessions are created via verified Stripe payment only. No demo/test routes.
- **Tier validation** is enforced at both `/api/checkout` and `/api/checkout/verify`. Only `audio-monthly`, `full-monthly`, `audio-session`, `full-session` are valid.
- **Bridge endpoint** `POST /api/bridge/session` exists for trusted external apps (Middlemain). Only active if `BRIDGE_API_KEY` env var is set.
- **Mobile is PCM16 (iOS).** The mobile app uses expo-av + expo-file-system for 500ms chunked WAV recording, strips 44-byte header, sends raw PCM16. Android falls back gracefully.
- **Mobile deep link scheme**: `ais-and-ears-native://` — checkout POSTs optional `successUrl`/`cancelUrl` for mobile deep link return.
- **`Appearance.setColorScheme()`** crashes on React Native Web — always guard with `Platform.OS !== 'web'`.
- **`useNativeDriver: true`** fails on React Native Web — use `Platform.OS !== 'web'` conditional.
- **expo-speech has NO config plugin** — never add it to the `plugins` array in `app.json`.
- **Stripe key format**: `STRIPE_SECRET_KEY` must be `sk_test_51...` (Standard). The `mk_` prefix (Restricted key) causes 401 errors.
- **TypeScript**: All packages fully clean (`pnpm run typecheck` — 0 errors across all 5 packages).
- **Security audit last run**: June 27 2026 — all clean. Dependency audit: 0 vulns (undici override added). HoundDog: 0. SAST: 48 findings all in dev/build tooling scripts (not shipped production code).
- **Audio processing**: `noiseSuppression`, `echoCancellation`, and `autoGainControl` are all disabled in getUserMedia — Leo receives raw unfiltered audio including music, ambient sound, and instrument notes.
- **Vision interval**: 3 seconds for both camera and screen share. Camera: `videoRef` → canvas → `/api/grok-vision`. Screen: `screenVideoRef` (hidden) → canvas → `/api/grok-vision`.
- **Screen share**: `getDisplayMedia()` → hidden `<video ref={screenVideoRef}>`. `NotAllowedError` on dismiss is silently swallowed. Track `"ended"` event always fires when user stops via browser UI.
- **Three senses toggles**: Hearing (mic mute/unmute via track.enabled), Camera vision, Screen vision — all independent, all live-toggleable during a session.
- **Legal pages**: `/privacy` and `/terms` routes exist in the web app. Source docs in `docs/`.
- **`storage.createSession`** requires `id: crypto.randomUUID()` explicitly — caller provides UUID.

## xAI API

- **Voice**: `grok-voice-think-fast-1.0` — query param `wss://api.x.ai/v1/realtime?model=grok-voice-think-fast-1.0`. Voice `Ara`. ~$0.05/min.
- **Vision**: `grok-2-vision-1212` via `POST https://api.x.ai/v1/chat/completions`.
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
Web:    AudioWorklet (PCM16 @ 24kHz, raw/unfiltered) → WS /api/grok-live → xAI Voice Agent API
        Camera frame (every 3s) → POST /api/grok-vision → grok-2-vision-1212
        Screen frame (every 3s) → POST /api/grok-vision → grok-2-vision-1212
Mobile: expo-av WAV chunks (500ms, 24kHz, PCM16, strips 44B header) → WS /api/grok-live
        ImagePicker → POST /api/grok-vision → grok-2-vision-1212
```

## Key Files

| File | Purpose |
|---|---|
| `artifacts/ais-and-ears/src/components/feed/ConversationFeed.tsx` | Web live session UI — mic, camera, screen share, Leo |
| `artifacts/ais-and-ears/src/pages/PrivacyPolicy.tsx` | /privacy page |
| `artifacts/ais-and-ears/src/pages/TermsOfService.tsx` | /terms page |
| `artifacts/ais-and-ears/public/audio-processor.js` | AudioWorklet — PCM16 encoder |
| `artifacts/ais-and-ears-native/app/conversation.tsx` | Mobile live session (PCM16 mic + camera) |
| `artifacts/ais-and-ears-native/context/SettingsContext.tsx` | Mobile settings + dark mode |
| `artifacts/api-server/src/websocket/grokRealtime.ts` | WS proxy → xAI Voice Agent |
| `artifacts/api-server/src/routes/grokVision.ts` | Camera/screen snapshot → Grok Vision |
| `artifacts/api-server/src/routes/checkout.ts` | Stripe checkout + verify + tier validation |
| `artifacts/api-server/src/routes/bridge.ts` | Bridge session endpoint (Middlemain / external apps) |
| `artifacts/api-server/src/routes/products.ts` | Product listing (DB → Stripe → hardcoded fallback) |
| `artifacts/api-server/src/storage.ts` | Drizzle session CRUD |
| `lib/db/src/schema/sessions.ts` | `paid_sessions` table schema |
| `docs/privacy-policy.md` | Privacy Policy source (for Sable / livhappierapps.com) |
| `docs/terms-of-service.md` | Terms of Service source (for Sable / livhappierapps.com) |

## Key Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/products` | GET | List products |
| `/api/checkout` | POST | Create Stripe session or payment link |
| `/api/checkout/verify` | GET | Verify payment → create DB session |
| `/api/grok-live` | WS | Proxy → xAI Voice Agent API |
| `/api/grok-vision` | POST | Camera/screen snapshot → Grok Vision |
| `/api/bridge/session` | POST | Create session without Stripe (BRIDGE_API_KEY required) |
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
- **Bridge endpoint**: Only active when `BRIDGE_API_KEY` env var is set; timing-safe key comparison.

## Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `XAI_API_KEY` | xAI Grok (Realtime + Vision) | Yes |
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` Standard key | For checkout |
| `STRIPE_PUBLISHABLE_KEY` | Frontend Stripe key | For checkout |
| `DATABASE_URL` | Auto-provisioned PostgreSQL | Yes |
| `SESSION_SECRET` | Express session secret | Yes |
| `BRIDGE_API_KEY` | Bridge session endpoint auth key | Optional (disables bridge if absent) |
| `STRIPE_LINK_*` | Payment link URL fallbacks | Optional |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature | Optional, recommended in prod |

## Design

- **Colors**: Dark bg `#121f30`, verdigris accent `#82C4B0`, card `#172538`
- **Fonts**: Cormorant Garamond (display/headings), Raleway (body)
- **Banner**: `public/images/ai-banner.jpg` — AI character + steampunk gears

## Legal

- **Privacy Policy**: `docs/privacy-policy.md` → wired by Sable to `https://livhappierapps.com/apps/ais&ears/privacy`
- **Terms of Service**: `docs/terms-of-service.md` → wired by Sable to `https://livhappierapps.com/apps/ais&ears/terms`
- **In-app routes**: `/privacy` and `/terms` in the web app (for Stripe URL verification)
- **Footer**: Privacy + Terms links in HomeTab footer

## Stripe Compliance Checklist

- ✅ Privacy Policy URL: `https://livhappierapps.com/apps/ais&ears/privacy`
- ✅ Terms of Service URL: `https://livhappierapps.com/apps/ais&ears/terms`
- ✅ Cancellation terms stated in ToS (email to cancel before renewal)
- ✅ Refund policy stated (48h for failed sessions, 7-day pro-rata for subscriptions)
- ✅ Product descriptions accurate (no misleading claims)
- ✅ Subscription auto-renewal disclosed
- ✅ 18+ age requirement stated
- ⚠️ Live Stripe keys required before going live (swap from `sk_test_...` to `sk_live_...`)

## Apple App Store Compliance (IMPORTANT)

**Current status**: Stripe checkout works for web and TestFlight. **App Store submission requires Apple IAP for digital goods.**

Apple's guidelines require in-app purchases through StoreKit for digital content sold within iOS apps distributed via the App Store. External Stripe checkout (browser-based) is only permitted for:
- Physical goods with shipping
- Apps with Apple's "StoreKit External Purchase Entitlement" (requires special approval + 27% Apple fee)

**What this means:**
- ✅ Web app: Stripe is fine indefinitely
- ✅ TestFlight / development: Stripe is fine for testing
- ⚠️ App Store submission: Must add RevenueCat/StoreKit IAP for iOS purchases
- **Boss needs to make the Apple IAP decision before App Store submission**

## Road Map

### Crown Jewel (in progress — separate repo)
A bundled app combining AIs&Ears + Memory Machine into one product sold in app stores.

**Memory API contract (agreed with Whiz, May 2026):**
- Auth: `Authorization: Bearer <clerk_token>` — NO userId in body
- Memory shape: `{ role, content, createdAt, threadId }`
- **Blocker**: Clerk auth must land on AIs&Ears side before wiring.

### AIs&Ears Mobile — Next Steps
App Store submission requires Apple IAP decision (Boss). See Apple compliance section above.

### Vision — Future
True high-frequency vision (sub-3s) requires xAI Realtime API image frame support over WebSocket (not yet available).

## Security Audit — June 27 2026

| Scanner | Status |
|---|---|
| Dependency audit | ✅ 0 vulnerabilities — `undici >=6.27.0` override added to fix 1 high + 1 moderate + 2 low CVEs in `@expo/cli>undici` |
| SAST (app code) | ⚠️ 48 medium findings — ALL in `ais-and-ears-native/scripts/build.js` + `server/serve.js` + `server/templates/landing-page.html` (dev/build tooling only, never executed at runtime) + 1 in `mockup-sandbox/src/App.tsx` (internal design tool). Zero findings in API server or web app production code. |
| HoundDog | ✅ 0 findings |
| Integration tests | ✅ 15/15 `pnpm --filter @workspace/scripts run check` |
| Full typecheck | ✅ All 5 packages clean — `pnpm run typecheck` exits 0 |

### SAST False-Positive Detail

| File | Findings | Verdict |
|---|---|---|
| `ais-and-ears-native/scripts/build.js` | 37 medium — fs/path-join with internal function args | ✅ False positive — internal EAS build script, no user input, never deployed |
| `ais-and-ears-native/server/serve.js` | 8 medium — same + http-server warning | ✅ False positive — manual dev utility (`npm run serve`), no active workflow |
| `ais-and-ears-native/server/templates/landing-page.html` | 2 medium — CDN script tag missing SRI | ⚠️ Low risk — dev-only QR code page, never user-facing in production |
| `mockup-sandbox/src/App.tsx` | 1 medium — dynamic property access `mod[name]` | ✅ False positive — internal design canvas tool, name comes from filesystem keys |

## Known Issues & Fixed Bugs

- **`mk_` Stripe key** — Restricted key prefix causes 401. Must use Standard `sk_test_...` key.
- **Music filtered as background noise** — Fixed May 2026: disabled audio processing constraints.
- **Vision interval too slow** — Fixed May 2026: reduced from 12s to 3s.
- All other previously logged bugs resolved. See git history for details.

## User Preferences

- Agent name: Vhiz (this agent, AIs&Ears)
- PM manages three agents: Vhiz (AIs&Ears), Whiz (Memory Machine), Boss (2WAI)
- Bridge app: Middlemain (Dev is Middlemain's agent)
- Website: livhappierapps.com (Sable is the site agent)
