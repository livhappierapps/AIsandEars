# AIs & Ears — How It Works

A guide for developers who want to understand, adapt, or build on this codebase.

---

## The Core Idea

Most AI voice apps work like this:

```
Your voice → STT (speech-to-text) → text → LLM → text → TTS → audio
```

AIs & Ears skips all of that. Leo hears you **directly** — raw audio bytes, no transcription, no middleman:

```
Your mic → PCM16 bytes → WebSocket → xAI Realtime API → Leo's voice back to you
```

Vision works the same way. Leo doesn't see "image description text" — it sees actual JPEG frames from your camera.

This matters because:
- **Latency**: no STT round-trip, no TTS round-trip
- **Fidelity**: Leo hears tone, music, ambient sound — not a transcript
- **Natural turn-taking**: xAI's server-side VAD (voice activity detection) decides when you've stopped speaking, not a silence timer

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   Browser / Mobile                  │
│                                                     │
│  Microphone → AudioWorklet (PCM16 @ 24kHz)         │
│       │                                             │
│       └──── WebSocket ──────────────────────────┐  │
│                                                 │  │
│  Camera → canvas.toDataURL() → REST POST ───┐  │  │
└─────────────────────────────────────────────│──│──┘
                                              │  │
┌─────────────────────────────────────────────│──│──┐
│                   API Server (Express)      │  │  │
│                                             │  │  │
│  POST /api/grok-vision ◄────────────────────┘  │  │
│       │                                         │  │
│       └── fetch() ──► xAI chat/completions      │  │
│                           (grok-2-vision-1212)  │  │
│                                                 │  │
│  WS /api/grok-live ◄────────────────────────────┘  │
│       │                                             │
│       └── WebSocket ──► xAI Realtime API            │
│                           (grok-voice-think-fast)   │
└─────────────────────────────────────────────────────┘
```

---

## Step-by-Step: Voice Pipeline

### 1. getUserMedia — raw mic capture

```javascript
const stream = await navigator.mediaDevices.getUserMedia({
  audio: {
    sampleRate: 24000,
    channelCount: 1,
    echoCancellation: false,   // ← disabled intentionally
    noiseSuppression: false,   // ← Leo hears music, instruments, ambient
    autoGainControl: false,    // ← raw unprocessed signal
  }
});
```

**Why disable echo/noise/AGC?** The browser's default noise suppression strips out anything that isn't a voice — music, room sound, instrument notes all get filtered out. Disabled, Leo hears exactly what your mic hears.

### 2. AudioWorklet — float32 → PCM16 conversion

The Web Audio API produces float32 samples in range `[-1.0, 1.0]`. xAI needs PCM16 — signed 16-bit integers. The conversion happens in `public/audio-processor.js` on a dedicated audio thread:

```javascript
// float32 [-1, 1]  →  int16 [-32768, 32767]
int16[i] = Math.max(-32768, Math.min(32767, Math.round(chunk[i] * 32767)));
```

We buffer 100ms of samples before sending (100ms × 24000 samples/sec = 2400 samples per chunk).

### 3. Main thread — base64 encode and send

The worklet transfers its `Int16Array` buffer to the main thread (zero-copy). The main thread base64-encodes it and sends it over WebSocket:

```javascript
workletNode.port.onmessage = (e) => {
  const int16 = new Int16Array(e.data);
  const bytes = new Uint8Array(int16.buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  ws.send(JSON.stringify({ type: "input_audio_buffer.append", audio: btoa(binary) }));
};
```

### 4. Server — transparent proxy

`artifacts/api-server/src/websocket/grokRealtime.ts` is a pure bidirectional proxy — it passes bytes in both directions without inspecting them. The only thing it adds is the initial `session.update` message on open, which configures Leo's voice, VAD settings, and personality.

On connect, the server:
1. Validates the paid session from the DB
2. Opens a second WebSocket to `wss://api.x.ai/v1/realtime?model=grok-voice-think-fast-1.0`
3. Sends `session.update` to configure Leo
4. Relays all subsequent messages in both directions

### 5. Leo's audio response — PCM16 back to speaker

xAI sends audio back as `response.audio.delta` events (base64 PCM16). The client decodes them and plays them via the Web Audio API:

```javascript
// base64 PCM16 → float32 → AudioBuffer → speaker
const int16 = new Int16Array(bytes.buffer);
const float32 = new Float32Array(int16.length);
for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768;
const buffer = audioCtx.createBuffer(1, float32.length, 24000);
buffer.copyToChannel(float32, 0);
// play it...
```

---

## Step-by-Step: Vision Pipeline

Vision uses a separate REST flow (the Realtime API doesn't yet support image frames over WebSocket):

```
Camera frame (every 3s)
  → canvas.toDataURL("image/jpeg", 0.75)   ← 640×360 JPEG at 75% quality
  → POST /api/grok-vision { sessionId, imageData, isFirstFrame }
  → xAI chat/completions (grok-2-vision-1212)
  → Leo's text response added to conversation feed
```

The server sends the image as an inline base64 data URL with `detail: "low"` to minimize token cost.

---

## Payment Flow

No session = no Leo. Every WebSocket connection and every vision request validates a `sessionId` against a Postgres DB row before reaching xAI.

```
POST /api/checkout { tier }
  → Whop checkout configuration → purchase URL
  → user pays on Whop
  → redirect to /?success=true&membership_id=mem_xxx

GET /api/checkout/verify?membership_id=mem_xxx&tier=audio-monthly
  → verifies membership with Whop API
  → creates row in paid_sessions table
  → returns { sessionId (UUID), tier, expiresAt }

WebSocket /api/grok-live?sessionId=<UUID>
  → server checks paid_sessions before opening xAI connection
```

---

## Bring Your Own xAI API Key (BYOK)

xAI has rate limits on voice usage per account. Users who hit those limits can plug in their own xAI API key in Settings. The key:

- Is stored only in `localStorage` / `AsyncStorage` — never in our DB
- Is passed as `?userKey=...` on the WebSocket URL and as `userKey` in the vision POST body
- The server uses it instead of `XAI_API_KEY` if present
- Payment is still required — your key just bypasses xAI's per-account rate limits

Get a key at [console.x.ai](https://console.x.ai).

---

## Key Files for Developers

| File | What it does |
|---|---|
| `public/audio-processor.js` | AudioWorklet — float32 mic → PCM16 chunks |
| `src/components/feed/ConversationFeed.tsx` | Web session UI — orchestrates mic, camera, WebSocket, playback |
| `artifacts/api-server/src/websocket/grokRealtime.ts` | WS proxy → xAI Realtime API (heavily commented) |
| `artifacts/api-server/src/routes/grokVision.ts` | Camera snapshot → Grok Vision REST call |
| `artifacts/api-server/src/routes/checkout.ts` | Whop checkout + session verification |
| `lib/db/src/schema/sessions.ts` | `paid_sessions` table schema |

---

## xAI API Quick Reference

| API | Endpoint | Model |
|---|---|---|
| Voice (Realtime) | `wss://api.x.ai/v1/realtime?model=...` | `grok-voice-think-fast-1.0` |
| Vision | `POST https://api.x.ai/v1/chat/completions` | `grok-2-vision-1212` |

**Critical**: `grok-voice-think-fast-1.0` is a voice/realtime model. Do not substitute a text model — the WebSocket upgrade will be rejected.

xAI's Realtime API is OpenAI Realtime API compatible. The event types (`session.update`, `input_audio_buffer.append`, `response.audio.delta`, etc.) follow the same schema.

Docs: [docs.x.ai/docs/guides/live](https://docs.x.ai/docs/guides/live)

---

## Environment Variables You Need

```
XAI_API_KEY=xai-...              # from console.x.ai
WHOP_API_KEY=...                 # from whop.com dashboard
WHOP_COMPANY_ID=...              # your Whop company ID
DATABASE_URL=...                 # PostgreSQL connection string
SESSION_SECRET=...               # any random string
```

---

## Adapting This for Your Own Project

1. **Voice only, no payment gate**: remove the `storage.getSession()` check in `grokRealtime.ts` and skip payment entirely
2. **Different AI persona**: change the `instructions` string in the `session.update` message
3. **Different voice**: change `voice: "Ara"` — check xAI docs for available voices
4. **Mobile audio**: the mobile app currently uses text modality. PCM16 mic streaming on mobile requires `react-native-live-audio-stream` — same WebSocket, same server, different client audio capture
5. **Higher vision frequency**: not feasible via REST below ~2-3s. True real-time vision requires xAI to support image frames over the Realtime WebSocket (not yet available as of May 2026)
