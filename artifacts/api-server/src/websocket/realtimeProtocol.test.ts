import { describe, expect, it } from "vitest";
import {
  handleClientFrame,
  normalizeSessionConfig,
  stripWavHeader,
  translateUpstreamFrame,
} from "./realtimeProtocol";

function wav(pcm: Buffer, extraChunk?: { id: string; body: Buffer }): Buffer {
  const fmt = Buffer.alloc(24);
  fmt.write("fmt ", 0, "ascii");
  fmt.writeUInt32LE(16, 4);
  fmt.writeUInt16LE(1, 8); // PCM
  fmt.writeUInt16LE(1, 10); // mono
  fmt.writeUInt32LE(24000, 12);
  fmt.writeUInt32LE(48000, 16);
  fmt.writeUInt16LE(2, 20);
  fmt.writeUInt16LE(16, 22);
  const parts: Buffer[] = [fmt];
  if (extraChunk) {
    const h = Buffer.alloc(8);
    h.write(extraChunk.id, 0, "ascii");
    h.writeUInt32LE(extraChunk.body.length, 4);
    parts.push(h, extraChunk.body);
  }
  const dh = Buffer.alloc(8);
  dh.write("data", 0, "ascii");
  dh.writeUInt32LE(pcm.length, 4);
  parts.push(dh, pcm);
  const body = Buffer.concat(parts);
  const riff = Buffer.alloc(12);
  riff.write("RIFF", 0, "ascii");
  riff.writeUInt32LE(body.length + 4, 4);
  riff.write("WAVE", 8, "ascii");
  return Buffer.concat([riff, body]);
}

describe("realtimeProtocol", () => {
  it("answers ping locally", () => {
    expect(handleClientFrame('{"type":"ping"}')).toEqual({ kind: "pong" });
  });

  it("strips a standard 44-byte WAV header", () => {
    const pcm = Buffer.from([1, 2, 3, 4, 5, 6]);
    const b64 = wav(pcm).toString("base64");
    expect(stripWavHeader(b64)).toBe(pcm.toString("base64"));
  });

  it("strips WAV headers with extra chunks (iOS FLLR)", () => {
    const pcm = Buffer.from([9, 8, 7, 6]);
    const b64 = wav(pcm, { id: "FLLR", body: Buffer.alloc(4044) }).toString(
      "base64",
    );
    expect(stripWavHeader(b64)).toBe(pcm.toString("base64"));
  });

  it("leaves raw PCM alone", () => {
    const raw = Buffer.from([0, 1, 0, 1]).toString("base64");
    expect(stripWavHeader(raw)).toBe(raw);
  });

  it("rewrites WAV audio inside input_audio_buffer.append", () => {
    const pcm = Buffer.from([1, 2]);
    const frame = JSON.stringify({
      type: "input_audio_buffer.append",
      audio: wav(pcm).toString("base64"),
    });
    const action = handleClientFrame(frame);
    expect(action.kind).toBe("forward");
    if (action.kind === "forward")
      expect(JSON.parse(action.payload).audio).toBe(pcm.toString("base64"));
  });

  it("normalizes legacy session.update fields", () => {
    const out = normalizeSessionConfig({
      modalities: ["text"],
      input_audio_format: "pcm16",
      voice: "Ara",
      temperature: 0.8,
      instructions: "hi",
    });
    expect(out).toEqual({
      voice: "ara",
      instructions: "hi",
      audio: { input: { format: { type: "audio/pcm", rate: 24000 } } },
    });
  });

  it("aliases current xAI event names to legacy ones", () => {
    const out = translateUpstreamFrame(
      '{"type":"response.output_audio_transcript.done","transcript":"hey"}',
    );
    expect(JSON.parse(out)).toEqual({
      type: "response.audio_transcript.done",
      transcript: "hey",
    });
    const same = '{"type":"session.created"}';
    expect(translateUpstreamFrame(same)).toBe(same);
  });
});
