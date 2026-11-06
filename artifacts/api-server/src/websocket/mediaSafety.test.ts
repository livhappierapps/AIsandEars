import { describe, expect, it } from "vitest";
import { normalizeApiOrigin, extractPcm16Wav } from "@workspace/media-utils";
import { handleClientFrame } from "./realtimeProtocol";

function wav(extra = false) {
  const pcm = Buffer.from([1, 0, 2, 0]);
  const fmt = Buffer.alloc(24);
  fmt.write("fmt ");
  fmt.writeUInt32LE(16, 4);
  fmt.writeUInt16LE(1, 8);
  fmt.writeUInt16LE(1, 10);
  fmt.writeUInt32LE(24000, 12);
  fmt.writeUInt32LE(48000, 16);
  fmt.writeUInt16LE(2, 20);
  fmt.writeUInt16LE(16, 22);
  const junk = extra
    ? Buffer.from([74, 85, 78, 75, 1, 0, 0, 0, 0, 0])
    : Buffer.alloc(0); // odd chunk + pad
  const data = Buffer.alloc(8);
  data.write("data");
  data.writeUInt32LE(pcm.length, 4);
  const body = Buffer.concat([fmt, junk, data, pcm]);
  const head = Buffer.alloc(12);
  head.write("RIFF");
  head.writeUInt32LE(body.length + 4, 4);
  head.write("WAVE", 8);
  return Buffer.concat([head, body]);
}
describe("API URL normalization", () => {
  it.each([
    "example.com",
    "https://example.com",
    "https://example.com/",
    "https://example.com/api/",
  ])("normalizes %s without double api/scheme", (raw) =>
    expect(normalizeApiOrigin(raw)).toBe("https://example.com"),
  );
  it.each([
    "",
    "http://example.com",
    "https://user:pass@example.com",
    "https://example.com/path",
    "https://example.com?key=x",
    "https://example.com/#secret",
    "wss://example.com",
  ])("rejects unsafe or missing config %s", (raw) =>
    expect(() => normalizeApiOrigin(raw)).toThrow(),
  );
  it("allows explicit local development", () =>
    expect(normalizeApiOrigin("http://127.0.0.1:8000/api")).toBe(
      "http://127.0.0.1:8000",
    ));
});
describe("PCM16 WAV trust boundary", () => {
  it.each([false, true])("extracts chunked WAV (odd metadata=%s)", (extra) =>
    expect(extractPcm16Wav(wav(extra).toString("latin1"))).toBe("\x01\0\x02\0"),
  );
  it.each([20, 22, 24, 28, 32, 34])(
    "rejects invalid format at offset %i",
    (offset) => {
      const b = wav();
      b[offset] = 0;
      expect(() => extractPcm16Wav(b.toString("latin1"))).toThrow();
    },
  );
  it("rejects truncated data rather than treating WAV bytes as PCM", () =>
    expect(() =>
      extractPcm16Wav(wav().subarray(0, -1).toString("latin1")),
    ).toThrow());
  it("rejects malicious oversized data allocation", () => {
    const b = wav();
    b.writeUInt32LE(0xffffffff, 40);
    expect(() => extractPcm16Wav(b.toString("latin1"))).toThrow();
  });
  it("returns a service error instead of forwarding compressed audio", () => {
    const b = Buffer.alloc(32);
    b.write("ftypM4A ", 4);
    expect(
      handleClientFrame(
        JSON.stringify({
          type: "input_audio_buffer.append",
          audio: b.toString("base64"),
        }),
      ).kind,
    ).toBe("error");
  });
  it("returns a service error for a damaged WAV", () =>
    expect(
      handleClientFrame(
        JSON.stringify({
          type: "input_audio_buffer.append",
          audio: wav().subarray(0, 20).toString("base64"),
        }),
      ).kind,
    ).toBe("error"));
});
