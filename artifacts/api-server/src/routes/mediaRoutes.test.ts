import {
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import express from "express";
import type { Server } from "http";
import type { AddressInfo } from "net";
vi.mock("../storage", () => ({
  storage: { getSession: vi.fn(), createSession: vi.fn() },
}));
import { storage } from "../storage";
import music from "./musicAnalyze";
import bridge from "./bridge";
let server: Server, base: string;
beforeAll(async () => {
  const app = express();
  app.use(express.json({ limit: "10mb" }));
  app.use("/api", music);
  app.use("/api/bridge", bridge);
  server = await new Promise<Server>((resolve) => {
    const s = app.listen(0, "127.0.0.1", () => resolve(s));
  });
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
  vi.unstubAllEnvs();
});
beforeEach(() => {
  vi.stubEnv("BRIDGE_API_KEY", "test-key");
  vi.stubEnv("APP_BASE_URL", "https://web.example.com");
  vi.stubEnv("API_PUBLIC_BASE_URL", "");
  vi.stubEnv("RENDER_EXTERNAL_URL", "");
  vi.mocked(storage.getSession).mockResolvedValue({ expiresAt: null } as never);
  vi.mocked(storage.createSession).mockResolvedValue({
    id: "new-session",
  } as never);
});
const post = (path: string, body: unknown) =>
  fetch(base + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
describe("music input validation", () => {
  it("rejects invalid sample rates", async () =>
    expect(
      (
        await post("/api/music-analyze", {
          sessionId: "s",
          audioData: "AAAA",
          sampleRate: 0,
        })
      ).status,
    ).toBe(400));
  it("rejects malformed RIFF without fallback", async () =>
    expect(
      (
        await post("/api/music-analyze", {
          sessionId: "s",
          audioData: Buffer.from("RIFFbroken!!").toString("base64"),
        })
      ).status,
    ).toBe(422));
  it("rejects arbitrary ffmpeg hints", async () =>
    expect(
      (
        await post("/api/music-analyze", {
          sessionId: "s",
          audioData: "AAAA",
          format: "../../evil",
        })
      ).status,
    ).toBe(400));
  it("analyzes PCM silence without any live keys", async () => {
    const res = await post("/api/music-analyze", {
      sessionId: "s",
      audioData: Buffer.alloc(96000).toString("base64"),
      sampleRate: 24000,
    });
    expect(res.status).toBe(200);
    expect(((await res.json()) as { type: string }).type).toBe("silence");
  });
});
describe("bridge origins and auth", () => {
  it("uses API request origin, not the frontend checkout return URL", async () => {
    const res = await post("/api/bridge/session", { apiKey: "test-key" });
    expect(res.status).toBe(201);
    expect(((await res.json()) as { visionUrl: string }).visionUrl).toBe(
      `${base}/api/grok-vision`,
    );
  });
  it("normalizes /api without doubling it", async () => {
    vi.stubEnv("API_PUBLIC_BASE_URL", "https://api.example.com/api");
    const res = await post("/api/bridge/session", { apiKey: "test-key" });
    expect(((await res.json()) as { wsUrl: string }).wsUrl).toBe(
      "wss://api.example.com/api/grok-live?sessionId=new-session",
    );
  });
  it("rejects same-length Unicode secrets without timingSafeEqual throwing", async () => {
    vi.stubEnv("BRIDGE_API_KEY", "aa");
    expect((await post("/api/bridge/session", { apiKey: "éé" })).status).toBe(
      401,
    );
  });
});
