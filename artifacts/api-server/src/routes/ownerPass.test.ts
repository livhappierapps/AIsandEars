import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
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

import { storage } from "../storage";
import ownerPass, {
  MAX_FAILED_ATTEMPTS,
  OWNER_PAYMENT_PREFIX,
  OWNER_TIER,
  resetOwnerPassLimiter,
} from "./ownerPass";

const PASS = "test-owner-pass-0123456789abcdefghijklmnop";
let server: Server, base: string;

beforeAll(async () => {
  const app = express();
  app.use(express.json());
  app.use("/api", ownerPass);
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
  resetOwnerPassLimiter();
  vi.stubEnv("OWNER_PASS", PASS);
  vi.mocked(storage.createSession)
    .mockReset()
    .mockImplementation(async (data) => ({
      ...data,
      expiresAt: data.expiresAt ?? null,
      used: false,
      createdAt: new Date(),
    }) as never);
});

const post = (body: unknown) =>
  fetch(base + "/api/owner-pass", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

describe("owner pass", () => {
  it("creates a comp owner session for the right code", async () => {
    const res = await post({ code: `  ${PASS} ` });
    expect(res.status).toBe(200);
    const data = (await res.json()) as {
      sessionId: string;
      expiresAt: string;
    };
    expect(data).toMatchObject({ valid: true, comp: true, tier: OWNER_TIER });
    expect(typeof data.sessionId).toBe("string");
    expect(new Date(data.expiresAt).getTime()).toBeGreaterThan(Date.now());
    const row = vi.mocked(storage.createSession).mock.calls[0][0];
    expect(row.stripeSessionId.startsWith(OWNER_PAYMENT_PREFIX)).toBe(true);
    expect(row.stripeSessionId.startsWith("mem_")).toBe(false);
    expect(row.id).toBe(data.sessionId);
  });

  it("rejects a wrong code without creating a session", async () => {
    expect((await post({ code: "nope" })).status).toBe(401);
    expect((await post({ code: PASS.slice(0, -1) })).status).toBe(401);
    expect((await post({})).status).toBe(400);
    expect(storage.createSession).not.toHaveBeenCalled();
  });

  it("does not exist when OWNER_PASS is unset or too short", async () => {
    vi.stubEnv("OWNER_PASS", "");
    expect((await post({ code: PASS })).status).toBe(404);
    vi.stubEnv("OWNER_PASS", "short");
    expect((await post({ code: "short" })).status).toBe(404);
    expect(storage.createSession).not.toHaveBeenCalled();
  });

  it("rate-limits repeated failures, even if the right code follows", async () => {
    for (let i = 0; i < MAX_FAILED_ATTEMPTS; i++) {
      expect((await post({ code: `wrong-${i}` })).status).toBe(401);
    }
    const limited = await post({ code: PASS });
    expect(limited.status).toBe(429);
    expect(limited.headers.get("retry-after")).toBeTruthy();
    expect(storage.createSession).not.toHaveBeenCalled();
    resetOwnerPassLimiter();
    expect((await post({ code: PASS })).status).toBe(200);
  });
});
