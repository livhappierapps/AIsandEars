---
name: Bridge session endpoint
description: POST /api/bridge/session — creates a paid session without Stripe for trusted external apps (e.g. Middlemain).
---

## Rule
`POST /api/bridge/session` is gated on the `BRIDGE_API_KEY` env var. If the var is absent the route returns 404 — it is completely invisible. Key is stored via `setEnvVars()` in the shared environment.

**Why:** Lets sibling apps (Middlemain, Crown Jewel) connect to Leo without going through Stripe checkout, while keeping the endpoint invisible in production if not configured.

**How to apply:** Any trusted external app that needs a Leo session calls this endpoint first, gets back `{ sessionId, wsUrl, visionUrl, expiresAt }`, then connects via WebSocket to `wsUrl`. The key must stay server-side in the calling app — never in client code.

## Integration protocol for external apps (e.g. Middlemain/Dev)
1. `POST /api/bridge/session` `{ apiKey, tier?, durationMinutes? }` → `{ sessionId, wsUrl, visionUrl }`
2. WebSocket to `wsUrl` — send `{ type: "input_audio_buffer.append", audio: "<base64 PCM16 24kHz mono>" }`
3. Vision frames: `POST visionUrl` `{ sessionId, imageData: "data:image/jpeg;base64,...", prompt?, isFirstFrame? }`

Valid tiers: `audio-monthly`, `full-monthly`, `audio-session`, `full-session`. Default: `full-session`.
