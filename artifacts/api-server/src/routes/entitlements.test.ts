import {
  afterAll,
  beforeAll,
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
  storage: {
    getSession: vi.fn(),
    getSessionByPaymentId: vi.fn(),
    createSession: vi.fn(),
  },
}));
const { retrieve, checkoutCreate } = vi.hoisted(() => ({
  retrieve: vi.fn(),
  checkoutCreate: vi.fn(),
}));
vi.mock("../whopClient", () => ({
  getWhopClient: async () => ({
    memberships: { retrieve },
    checkoutConfigurations: { create: checkoutCreate },
  }),
}));
import { storage } from "../storage";
import vision from "./grokVision";
import download from "./download";
let server: Server, base: string;
beforeAll(async () => {
  vi.stubEnv("WHOP_PLAN_AUDIO_SESSION", "plan_audio_test");
  vi.stubEnv("WHOP_PLAN_FULL_SESSION", "plan_full_test");
  const { default: checkout } = await import("./checkout");
  const app = express();
  app.use(express.json());
  app.use("/api", checkout);
  app.use("/api", vision);
  app.use("/api/download", download);
  server = await new Promise<Server>((resolve) => {
    const s = app.listen(0, "127.0.0.1", () => resolve(s));
  });
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
afterAll(async () => {
  await new Promise<void>((r) => server.close(() => r()));
  vi.unstubAllEnvs();
});
beforeEach(() => {
  vi.mocked(storage.createSession).mockClear();
  checkoutCreate
    .mockClear()
    .mockResolvedValue({
      id: "checkout_test",
      purchase_url: "https://whop.com/checkout/test",
    });
  vi.stubEnv("APP_BASE_URL", "https://app.example");
  vi.mocked(storage.getSessionByPaymentId).mockResolvedValue(null);
  vi.mocked(storage.getSession).mockResolvedValue({
    tier: "audio-session",
    expiresAt: null,
  } as never);
});
describe("entitlement boundaries", () => {
  it("rejects audio membership requesting full vision tier", async () => {
    retrieve.mockResolvedValue({
      status: "active",
      plan: { id: "plan_audio_test" },
    });
    expect(
      (
        await fetch(
          base +
            "/api/checkout/verify?membership_id=mem_test&tier=full-session",
        )
      ).status,
    ).toBe(403);
    expect(storage.createSession).not.toHaveBeenCalled();
  });
  it("creates only the matching paid tier", async () => {
    retrieve.mockResolvedValue({
      status: "active",
      plan: { id: "plan_audio_test" },
    });
    vi.mocked(storage.createSession).mockResolvedValue({
      id: "s",
      tier: "audio-session",
      expiresAt: null,
    } as never);
    expect(
      (
        await fetch(
          base +
            "/api/checkout/verify?membership_id=mem_test&tier=audio-session",
        )
      ).status,
    ).toBe(200);
    expect(storage.createSession).toHaveBeenCalledWith(
      expect.objectContaining({ tier: "audio-session" }),
    );
  });
  it("denies vision to an audio-only session before touching xAI", async () => {
    const res = await fetch(base + "/api/grok-vision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "s",
        imageData: "data:image/jpeg;base64,AAAA",
      }),
    });
    expect(res.status).toBe(403);
  });
});
describe("approved APK gate", () => {
  it("does not advertise a configured artifact when its required download credential is absent", async () => {
    vi.stubEnv("APPROVED_APK_URL", "https://expo.dev/artifacts/eas/test.apk");
    vi.stubEnv("EXPO_TOKEN", "");
    expect(await (await fetch(base + "/api/download/status")).json()).toEqual({
      apkAvailable: false,
    });
  });
  it("reports unavailable with no approved artifact", async () => {
    vi.stubEnv("APPROVED_APK_URL", "");
    expect(await (await fetch(base + "/api/download/status")).json()).toEqual({
      apkAvailable: false,
    });
    expect((await fetch(base + "/api/download/apk")).status).toBe(503);
  });
  it("refuses a non-Expo artifact host rather than forwarding an Expo credential", async () => {
    vi.stubEnv("APPROVED_APK_URL", "https://example.com/file.apk");
    expect(await (await fetch(base + "/api/download/status")).json()).toEqual({
      apkAvailable: false,
    });
  });
});

describe("checkout callback URL boundaries", () => {
  async function checkout(successUrl: unknown, cancelUrl?: unknown) {
    return fetch(base + "/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier: "audio-session", successUrl, cancelUrl }),
    });
  }
  it("rejects origin-prefix tricks and credential-bearing return URLs", async () => {
    for (const url of [
      "https://app.example.attacker.test/",
      "https://app.example@attacker.test/",
      "https://user:pass@app.example/",
      "http://app.example/",
    ]) {
      expect((await checkout(url)).status).toBe(400);
    }
    expect(checkoutCreate).not.toHaveBeenCalled();
  });
  it("accepts the exact web origin and registered native scheme", async () => {
    expect((await checkout("https://app.example/?success=true")).status).toBe(
      200,
    );
    expect(
      (
        await checkout(
          "ais-and-ears-native://conversation?membership_id=mem_test",
        )
      ).status,
    ).toBe(200);
  });
  it("rejects malformed typed callbacks without creating a checkout", async () => {
    expect((await checkout(123)).status).toBe(400);
    expect(
      (await checkout("https://app.example/", "https://app.example.evil.test/"))
        .status,
    ).toBe(400);
    expect(checkoutCreate).not.toHaveBeenCalled();
  });
});
