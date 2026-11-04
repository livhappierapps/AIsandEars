/**
 * realtimeProtocol.ts — pure helpers that adapt traffic between our clients
 * (web app, Expo app, Middleman bridge) and the current xAI Voice Agent API.
 *
 * Why this exists:
 *   Our clients were written against the older OpenAI-beta-style realtime
 *   protocol (input_audio_format: "pcm16", response.audio.delta,
 *   response.audio_transcript.done, ...). xAI's current API
 *   (docs.x.ai → Voice → Speech to Speech) uses the GA-style names
 *   (session.audio.input.format, response.output_audio.delta,
 *   response.output_audio_transcript.done, ...). Rather than rewriting three
 *   clients (one of which ships in a separate repo), the proxy translates.
 */

/** Current-xAI event name → legacy name our clients listen for. */
export const UPSTREAM_EVENT_ALIASES: Record<string, string> = {
  "response.output_audio.delta": "response.audio.delta",
  "response.output_audio.done": "response.audio.done",
  "response.output_audio_transcript.delta": "response.audio_transcript.delta",
  "response.output_audio_transcript.done": "response.audio_transcript.done",
  "response.output_text.delta": "response.text.delta",
  "response.output_text.done": "response.text.done",
};

/** session.update keys documented by xAI. Anything else is dropped so a stale
 *  client field (e.g. `modalities`) can't trigger an upstream `error` event. */
const ALLOWED_SESSION_KEYS = new Set([
  "instructions",
  "voice",
  "turn_detection",
  "tools",
  "audio",
  "reasoning",
  "resumption",
  "replace",
]);

export const PCM_RATE = 24000;

export function defaultAudioConfig() {
  return {
    input: { format: { type: "audio/pcm", rate: PCM_RATE } },
    output: { format: { type: "audio/pcm", rate: PCM_RATE } },
  };
}

/**
 * Translate a client session.update `session` object to the current schema.
 * - input_audio_format / output_audio_format "pcm16" → audio.{input,output}.format
 * - voice names are lowercased ("Ara" → "ara")
 * - undocumented keys (modalities, temperature, max_response_output_tokens) dropped
 */
export function normalizeSessionConfig(session: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(session)) {
    if (ALLOWED_SESSION_KEYS.has(k)) out[k] = v;
  }
  if (typeof out.voice === "string") out.voice = out.voice.toLowerCase();

  const legacyIn = session.input_audio_format;
  const legacyOut = session.output_audio_format;
  if ((legacyIn || legacyOut) && !out.audio) {
    const audio: Record<string, unknown> = {};
    if (legacyIn) audio.input = { format: { type: "audio/pcm", rate: PCM_RATE } };
    if (legacyOut) audio.output = { format: { type: "audio/pcm", rate: PCM_RATE } };
    out.audio = audio;
  }
  return out;
}

/**
 * If `b64` is a base64-encoded RIFF/WAVE file, return base64 of just the PCM
 * payload of its `data` chunk. Otherwise return the input unchanged.
 *
 * Handles extra chunks (LIST, FLLR on iOS, …) instead of assuming a fixed
 * 44-byte header. The Middleman bridge sends whole .wav files.
 */
export function stripWavHeader(b64: string): string {
  // "UklGR" is base64 for "RIFF" (+ first bits of the size field)
  if (!b64.startsWith("UklGR")) return b64;
  const buf = Buffer.from(b64, "base64");
  if (buf.length < 12 || buf.toString("ascii", 8, 12) !== "WAVE") return b64;
  let offset = 12;
  while (offset + 8 <= buf.length) {
    const id = buf.toString("ascii", offset, offset + 4);
    const size = buf.readUInt32LE(offset + 4);
    const body = offset + 8;
    if (id === "data") {
      // Recorders that are stopped abruptly may leave size as 0 / 0xFFFFFFFF.
      const end = size === 0 || body + size > buf.length ? buf.length : body + size;
      return buf.subarray(body, end).toString("base64");
    }
    offset = body + size + (size % 2); // chunks are word-aligned
  }
  return b64;
}

export type ClientAction =
  | { kind: "pong" }
  | { kind: "forward"; payload: string }
  | { kind: "drop" };

/** Decide what to do with one text frame from a client. */
export function handleClientFrame(raw: string): ClientAction {
  let msg: Record<string, unknown>;
  try {
    msg = JSON.parse(raw);
  } catch {
    return { kind: "forward", payload: raw };
  }
  if (!msg || typeof msg !== "object") return { kind: "forward", payload: raw };

  // Middleman sends {type:"ping"} every 15s and expects {type:"pong"} back.
  // xAI doesn't know this message, so answer it here.
  if (msg.type === "ping") return { kind: "pong" };
  if (msg.type === "pong") return { kind: "drop" };

  if (msg.type === "session.update" && msg.session && typeof msg.session === "object") {
    msg.session = normalizeSessionConfig(msg.session as Record<string, unknown>);
    return { kind: "forward", payload: JSON.stringify(msg) };
  }

  if (msg.type === "input_audio_buffer.append" && typeof msg.audio === "string") {
    const stripped = stripWavHeader(msg.audio);
    if (stripped !== msg.audio) {
      msg.audio = stripped;
      return { kind: "forward", payload: JSON.stringify(msg) };
    }
  }
  return { kind: "forward", payload: raw };
}

/** Rename current-xAI server events to the legacy names our clients expect. */
export function translateUpstreamFrame(raw: string): string {
  // Cheap pre-check: avoid JSON round-trips for frames we don't rename.
  if (!raw.includes("response.output_")) return raw;
  try {
    const msg = JSON.parse(raw) as { type?: string };
    const alias = msg.type ? UPSTREAM_EVENT_ALIASES[msg.type] : undefined;
    if (!alias) return raw;
    msg.type = alias;
    return JSON.stringify(msg);
  } catch {
    return raw;
  }
}
