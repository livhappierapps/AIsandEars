# LeoseeLeohear Implementation Plan

> **For agentic workers:** Follow the tasks in order. Use a fresh test before implementation when possible, verify the failure, then implement the smallest working change. Keep commits focused.

**Goal:** Build a private native LeoseeLeohear MVP that reuses the AIs & Ears voice/vision foundation, gives the user explicit media controls, and stores approved continuity notes separately from the public app.

**Architecture:** Create a standalone private Expo app and API in a new private project/repository. The mobile app calls its authenticated API; the API uses the existing AIs & Ears bridge for voice/vision, provides isolated persistent memory, and reports named integrations as setup-required until an authorized service API is configured.

**Tech Stack:** Expo Router, React Native, TypeScript, Express, PostgreSQL, pnpm, and the existing AIs & Ears bridge endpoint. Keep `BRIDGE_API_KEY` server-side.

---

## Project structure

Create this layout in the new private repository:

```text
apps/
  mobile/
    app/
    src/
      api/
      components/
      theme/
  api/
    src/
      auth/
      routes/
      services/
      storage/
    test/
```

Use `artifacts/ais-and-ears-native/` as the mobile source reference and `artifacts/api-server/src/routes/bridge.ts` as the server bridge reference. Do not change the public AIs & Ears artifact or its production database.

## Task 1: Create the isolated project and app identity

**Files:**
- Create: new private Replit project and private GitHub repository `LeoseeLeohear`
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `apps/mobile/app.json`
- Create: `apps/mobile/eas.json`
- Create: `apps/mobile/assets/chrome-roaring-lion.png`
- Copy the required Expo app source from `artifacts/ais-and-ears-native/`

- [ ] Create the new private project/repository; do not fork public or production data.
- [ ] Copy only the native source and required assets from `artifacts/ais-and-ears-native/`.
- [ ] Register the Expo app as the project's mobile artifact through Replit's artifact workflow; do not hand-edit `artifact.toml`.
- [ ] Set the app name to `LeoseeLeohear`, slug to `leosee-leohear`, URL scheme to `leoseeleohear`, and use independent iOS/Android identifiers `com.livhappierapps.leoseeleohear`.
- [ ] Remove inherited AIs & Ears EAS project identifiers and set a new EAS project only under the confirmed Expo account.
- [ ] Set workspace package names to `@leosee/mobile` and `@leosee/api`; define root `test` and `typecheck` scripts that run both workspaces.
- [ ] Install dependencies with `pnpm install`.
- [ ] Run `pnpm --filter @leosee/mobile typecheck`; expected result: exit code 0.
- [ ] Commit the project scaffold as `build: create private LeoseeLeohear project`.

## Task 2: Build the private API and protected voice/vision bridge

**Files:**
- Create: `apps/api/src/app.ts`
- Create: `apps/api/src/auth/replit-auth.ts`
- Create: `apps/api/src/routes/session.ts`
- Create: `apps/api/src/services/ais-and-ears-bridge.ts`
- Create: `apps/api/test/ais-and-ears-bridge.test.ts`
- Create: `apps/api/test/session-auth.test.ts`
- Modify: root `package.json`
- Modify: root `pnpm-workspace.yaml`

- [ ] Add failing tests asserting unauthenticated `/api/session` requests receive `401`, valid owner sessions can request a bridge session, and missing bridge configuration receives `503`.
- [ ] Implement owner-only sign-in with Replit Auth for the Expo app and Express API; do not add public registration.
- [ ] Implement `createAisAndEarsSession(baseUrl, bridgeKey, fetchImpl)` to send `POST ${baseUrl}/api/bridge/session` with JSON `{ "apiKey": bridgeKey, "tier": "full-session", "durationMinutes": 30 }`.
- [ ] Return only `sessionId`, `wsUrl`, `visionUrl`, and `expiresAt` to the authenticated app session. Do not return the bridge key or log request bodies.
- [ ] Implement `POST /api/session` with owner authentication, input validation, a request timeout, and explicit `503` behavior when bridge configuration is missing.
- [ ] Read `AIE_BRIDGE_BASE_URL` and `BRIDGE_API_KEY` from server environment variables. Never add their values to client configuration, source control, or logs.
- [ ] Run `pnpm --filter @leosee/api test`; expected result: tests pass, including missing-secret and upstream-error cases.
- [ ] Run `pnpm --filter @leosee/api typecheck`; expected result: exit code 0.
- [ ] Commit as `feat(api): add protected AIs and Ears session bridge`.

## Task 3: Add isolated, user-approved continuity notes

**Files:**
- Create: `apps/api/src/storage/database.ts`
- Create: `apps/api/src/storage/memory-notes.ts`
- Create: `apps/api/src/routes/memory.ts`
- Create: `apps/api/test/memory-notes.test.ts`
- Create: `apps/api/src/storage/migrations/001_memory_notes.sql`
- Create: `apps/mobile/src/api/memory.ts`
- Create: `apps/mobile/app/memory.tsx`

- [ ] Add a failing test proving notes are scoped to the authenticated owner and deleted notes cannot be read.
- [ ] Create a dedicated persistent PostgreSQL database for the private app; do not point it at the public AIs & Ears production database.
- [ ] Define a `memory_notes` table with UUID `id`, authenticated Replit owner ID, note text, source label, `created_at`, and `updated_at`; require non-empty text and cap note text at 4,000 characters.
- [ ] Implement authenticated list, create, update, and delete routes. Store a note only after an explicit user action; do not ingest audio, video, or transcripts.
- [ ] Implement a memory screen that lists notes with source and date, supports add/edit/delete, and shows loading, empty, and failure states.
- [ ] Run `pnpm --filter @leosee/api test`; expected result: owner-isolation and CRUD tests pass.
- [ ] Run API and mobile type checks; expected result: both exit code 0.
- [ ] Commit as `feat(memory): add private approved continuity notes`.

## Task 4: Implement the cyberpunk app shell and connection status

**Files:**
- Create: `apps/mobile/src/theme/tokens.ts`
- Create: `apps/mobile/src/components/ConnectionRow.tsx`
- Create: `apps/mobile/src/api/connections.ts`
- Create: `apps/api/src/routes/connections.ts`
- Create: `apps/api/test/connections.test.ts`
- Create: `apps/mobile/app/(tabs)/index.tsx`
- Create: `apps/mobile/app/connections.tsx`
- Modify: `apps/mobile/app/_layout.tsx`
- Modify: `apps/mobile/app.json`

- [ ] Create an original roaring-lion-head graphic in polished chrome and save the finished image as `apps/mobile/assets/chrome-roaring-lion.png`.
- [ ] Add theme-token tests for the required dark graphite base and paired accent colors.
- [ ] Implement reusable theme tokens for charcoal, neon pink/turquoise, purple/gold, chrome highlights, readable text, and focus states.
- [ ] Build the home dashboard with the lion graphic, session status, large media controls, and connection rows for Leos Memory Machine, LeosCrAIsh Pad, and MainintheMiddle.
- [ ] Add failing tests asserting all three unconfigured integrations return `needs_setup` and a failed health check returns `unavailable`.
- [ ] Implement `GET /api/connections` with explicit `connected`, `needs_setup`, and `unavailable` states; do not return `connected` unless the configured adapter's authorized health check succeeds.
- [ ] Keep unconfigured connectors visible as `Needs setup` with an explanation; do not use mock success data.
- [ ] Run `pnpm --filter @leosee/mobile test`; expected result: theme and connection-state tests pass.
- [ ] Run `pnpm --filter @leosee/mobile typecheck`; expected result: exit code 0.
- [ ] Commit as `feat(mobile): add Leo Link dashboard and cyberpunk theme`.

## Task 5: Add explicit voice, camera, and music controls

**Files:**
- Create: `apps/mobile/src/components/ActiveShareControls.tsx`
- Create: `apps/mobile/src/components/PermissionNotice.tsx`
- Create: `apps/mobile/src/api/session.ts`
- Modify: `apps/mobile/app/(tabs)/index.tsx`
- Modify: `apps/mobile/app/settings.tsx`
- Create: `apps/mobile/test/ActiveShareControls.test.tsx`

- [ ] Add failing tests for the idle, active, permission-denied, session-expired, and stop states.
- [ ] Connect the voice/vision controls to the protected session API and the existing session URLs it returns.
- [ ] Request microphone or camera permission only after the user starts the matching feature; show an active indicator and persistent stop control until capture ends.
- [ ] Add music awareness as an explicit opt-in microphone feature only. Label it as ambient-microphone analysis; do not claim internal audio capture.
- [ ] Stop capture on user request, permission revocation, session expiry, navigation away from the active session, or unrecoverable network error.
- [ ] Run mobile tests and typecheck; expected result: all tests pass and the type check exits 0.
- [ ] Commit as `feat(mobile): add user-controlled media sessions`.

## Task 6: Verify isolation, failure behavior, and phone layout

**Files:**
- Modify: `apps/api/test/ais-and-ears-bridge.test.ts`
- Modify: `apps/api/test/memory-notes.test.ts`
- Modify: `apps/mobile/test/ActiveShareControls.test.tsx`
- Create: `README.md`

- [ ] Add tests for missing bridge secret, upstream timeout, expired session, unconfigured connectors, denied media permissions, and failed memory requests.
- [ ] Search the built mobile bundle and logs for `BRIDGE_API_KEY`; expected result: no value or key reference is present in client code or logs.
- [ ] Run `pnpm test`; expected result: all API and mobile tests pass.
- [ ] Run `pnpm typecheck`; expected result: exit code 0.
- [ ] Run the Expo app on a phone-sized preview and verify text contrast, large controls, active indicators, and stop behavior.
- [ ] Document local setup, required server environment variable names, and the fact that all three connectors remain setup-required until their actual API contracts are configured.
- [ ] Commit as `test: verify private app safety and failure states`.

## Deferred connector work

Do not write adapters against guessed endpoints. After the private apps' owners provide authorized base URLs, API contracts, and authentication methods, make one small connector plan per service. Each connector must have an independently testable health check and only the read/write permissions needed for its approved feature.

## Spec coverage self-review

- Separate native project and private repository: Task 1.
- Reuse without affecting the public app: project structure and Tasks 1–2.
- Voice/vision bridge and server-only secret: Task 2.
- Isolated persistent memory with explicit approval: Task 3.
- Requested visual theme and connection states: Task 4.
- User-controlled media capture and stop behavior: Task 5.
- Error handling, privacy checks, phone layout, and tests: Task 6.
- Real third-party connectors: deferred until authorized API contracts exist; the MVP never simulates successful connections.
- App Store/EAS release and account matching: intentionally excluded from this implementation plan until signing ownership is confirmed.
