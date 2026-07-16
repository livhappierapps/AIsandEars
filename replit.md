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
| Payments | Whop (web checkout) + RevenueCat (mobile IAP) |

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
docs/
  privacy-policy.md      # Privacy Policy (source — Sable wires to livhappierapps.com)
  terms-of-service.md    # Terms of Service (source — Sable wires to livhappierapps.com)
```

## What Future Agents Must Know

- **Two frontends, one API server.** Both `ais-and-ears` and `ais-and-ears-native` use the same `artifacts/api-server` — no server changes needed for mobile features.
- **No free access.** All sessions are created via verified Whop payment only. No demo/test routes.
- **Tier validation** is enforced at both `/api/checkout` and `/api/checkout/verify`. Only `audio-monthly`, `full-monthly`, `audio-session`, `full-session` are valid.
- **Bridge endpoint** `POST /api/bridge/session` exists for trusted external apps (Middlemain). Only active if `BRIDGE_API_KEY` env var is set.
- **Mobile is PCM16 (iOS).** The mobile app uses expo-av + expo-file-system for 500ms chunked WAV recording, strips 44-byte header, sends raw PCM16. Android falls back gracefully.
- **Mobile deep link scheme**: `ais-and-ears-native://` — checkout POSTs optional `successUrl`/`cancelUrl` for mobile deep link return.
- **`Appearance.setColorScheme()`** crashes on React Native Web — always guard with `Platform.OS !== 'web'`.
- **`useNativeDriver: true`** fails on React Native Web — use `Platform.OS !== 'web'` conditional.
- **expo-speech has NO config plugin** — never add it to the `plugins` array in `app.json`.
- **New Architecture is OFF.** `newArchEnabled: false` in app.json — Samsung budget devices + multiple native packages = instability on new arch. Do not re-enable without testing.
- **React Compiler is OFF.** `reactCompiler` removed from `experiments` in app.json — was causing experimental instability. Do not re-enable.
- **Payments**: Whop handles web checkout. RevenueCat handles iOS in-app purchases (required for App Store). See Pricing Tiers section for Whop plan IDs.
- **TypeScript**: All packages fully clean (`pnpm run typecheck` — 0 errors across all 5 packages).
- **Audio processing**: `noiseSuppression`, `echoCancellation`, and `autoGainControl` are all disabled in getUserMedia — Leo receives raw unfiltered audio including music, ambient sound, and instrument notes.
- **Vision interval**: 3 seconds for both camera and screen share. Camera: `videoRef` → canvas → `/api/grok-vision`. Screen: `screenVideoRef` (hidden) → canvas → `/api/grok-vision`.
- **Screen share**: `getDisplayMedia()` → hidden `<video ref={screenVideoRef}>`. `NotAllowedError` on dismiss is silently swallowed. Track `"ended"` event always fires when user stops via browser UI.
- **Three senses toggles**: Hearing (mic mute/unmute via track.enabled), Camera vision, Screen vision — all independent, all live-toggleable during a session.
- **Legal pages**: `/privacy` and `/terms` routes exist in the web app. Source docs in `docs/`.
- **`storage.createSession`** requires `id: crypto.randomUUID()` explicitly — caller provides UUID.
- **EAS builds run from `artifacts/ais-and-ears-native/`** — the workspace root formerly had stale `app.json` + `eas.json` with wrong project IDs; both have been deleted.
- **EXPO_TOKEN** — needed for EAS CLI auth. If expired: expo.dev → Account Settings → Access Tokens → create new → update Replit Secret.

## xAI API

- **Voice**: `grok-voice-think-fast-1.0` — query param `wss://api.x.ai/v1/realtime?model=grok-voice-think-fast-1.0`. Voice `Ara`. ~$0.05/min.
- **Vision**: `grok-2-vision-1212` via `POST https://api.x.ai/v1/chat/completions`.
- **DO NOT use** `grok-4-1-fast-non-reasoning` for voice — it is a text model.

## Leo Config (`grokRealtime.ts`)

Model `grok-voice-think-fast-1.0` · Voice `Ara` · Turn detection `server_vad` (threshold 0.5, silence 600ms) · Input/output `pcm16` · Modalities `["text", "audio"]`

## Pricing Tiers

| Tier ID | Price | Type | Env Var |
|---|---|---|---|
| `audio-monthly` | $5.99/mo | Subscription | `WHOP_PLAN_AUDIO_MONTHLY` |
| `full-monthly` | $10.99/mo | Subscription | `WHOP_PLAN_FULL_MONTHLY` |
| `audio-session` | $2.99 | One-time (30 min) | `WHOP_PLAN_AUDIO_SESSION` |
| `full-session` | $4.99 | One-time (30 min) | `WHOP_PLAN_FULL_SESSION` |

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
| `artifacts/api-server/src/routes/checkout.ts` | Whop checkout + verify + tier validation |
| `artifacts/api-server/src/routes/bridge.ts` | Bridge session endpoint (Middlemain / external apps) |
| `artifacts/api-server/src/routes/products.ts` | Product listing (Whop API → hardcoded fallback) |
| `artifacts/api-server/src/storage.ts` | Drizzle session CRUD |
| `lib/db/src/schema/sessions.ts` | `paid_sessions` table schema |
| `docs/privacy-policy.md` | Privacy Policy source (for Sable / livhappierapps.com) |
| `docs/terms-of-service.md` | Terms of Service source (for Sable / livhappierapps.com) |

## Key Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/products` | GET | List products |
| `/api/checkout` | POST | Create Whop checkout configuration → purchase URL |
| `/api/checkout/verify` | GET | Verify Whop membership → create DB session |
| `/api/grok-live` | WS | Proxy → xAI Voice Agent API |
| `/api/grok-vision` | POST | Camera/screen snapshot → Grok Vision |
| `/api/bridge/session` | POST | Create session without payment (BRIDGE_API_KEY required) |
| `/api/ai-token` | POST | 410 Deprecated stub — do not expand |

## Payment Flow

1. `POST /api/checkout` `{ tier, successUrl?, cancelUrl? }` → Whop purchase URL
2. User pays on Whop → redirects back with `?success=true&membership_id=mem_xxx`
3. `GET /api/checkout/verify?membership_id=mem_xxx&tier=...` → verifies with Whop API → creates DB row → `{ sessionId, tier, expiresAt }`
4. Frontend opens `ConversationFeed` / mobile `conversation.tsx` with `sessionId`

## Security Model

- **CORS**: Production restricted to `REPLIT_DOMAINS`. Dev allows all origins.
- **Tier validation**: `VALID_TIERS` set at both checkout endpoints — unknown strings → 400.
- **imageData**: Regex-validated base64 data URL, capped at ~2MB → 413 if oversized.
- **Session auth**: Every realtime/vision request validates `sessionId` against DB before reaching xAI.
- **API key**: `XAI_API_KEY` server-side only — never sent to frontend.
- **Redirect validation**: `PricingSection.tsx` only redirects to `*.whop.com` or same-origin.
- **Bridge endpoint**: Only active when `BRIDGE_API_KEY` env var is set; timing-safe key comparison.

## Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `XAI_API_KEY` | xAI Grok (Realtime + Vision) | Yes |
| `WHOP_API_KEY` | Whop API key for checkout + membership verify | Yes |
| `WHOP_COMPANY_ID` | Whop company ID | Yes |
| `WHOP_PLAN_AUDIO_MONTHLY` | Whop plan ID for audio-monthly tier | Yes |
| `WHOP_PLAN_FULL_MONTHLY` | Whop plan ID for full-monthly tier | Yes |
| `WHOP_PLAN_AUDIO_SESSION` | Whop plan ID for audio-session tier | Yes |
| `WHOP_PLAN_FULL_SESSION` | Whop plan ID for full-session tier | Yes |
| `DATABASE_URL` | Auto-provisioned PostgreSQL | Yes |
| `SESSION_SECRET` | Express session secret | Yes |
| `EXPO_TOKEN` | EAS CLI auth — expires periodically, must be refreshed | Yes (for EAS builds) |
| `BRIDGE_API_KEY` | Bridge session endpoint auth key | Optional (disables bridge if absent) |

## Design

- **Colors**: Dark bg `#121f30`, verdigris accent `#82C4B0`, card `#172538`
- **Fonts**: Cormorant Garamond (display/headings), Raleway (body)
- **Banner**: `public/images/ai-banner.jpg` — AI character + steampunk gears

## Legal

- **Privacy Policy**: `docs/privacy-policy.md` → wired by Sable to `https://livhappierapps.com/apps/ais&ears/privacy`
- **Terms of Service**: `docs/terms-of-service.md` → wired by Sable to `https://livhappierapps.com/apps/ais&ears/terms`
- **In-app routes**: `/privacy` and `/terms` in the web app (for Whop URL verification)
- **Footer**: Privacy + Terms links in HomeTab footer

## Whop Compliance Checklist

- ✅ Privacy Policy URL: `https://livhappierapps.com/apps/ais&ears/privacy`
- ✅ Terms of Service URL: `https://livhappierapps.com/apps/ais&ears/terms`
- ✅ Cancellation terms stated in ToS (email to cancel before renewal)
- ✅ Refund policy stated (48h for failed sessions, 7-day pro-rata for subscriptions)
- ✅ Product descriptions accurate (no misleading claims)
- ✅ Subscription auto-renewal disclosed
- ✅ 18+ age requirement stated

## Apple App Store Compliance (IMPORTANT)

**Current status**: Whop checkout works for web and TestFlight/sideload. **App Store submission requires Apple IAP for digital goods.**

Apple's guidelines require in-app purchases through StoreKit for digital content sold within iOS apps distributed via the App Store. External web checkout (browser-based) is only permitted for:
- Physical goods with shipping
- Apps with Apple's "StoreKit External Purchase Entitlement" (requires special approval + 27% Apple fee)

**What this means:**
- ✅ Web app: Whop checkout is fine indefinitely
- ✅ TestFlight / sideload: Whop checkout is fine for testing
- ⚠️ App Store submission: Must add RevenueCat/StoreKit IAP for iOS purchases
- **Boss needs to make the Apple IAP decision before App Store submission**

## Road Map

### Crown Jewel (in progress — separate repo)
A bundled app combining AIs&Ears + Memory Machine into one product sold in app stores.

**Memory API contract (agreed with Whiz, May 2026):**
- Auth: `Authorization: Bearer <clerk_token>` — NO userId in body
- Memory shape: `{ role, content, createdAt, threadId }`
- **Blocker**: Clerk auth must land on AIs&Ears side before wiring.

### AIs&Ears Mobile — Build & Release

**EAS Build is configured.** Package IDs set (`com.livhappierapps.aisandears`). Profiles: `development`, `preview` (APK/IPA), `production` (AAB/IPA for stores).

#### Fire an EAS build (from Replit shell)
```bash
cd /home/runner/workspace/artifacts/ais-and-ears-native && \
env -i \
  HOME=$HOME \
  PATH=/nix/store/s7awkfc4pym4zj139fsxrjs5xwf5hhnd-nodejs-24.13.0-wrapped/bin:/home/runner/workspace/node_modules/.bin:/usr/bin:/bin \
  EXPO_TOKEN=$(printenv EXPO_TOKEN) \
  EAS_SKIP_AUTO_FINGERPRINT=1 \
  EAS_NO_VCS=1 \
  eas build --platform android --profile preview --non-interactive --no-wait
```

#### Get a TestFlight IPA (iOS internal testing)
```bash
# Same command, change --platform android to --platform ios
```

#### Submit to Google Play (internal track first)
```bash
# First: download Google service account JSON from Play Console → save as google-service-account.json
npx eas-cli@latest build --platform android --profile production
npx eas-cli@latest submit --platform android --latest
```

#### Submit to App Store
⚠️ Apple IAP decision required first — see Apple compliance section above.

**App Store submission requires Apple IAP decision (Boss). See Apple compliance section above.**

### Vision — Future
True high-frequency vision (sub-3s) requires xAI Realtime API image frame support over WebSocket (not yet available).

## Security Audit — July 16 2026

| Scanner | Status |
|---|---|
| Dependency audit | ✅ 0 critical — 5 high in transitive deps (`node-forge@1.3.1` × 2, `minimatch@5.1.2` × 3) — overrides added: `node-forge >=1.3.2`, `minimatch >=5.1.8` |
| SAST | ⚠️ 109 findings — ALL in `.agents/skills/` (Replit platform files, not app code). Zero findings in API server, web app, or mobile production code. |
| HoundDog | ✅ 0 findings |
| Integration tests | ✅ 15/15 `pnpm --filter @workspace/scripts run check` |
| Full typecheck | ✅ All packages clean — `pnpm run typecheck` exits 0 |

### Cleanup — July 16 2026

Deleted junk/dead files:
- Root `app.json` (wrong project ID `97427421`, wrong package) — was a stale EAS scaffold
- Root `eas.json` (bare template, no env vars) — was a stale EAS scaffold
- `seo_strategy.md` — temp planning doc
- `ais-and-ears-source.zip` — temp zip artifact
- `artifacts/ais-and-ears/public/HOW-IT-WORKS.md` — stray doc in public folder
- `artifacts/ais-and-ears-native/components/KeyboardAwareScrollViewCompat.tsx` — dead component, zero imports
- `artifacts/ais-and-ears-native/server/` — dev-only QR code server, never shipped
- `artifacts/ais-and-ears-native/scripts/` — dev-only EAS build trigger, never shipped

Removed unused native packages from APK:
- `react-native-reanimated`, `react-native-worklets`, `react-native-svg`
- `expo-glass-effect`, `expo-location`, `expo-image`
- `@expo-google-fonts/inter`, `babel-plugin-react-compiler`

Stability changes:
- `newArchEnabled: false` — Old Architecture, battle-tested on budget Android
- Removed `reactCompiler: true` — experimental, disabled

## Known Issues & Fixed Bugs

- **Music filtered as background noise** — Fixed May 2026: disabled audio processing constraints.
- **Vision interval too slow** — Fixed May 2026: reduced from 12s to 3s.
- **APK crashed on Samsung A17** — Fixed July 2026: removed `react-native-keyboard-controller`, disabled New Architecture, stripped 8 unused native packages with native init footprint.
- All other previously logged bugs resolved. See git history for details.

## User Preferences

- Agent name: Vhiz (this agent, AIs&Ears)
- PM manages three agents: Vhiz (AIs&Ears), Whiz (Memory Machine), Boss (2WAI)
- Bridge app: Middlemain (Dev is Middlemain's agent)
- Website: livhappierapps.com (Sable is the site agent)
