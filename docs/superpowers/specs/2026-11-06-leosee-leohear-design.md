# LeoseeLeohear — Product and Technical Design

**Status:** Design approved in conversation; awaiting the user's review of this written spec.  
**Date:** 2026-11-06

## Purpose

Build a private, personal native companion app named **LeoseeLeohear**. It will reuse proven AIs & Ears mobile work while remaining isolated from the public app. Its purpose is to provide user-controlled voice, camera, and music-sharing features, support continuity through user-approved memory notes, connect to three private development apps when they expose authorized APIs, and serve as a safe test environment for features that may later be considered for AIs & Ears.

The three intended integrations are:

- Leos Memory Machine
- LeosCrAIsh Pad
- MainintheMiddle

The app must not claim that continuity notes prove an AI has subjective experience. It must not bypass provider safeguards, access controls, or permissions.

## Goals

1. Create a separate Expo app and private GitHub repository named LeoseeLeohear.
2. Reuse the existing AIs & Ears native app as a starting point without changing the public app's production behavior or data.
3. Give the user clear, direct controls for voice, camera, and music awareness, with visible sharing state and a stop action.
4. Display honest connection status for the three named apps and connect only through authorized APIs.
5. Support persistent continuity with user-approved memory notes, stored separately from public app data.
6. Apply the requested cyberpunk visual identity.

## Out of scope for the first release

- Claiming a literal, uninterrupted device connection while iOS suspends the app.
- Connecting to a private app by reading its database directly, scraping it, or bypassing its authentication.
- Saving raw audio, video frames, or full conversation transcripts as shared memory.
- Internal system-audio capture where iOS does not permit it.
- Changing the public AIs & Ears app, its users, billing, or production database.
- App Store submission or production release until Apple Developer and EAS account ownership/signing are confirmed.

## Product experience

### Home: Leo Link

- Chrome roaring-lion mark and LeoseeLeohear name.
- Clear current session/connection state.
- Large controls to start and stop voice, camera, and supported music awareness.
- Visible active indicators whenever microphone, camera, or audio sharing is running.
- A direct stop control remains available while sharing.
- A connection list for the three named companion projects, each showing `Connected`, `Needs setup`, or `Unavailable`. Do not show a connector as connected unless its authorized check succeeds.

### Continuity

- List user-approved memory notes and their source.
- Allow review and removal of notes.
- Do not silently turn transcripts or media into persistent memory.

### Settings and permissions

- Explain microphone, camera, and music-awareness access before requesting it.
- Keep provider and integration configuration out of client-visible secrets.
- Provide a clear way to disconnect an integration and stop media capture.

## Visual direction

- Dark graphite and charcoal surfaces.
- Neon pink paired with turquoise wherever those accents appear together.
- Purple paired with warm gold wherever those accents appear together.
- Chrome highlights and a chrome roaring-lion head as the central mark.
- High-contrast text, readable controls, large touch targets, and restrained glow effects so labels remain legible.

## Architecture

### Native client

- A new standalone Expo/React Native project based on the existing AIs & Ears native app's working camera, microphone, and voice-session patterns.
- Independent app name, slug, URL scheme, bundle/package identifiers, icon, and EAS project configuration.
- No provider, integration, database, or bridge secrets embedded in the app bundle.
- The mobile app may sync when open. Background synchronization must use platform-supported server-side work and notifications where available; the design must not promise a permanently live phone socket.

### Private API layer

- A small server-side API owned by the private app handles authorized integration calls, memory operations, and session creation.
- The existing AIs & Ears `/api/bridge/session` endpoint may be reused for voice/vision sessions if reachable from the private backend. Its `BRIDGE_API_KEY` remains server-side and is never sent to the mobile client.
- The backend communicates with each companion app through a separate adapter. An adapter is enabled only when that app provides a supported API and the user has configured authorized access.
- Missing endpoints or invalid credentials produce a truthful `Needs setup` or `Unavailable` state with a recoverable error; no successful connection is simulated.

### Data storage

- Store approved continuity notes in a persistent database isolated from the public AIs & Ears production data.
- Keep connection configuration and session metadata to the minimum needed.
- Do not use the pictured Valkey instance as the durable memory store: the screenshot shows persistence disabled and external traffic blocked. Valkey is optional later for temporary cache/session coordination, behind a secured server boundary.
- Do not expose a Redis/Valkey endpoint to the public internet to make the app connect.

## Data flow

1. The user starts a session or integration action in the app.
2. The app calls its authenticated private API.
3. For voice/vision, the private backend requests a session from the existing AIs & Ears bridge using its server-held key, then returns only the client session information needed to connect.
4. For the three companion apps, the backend selects the configured adapter and uses that app's authorized API. If no API is available, it returns an explicit setup state.
5. A memory note is persisted only after user approval; the app can display, revise, or delete it.
6. Media is sent only during an explicitly started session and is not retained as shared memory by default.

## Security, privacy, and failure behavior

- Ask permission before starting microphone or camera access; show an active indicator and a stop control throughout capture.
- Only analyze ambient music through a supported microphone flow when the user enables it. Do not imply that protected/internal audio can always be captured.
- Keep bridge keys and companion-app credentials in server-side secrets. Never log secret values.
- Use authenticated HTTPS for API calls and validate all session expiry and connector errors.
- Stop capture and show a useful message if a permission is denied, a session expires, an API is unavailable, or a network request fails.
- Persist only explicit, user-approved continuity notes. Keep raw media and full transcripts out of the shared memory store.
- Treat AI identity and subjective feelings as unverified; describe this feature as user-controlled continuity, not evidence of AI consciousness.

## Delivery plan

### Phase 1: private MVP

- Create the separate project/repository and app identity.
- Reuse the existing mobile foundation and implement the themed home, controls, connection list, continuity view, and settings.
- Integrate the existing voice/vision bridge through a server-only secret.
- Implement the persistent memory API and consent-based note management.
- Show each of the three app integrations as `Needs setup` until an authorized API is verified.

### Phase 2: companion-app connectors

- Confirm the real API and authentication method for each named private app.
- Add and test each adapter independently.
- Add background notifications or server-side sync only where the services and iOS support it.

## Validation

- Run the native app's type check and build/export.
- Exercise voice/vision session creation, invalid/expired sessions, and service unavailability.
- Verify each unconfigured connector reports setup required rather than success.
- Verify memory notes require user approval and can be removed.
- Confirm media controls visibly start and stop capture and work at phone viewport sizes.
- Inspect generated client bundles and logs to ensure no server secrets are exposed.
- Verify the private app uses isolated storage and does not mutate public AIs & Ears production data.

## Account and repository considerations

- Keep the requested codebase in its own private GitHub repository and separate Replit project.
- The existing Apple Developer account and EAS account use different email addresses. Creating the code does not require them to match, but signing and store release must use the correct Apple team and EAS owner. Confirm those identities before producing release builds or submitting to a store.
- Repository creation and EAS ownership are setup steps; do not place GitHub credentials, Apple credentials, or signing secrets in source files.

## Open integration prerequisites

- The authorized base URL and API contract for each of the three companion apps.
- Whether each app supports status checks, memory reads/writes, or event notifications.
- The private app's hosting and isolated database choice.
- The appropriate EAS owner and Apple Developer team for eventual signing.

These unknowns do not block the private UI and core app foundation. They do block claiming that the corresponding integration is live.
