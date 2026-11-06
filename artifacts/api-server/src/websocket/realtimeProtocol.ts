import { extractPcm16Wav } from "@workspace/media-utils";
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
export function normalizeSessionConfig(
  session: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(session)) {
    if (ALLOWED_SESSION_KEYS.has(k)) out[k] = v;
  }
  if (typeof out.voice === "string") out.voice = out.voice.toLowerCase();

  const legacyIn = session.input_audio_format;
  const legacyOut = session.output_audio_format;
  if ((legacyIn || legacyOut) && !out.audio) {
    const audio: Record<string, unknown> = {};
    if (legacyIn)
      audio.input = { format: { type: "audio/pcm", rate: PCM_RATE } };
    if (legacyOut)
      audio.output = { format: { type: "audio/pcm", rate: PCM_RATE } };
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
  if (
    !b64 ||
    b64.length > 1_000_000 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(b64) ||
    b64.length % 4 !== 0
  )
    throw new Error("Invalid or oversized base64 audio");
  const buf = Buffer.from(b64, "base64");
  if (buf.toString("ascii", 0, 4) === "RIFF")
    return Buffer.from(
      extractPcm16Wav(buf.toString("latin1")),
      "latin1",
    ).toString("base64");
  // Raw PCM has no self-identifying header; reject known compressed containers.
  const head = buf.toString("ascii", 0, 12);
  if (
    head.includes("ftyp") ||
    head.startsWith("OggS") ||
    head.startsWith("#!AMR") ||
    head.startsWith("ID3")
  )
    throw new Error(
      "Compressed audio is not PCM16; live voice needs 24 kHz mono PCM16",
    );
  if (!buf.length || buf.length % 2)
    throw new Error("PCM16 audio must contain complete 16-bit samples");
  return b64;
}

export type ClientAction =
  | { kind: "pong" }
  | { kind: "forward"; payload: string }
  | { kind: "drop" }
  | { kind: "error"; message: string };

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

  if (
    msg.type === "session.update" &&
    msg.session &&
    typeof msg.session === "object"
  ) {
    msg.session = normalizeSessionConfig(
      msg.session as Record<string, unknown>,
    );
    return { kind: "forward", payload: JSON.stringify(msg) };
  }

  if (
    msg.type === "input_audio_buffer.append" &&
    typeof msg.audio === "string"
  ) {
    let stripped: string;
    try {
      stripped = stripWavHeader(msg.audio);
    } catch (err) {
      return {
        kind: "error",
        message: err instanceof Error ? err.message : "Invalid audio",
      };
    }
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
