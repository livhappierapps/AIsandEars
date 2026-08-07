/**
 * musicAnalyze.ts — Server-side music analysis endpoint
 *
 * Accepts a base64-encoded audio buffer (WAV, raw PCM16, or AAC/M4A/AMR/3GP)
 * and returns structured JSON describing the musical content: BPM, key, mode,
 * energy, mood tags.
 *
 * Designed to be called every 3-8 seconds with short audio chunks.
 * Results are injected into Leo's conversation context as a compact packet.
 *
 * SECURITY:
 *   - Session must exist and not be expired
 *   - Audio buffers are processed in-memory and never persisted
 *   - Hard cap on buffer size (~5MB base64 ≈ ~3.7MB audio)
 *
 * ALGORITHM:
 *   1. Detect format (WAV magic bytes, format hint, or ffmpeg decode for compressed)
 *   2. Compute RMS energy and zero-crossing rate
 *   3. Compute chroma features via Goertzel algorithm (12 pitch classes)
 *   4. Detect key + mode via Krumhansl-Schmuckler profile correlation
 *   5. Estimate BPM via autocorrelation of short-term energy envelope
 *   6. Classify audio as silence / speech / music
 *   7. Return structured features + compact "context" string for Leo
 */

import { Router, type IRouter } from "express";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as crypto from "crypto";
import { execFile } from "child_process";
import { promisify } from "util";
import { storage } from "../storage";
import { logger } from "../lib/logger";

const execFileAsync = promisify(execFile);

// Resolve ffmpeg binary: allow override via FFMPEG_BIN env var, otherwise rely on PATH.
// In the Replit NixOS environment, ffmpeg is on PATH via the runtime PATH configuration.
// In production deployments, set FFMPEG_BIN to an absolute path if needed.
const FFMPEG_BIN = process.env.FFMPEG_BIN ?? "ffmpeg";

const router: IRouter = Router();

// Hard cap: ~5MB base64 ≈ ~3.75MB audio
const MAX_AUDIO_B64_CHARS = 5_000_000;

// ── Format detection ──────────────────────────────────────────────────────────

/** True when the buffer starts with the RIFF/WAV magic bytes. */
function isWAV(buf: Buffer): boolean {
  return buf.length >= 4 && buf.readUInt32BE(0) === 0x52494646; // "RIFF"
}

/**
 * Map a client-supplied format hint to an ffmpeg input-format string.
 * Returns null when ffmpeg is not needed (WAV / raw PCM).
 */
function ffmpegFormatHint(hint?: string): string | null {
  if (!hint) return null;
  const lower = hint.toLowerCase();
  if (lower === "m4a" || lower === "aac" || lower === "mp4") return "mp4";
  if (lower === "amr" || lower === "3gp" || lower === "3gpp") return "amr";
  if (lower === "ogg" || lower === "opus") return "ogg";
  if (lower === "wav") return null; // handled natively
  return lower; // pass through as-is
}

// ── FFmpeg decode to PCM WAV ──────────────────────────────────────────────────

/**
 * Transcode an arbitrary compressed audio buffer to 24 kHz mono PCM16 WAV
 * using the system ffmpeg binary. Uses temp files for format compatibility
 * (many container formats like M4A require seekable input streams).
 *
 * Throws if ffmpeg fails or produces no output.
 */
async function decodeAudioToWAV(inputBuffer: Buffer, inputFormat: string): Promise<Buffer> {
  const id = crypto.randomBytes(8).toString("hex");
  // Use the format hint as the file extension so ffmpeg auto-detects the container
  const ext = inputFormat === "mp4" ? "m4a" : inputFormat;
  const inputPath = path.join(os.tmpdir(), `leo-music-in-${id}.${ext}`);
  const outputPath = path.join(os.tmpdir(), `leo-music-out-${id}.wav`);

  await fs.promises.writeFile(inputPath, inputBuffer);

  try {
    await execFileAsync(FFMPEG_BIN, [
      "-y",                    // overwrite output without prompting
      "-i", inputPath,         // input file
      "-ar", "24000",          // resample to 24 kHz
      "-ac", "1",              // mono
      "-acodec", "pcm_s16le",  // PCM 16-bit little-endian
      outputPath,              // output WAV
    ]);
    return await fs.promises.readFile(outputPath);
  } finally {
    fs.promises.unlink(inputPath).catch(() => {});
    fs.promises.unlink(outputPath).catch(() => {});
  }
}

// ── Key detection profiles ────────────────────────────────────────────────────
// Krumhansl-Schmuckler key profiles (1990). Root = C (index 0).
const MAJOR_PROFILE = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const MINOR_PROFILE = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// ── WAV parsing ───────────────────────────────────────────────────────────────

interface ParsedAudio {
  samples: Float32Array;
  sampleRate: number;
}

function parseWAV(buffer: Buffer): ParsedAudio {
  // Validate RIFF header
  const riff = buffer.readUInt32BE(0); // "RIFF" = 0x52494646
  if (riff !== 0x52494646) throw new Error("Not a WAV file");

  const sampleRate = buffer.readUInt32LE(24);
  const numChannels = buffer.readUInt16LE(22);
  const bitsPerSample = buffer.readUInt16LE(34);

  // Find the "data" sub-chunk (0x64617461)
  let offset = 12;
  let dataOffset = -1;
  let dataSize = 0;
  while (offset + 8 <= buffer.length) {
    const chunkId = buffer.readUInt32BE(offset);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    if (chunkId === 0x64617461) {
      dataOffset = offset + 8;
      dataSize = chunkSize;
      break;
    }
    offset += 8 + chunkSize;
  }
  if (dataOffset < 0) throw new Error("WAV data chunk not found");

  const bytesPerSample = bitsPerSample / 8;
  const numSamples = Math.floor(dataSize / (bytesPerSample * numChannels));
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const off = dataOffset + i * bytesPerSample * numChannels;
    if (off + bytesPerSample > buffer.length) break;
    if (bitsPerSample === 16) {
      samples[i] = buffer.readInt16LE(off) / 32768.0;
    } else if (bitsPerSample === 8) {
      samples[i] = (buffer.readUInt8(off) - 128) / 128.0;
    } else if (bitsPerSample === 32) {
      samples[i] = buffer.readFloatLE(off);
    } else {
      samples[i] = buffer.readInt16LE(off) / 32768.0; // fallback
    }
  }

  return { samples, sampleRate };
}

function fromRawPCM16(buffer: Buffer, sampleRate = 24000): ParsedAudio {
  const numSamples = Math.floor(buffer.length / 2);
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const off = i * 2;
    if (off + 2 <= buffer.length) {
      samples[i] = buffer.readInt16LE(off) / 32768.0;
    }
  }
  return { samples, sampleRate };
}

// ── Feature extraction ────────────────────────────────────────────────────────

function computeRMS(samples: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
  return Math.sqrt(sum / samples.length);
}

function computeZCR(samples: Float32Array): number {
  let crossings = 0;
  for (let i = 1; i < samples.length; i++) {
    if ((samples[i] >= 0) !== (samples[i - 1] >= 0)) crossings++;
  }
  return crossings / samples.length;
}

/**
 * Compute 12-bin chroma vector using the Goertzel algorithm.
 * Covers octaves 2–6 (roughly 65 Hz – 2093 Hz) with A4 = 440 Hz.
 */
function computeChroma(samples: Float32Array, sampleRate: number): number[] {
  const N = Math.min(samples.length, 8192);
  const chroma = new Array<number>(12).fill(0);

  for (let noteIdx = 0; noteIdx < 12; noteIdx++) {
    let energy = 0;
    for (let octave = 2; octave <= 7; octave++) {
      // Note frequency relative to A4=440 Hz, MIDI-style transposition
      const semitones = noteIdx - 9 + (octave - 4) * 12;
      const freq = 440 * Math.pow(2, semitones / 12);
      if (freq >= sampleRate / 2) continue;

      // Goertzel — more efficient than full DFT for single frequencies
      const k = (freq * N) / sampleRate;
      const omega = (2 * Math.PI * k) / N;
      const cosOmega = Math.cos(omega);
      let s0 = 0, s1 = 0, s2 = 0;
      for (let n = 0; n < N; n++) {
        s0 = samples[n] + 2 * cosOmega * s1 - s2;
        s2 = s1;
        s1 = s0;
      }
      const power = s2 * s2 + s1 * s1 - s2 * s1 * 2 * cosOmega;
      energy += Math.sqrt(Math.max(0, power));
    }
    chroma[noteIdx] = energy;
  }

  // Normalize to [0, 1]
  const peak = Math.max(...chroma, 1e-10);
  return chroma.map((v) => v / peak);
}

/**
 * Pearson correlation between two equal-length arrays.
 */
function pearson(a: number[], b: number[]): number {
  const n = a.length;
  const ma = a.reduce((s, v) => s + v, 0) / n;
  const mb = b.reduce((s, v) => s + v, 0) / n;
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) {
    const ai = a[i] - ma, bi = b[i] - mb;
    num += ai * bi;
    da += ai * ai;
    db += bi * bi;
  }
  const denom = Math.sqrt(da * db);
  return denom < 1e-10 ? 0 : num / denom;
}

interface KeyResult {
  key: string;
  mode: "major" | "minor";
  confidence: number;
}

function detectKey(chroma: number[]): KeyResult {
  let bestKey = 0;
  let bestMode: "major" | "minor" = "major";
  let bestScore = -Infinity;

  for (let root = 0; root < 12; root++) {
    // Rotate chroma so that `root` aligns with the profile's C position
    const rotated = Array.from({ length: 12 }, (_, i) => chroma[(i + root) % 12]);
    const majorScore = pearson(rotated, MAJOR_PROFILE);
    const minorScore = pearson(rotated, MINOR_PROFILE);

    if (majorScore > bestScore) {
      bestScore = majorScore;
      bestKey = root;
      bestMode = "major";
    }
    if (minorScore > bestScore) {
      bestScore = minorScore;
      bestKey = root;
      bestMode = "minor";
    }
  }

  return {
    key: NOTE_NAMES[bestKey],
    mode: bestMode,
    confidence: Math.min(Math.max(bestScore, 0), 1),
  };
}

/**
 * Estimate BPM via autocorrelation of the short-term energy envelope.
 * Search range: 60–200 BPM.
 */
function estimateBPM(samples: Float32Array, sampleRate: number): number {
  const frameSamples = Math.floor(sampleRate * 0.02); // 20ms frames
  const numFrames = Math.floor(samples.length / frameSamples);
  if (numFrames < 16) return 0;

  // Energy envelope
  const env = new Float32Array(numFrames);
  for (let f = 0; f < numFrames; f++) {
    let e = 0;
    for (let i = 0; i < frameSamples; i++) {
      e += samples[f * frameSamples + i] ** 2;
    }
    env[f] = Math.sqrt(e / frameSamples);
  }

  // Mean-subtract for better autocorrelation
  const mean = env.reduce((s, v) => s + v, 0) / numFrames;
  for (let i = 0; i < numFrames; i++) env[i] -= mean;

  // Autocorrelation within BPM range
  const minLag = Math.floor(((60 / 200) * sampleRate) / frameSamples);
  const maxLag = Math.floor(((60 / 60) * sampleRate) / frameSamples);

  let bestLag = minLag;
  let bestCorr = -Infinity;

  for (let lag = minLag; lag <= Math.min(maxLag, numFrames - 1); lag++) {
    let corr = 0;
    const len = numFrames - lag;
    for (let i = 0; i < len; i++) corr += env[i] * env[i + lag];
    corr /= len;
    if (corr > bestCorr) {
      bestCorr = corr;
      bestLag = lag;
    }
  }

  const bpm = 60 / ((bestLag * frameSamples) / sampleRate);
  return Math.round(Math.max(60, Math.min(220, bpm)));
}

/**
 * Classify audio as silence / speech / music.
 * Heuristics: music has lower ZCR + higher tonal chroma variance.
 */
function classifyAudio(rms: number, zcr: number, chroma: number[]): "silence" | "speech" | "music" {
  if (rms < 0.008) return "silence";

  // Variance of chroma: music has a more concentrated distribution (tonal)
  const mean = chroma.reduce((s, v) => s + v, 0) / 12;
  const variance = chroma.reduce((s, v) => s + (v - mean) ** 2, 0) / 12;

  // Speech has high ZCR (consonants) and low chroma variance (atonal/noisy)
  // Music has lower ZCR and higher harmonic concentration
  if (rms > 0.015 && zcr < 0.12 && variance > 0.04) return "music";
  if (zcr > 0.18 && variance < 0.04) return "speech";
  // Borderline: use energy to break the tie
  return rms > 0.04 ? "music" : "speech";
}

function describeMood(rms: number, bpm: number, mode: "major" | "minor"): string[] {
  const tags: string[] = [];

  // Energy level
  if (rms > 0.25) tags.push("high-energy");
  else if (rms > 0.08) tags.push("moderate-energy");
  else tags.push("low-energy");

  // Tempo feel
  if (bpm > 160) tags.push("frantic");
  else if (bpm > 140) tags.push("intense");
  else if (bpm > 120) tags.push("upbeat");
  else if (bpm > 100) tags.push("mid-tempo");
  else if (bpm > 76) tags.push("relaxed");
  else tags.push("slow");

  // Tonal quality
  tags.push(mode === "major" ? "bright-toned" : "dark-toned");

  return tags;
}

// ── Route ─────────────────────────────────────────────────────────────────────

router.post("/music-analyze", async (req, res): Promise<void> => {
  const { sessionId, audioData, sampleRate: clientSampleRate, userKey, format } = req.body as {
    sessionId?: string;
    audioData?: string;
    sampleRate?: number;
    userKey?: string;
    format?: string; // Optional hint: "m4a", "aac", "amr", etc. (from Android client)
  };

  // ── Input validation ────────────────────────────────────────────────────────
  if (!sessionId) {
    res.status(400).json({ error: "sessionId is required" });
    return;
  }
  if (!audioData || typeof audioData !== "string") {
    res.status(400).json({ error: "audioData (base64) is required" });
    return;
  }
  if (audioData.length > MAX_AUDIO_B64_CHARS) {
    res.status(413).json({ error: "audioData too large (max ~3.75 MB)" });
    return;
  }

  try {
    // ── Session auth ────────────────────────────────────────────────────────
    const session = await storage.getSession(sessionId);
    if (!session) {
      res.status(403).json({ error: "Invalid session" });
      return;
    }
    if (session.expiresAt && new Date() > session.expiresAt) {
      res.status(403).json({ error: "Session expired" });
      return;
    }

    // ── Decode audio ─────────────────────────────────────────────────────────
    const rawBuffer = Buffer.from(audioData, "base64");

    let parsed: ParsedAudio;

    const compressedFormat = ffmpegFormatHint(format);

    if (isWAV(rawBuffer)) {
      // Explicit WAV — parse directly (iOS PCM16 chunks wrapped in a WAV header)
      try {
        parsed = parseWAV(rawBuffer);
      } catch {
        parsed = fromRawPCM16(rawBuffer, clientSampleRate ?? 24000);
      }
    } else if (compressedFormat) {
      // Client supplied a format hint (e.g. "m4a" from Android) — transcode via ffmpeg.
      // Do NOT fall back to raw PCM16: treating compressed bytes as PCM produces
      // garbage feature extraction while silently masking a configuration failure.
      try {
        const wavBuffer = await decodeAudioToWAV(rawBuffer, compressedFormat);
        parsed = parseWAV(wavBuffer);
        logger.debug({ sessionId, format: compressedFormat }, "music-analyze: ffmpeg decoded compressed audio");
      } catch (decodeErr) {
        logger.warn({ sessionId, format: compressedFormat, err: decodeErr }, "music-analyze: ffmpeg decode failed");
        res.status(422).json({ error: "Could not decode audio. Ensure ffmpeg is available in the server environment." });
        return;
      }
    } else {
      // No hint and not WAV — treat as raw PCM16 (iOS streaming chunks)
      parsed = fromRawPCM16(rawBuffer, clientSampleRate ?? 24000);
    }

    const { samples, sampleRate } = parsed;

    if (samples.length < 512) {
      res.status(400).json({ error: "Audio buffer too short (need at least ~10ms)" });
      return;
    }

    // ── Feature extraction ───────────────────────────────────────────────────
    const rms = computeRMS(samples);
    const zcr = computeZCR(samples);
    const chroma = computeChroma(samples, sampleRate);
    const audioType = classifyAudio(rms, zcr, chroma);

    if (audioType === "silence") {
      res.json({ type: "silence", energy: rms });
      return;
    }

    if (audioType === "speech") {
      res.json({ type: "speech", energy: rms, zcr });
      return;
    }

    // Music — full analysis
    const bpm = estimateBPM(samples, sampleRate);
    const { key, mode, confidence } = detectKey(chroma);
    const moods = describeMood(rms, bpm, mode);

    // Compact context string for Leo's system prompt
    const bpmStr = bpm > 0 ? `${bpm} BPM` : null;
    const keyStr = `${key} ${mode}`;
    const moodStr = moods.slice(0, 3).join(", ");
    const context = [bpmStr, keyStr, moodStr].filter(Boolean).join(", ");

    const result = {
      type: "music" as const,
      bpm,
      key,
      mode,
      energy: Math.round(rms * 1000) / 1000,
      moods,
      chroma,
      keyConfidence: Math.round(confidence * 100) / 100,
      context,
    };

    logger.debug(
      { sessionId, bpm, key, mode, moods, energy: result.energy },
      "music-analyze: music detected",
    );

    res.json(result);
  } catch (err: unknown) {
    logger.error({ err, sessionId }, "music-analyze unhandled error");
    res.status(500).json({ error: "Analysis failed" });
  }
});

export default router;
