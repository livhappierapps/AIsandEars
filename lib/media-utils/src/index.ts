/** Normalize a configured API origin (optionally ending in /api).
 * Bare hostnames are HTTPS. HTTP is allowed only for explicit local development.
 * Credentials, queries and unexpected base paths are rejected, not silently lost.
 */
export function normalizeApiOrigin(value: string): string {
  const raw = value.trim();
  if (!raw)
    throw new Error(
      "API server is not configured. Set EXPO_PUBLIC_API_BASE_URL (or EXPO_PUBLIC_DOMAIN).",
    );
  const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (url.protocol !== "https:" && !(local && url.protocol === "http:")) {
    throw new Error(
      "API server must use HTTPS (HTTP is allowed only on localhost).",
    );
  }
  if (url.username || url.password || url.search || url.hash)
    throw new Error(
      "API URL cannot include credentials, query parameters or fragments.",
    );
  if (!["", "/", "/api", "/api/"].includes(url.pathname))
    throw new Error("API URL must be an origin or end in /api.");
  return url.origin;
}

/** Validate RIFF/WAVE before extracting raw, little-endian PCM16.
 * Walk word-aligned chunks: iOS/ffmpeg headers are not necessarily 44 bytes.
 * Reject truncation, invalid fmt, compressed/float/stereo audio and wrong rates.
 */
export function extractPcm16Wav(binary: string, requiredRate = 24000): string {
  const fail = () => {
    throw new Error(
      `Recording must be an intact PCM16 WAV (${requiredRate} Hz, mono). Compressed or damaged audio was not sent.`,
    );
  };
  const u16 = (o: number) =>
    binary.charCodeAt(o) | (binary.charCodeAt(o + 1) << 8);
  const u32 = (o: number) => (u16(o) | (u16(o + 2) << 16)) >>> 0;
  if (
    binary.length < 12 ||
    binary.slice(0, 4) !== "RIFF" ||
    binary.slice(8, 12) !== "WAVE"
  )
    return fail();
  const end = u32(4) + 8;
  if (end > binary.length || end < 12) return fail();
  let validFormat = false;
  let pcm: string | undefined;
  for (let offset = 12; offset + 8 <= end;) {
    const id = binary.slice(offset, offset + 4),
      size = u32(offset + 4),
      body = offset + 8;
    if (body + size > end) return fail();
    if (id === "fmt ") {
      if (
        size < 16 ||
        u16(body) !== 1 ||
        u16(body + 2) !== 1 ||
        u32(body + 4) !== requiredRate ||
        u32(body + 8) !== requiredRate * 2 ||
        u16(body + 12) !== 2 ||
        u16(body + 14) !== 16
      )
        return fail();
      validFormat = true;
    }
    if (id === "data") {
      if (pcm !== undefined || !size || size % 2) return fail();
      pcm = binary.slice(body, body + size);
    }
    offset = body + size + (size % 2);
  }
  if (!validFormat || !pcm) return fail();
  return pcm;
}
