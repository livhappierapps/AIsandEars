/**
 * Integration tests for grokRealtime.ts
 *
 * Verifies every lifecycle log event fires with the right structured fields so
 * a bad merge cannot silently remove observability.
 *
 * Approach:
 *  - Real HTTP server with the proxy on a random port.
 *  - The outgoing WebSocket to xAI is intercepted by mocking the ws module —
 *    WebSocketServer stays real; only the WebSocket constructor is replaced
 *    with a controllable fake.
 *  - The test-side client uses the REAL WebSocket (saved in the mock factory
 *    before the fake is installed) so it connects to the actual proxy.
 *  - storage.getSession is mocked to control what the DB returns.
 *  - logger methods are spied on to assert structured log events.
 */

import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServer } from "http";
import type { AddressInfo } from "net";
import type { WebSocket as WsType } from "ws";

// ── Hoisted shared state ──────────────────────────────────────────────────────
// vi.hoisted runs before vi.mock factories AND before imports, so factories can
// safely close over these references.
const shared = vi.hoisted(() => ({
  /** The FakeWebSocket most recently created by the proxy (i.e. to xAI). */
  lastXaiInstance: null as null | {
    readyState: number;
    send: ReturnType<typeof vi.fn>;
    close: ReturnType<typeof vi.fn>;
    emit: (event: string, ...args: unknown[]) => boolean;
  },
  /** The REAL WebSocket class saved before our fake is installed. */
  RealWebSocket: null as (new (...args: unknown[]) => WsType) | null,
}));

// ── Mock: storage ─────────────────────────────────────────────────────────────
vi.mock("../storage", () => ({
  storage: {
    getSession: vi.fn(),
  },
}));

// ── Mock: ws ──────────────────────────────────────────────────────────────────
// WebSocketServer stays real (the proxy uses it).
// WebSocket (used to connect outward to xAI) becomes a controllable fake.
// EventEmitter is imported dynamically because vi.mock factories are hoisted
// above all module-level imports and cannot reference them.
vi.mock("ws", async (importOriginal) => {
  const actual = await importOriginal<typeof import("ws")>();
  const { EventEmitter } = await import("events");

  // Save the real WebSocket so tests can use it as the browser-side client.
  (shared as { RealWebSocket: unknown }).RealWebSocket = actual.WebSocket;

  class FakeWebSocket extends EventEmitter {
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;

    readyState = 1;
    url: string;
    send = vi.fn();
    close = vi.fn(function (this: FakeWebSocket) {
      this.readyState = 3;
      setImmediate(() => this.emit("close", 1000, Buffer.from("")));
    });

    constructor(url: string, _opts?: unknown) {
      super();
      this.url = url;
      (shared as { lastXaiInstance: unknown }).lastXaiInstance = this;
      // Simulate async open so handlers registered after construction fire.
      setImmediate(() => this.emit("open"));
    }
  }

  return { ...actual, WebSocket: FakeWebSocket };
});

// ── Imports (resolved after mocks are declared) ───────────────────────────────
import { attachGrokRealtimeProxy } from "./grokRealtime";
import { logger } from "../lib/logger";
import { storage } from "../storage";

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Connect a real WebSocket client to the proxy under test. */
function connectClient(port: number, query = ""): WsType {
  const RealWS = shared.RealWebSocket!;
  return new RealWS(
    `ws://127.0.0.1:${port}/api/grok-live${query}`,
  ) as unknown as WsType;
}

function waitForClose(
  ws: WsType,
  timeoutMs = 3000,
): Promise<{ code: number; reason: string }> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(
      () => reject(new Error("waitForClose timed out")),
      timeoutMs,
    );
    ws.once("close", (code, reason) => {
      clearTimeout(t);
      resolve({ code, reason: reason.toString() });
    });
  });
}

function waitForMessage(ws: WsType, timeoutMs = 3000): Promise<string> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(
      () => reject(new Error("waitForMessage timed out")),
      timeoutMs,
    );
    ws.once("message", (data) => {
      clearTimeout(t);
      resolve(data.toString());
    });
  });
}

/** Flush several rounds of setImmediate so all async callbacks settle. */
function flushAsync(ticks = 5): Promise<void> {
  let p = Promise.resolve();
  for (let i = 0; i < ticks; i++)
    p = p.then(() => new Promise<void>((r) => setImmediate(r)));
  return p;
}

// ── Suite ─────────────────────────────────────────────────────────────────────

describe("grokRealtime lifecycle logging", () => {
  let server: ReturnType<typeof createServer>;
  let port: number;

  let spyInfo: ReturnType<typeof vi.spyOn>;
  let spyWarn: ReturnType<typeof vi.spyOn>;
  let spyError: ReturnType<typeof vi.spyOn>;

  beforeAll(async () => {
    process.env.XAI_API_KEY = "test-xai-key";
    server = createServer();
    attachGrokRealtimeProxy(server);
    await new Promise<void>((resolve) =>
      server.listen(0, "127.0.0.1", resolve),
    );
    port = (server.address() as AddressInfo).port;
  });

  afterAll(async () => {
    delete process.env.XAI_API_KEY;
    await new Promise<void>((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve())),
    );
  });

  beforeEach(() => {
    vi.mocked(storage.getSession).mockReset();
    shared.lastXaiInstance = null;
    spyInfo = vi.spyOn(logger, "info");
    spyWarn = vi.spyOn(logger, "warn");
    spyError = vi.spyOn(logger, "error");
  });

  afterEach(() => {
    spyInfo.mockRestore();
    spyWarn.mockRestore();
    spyError.mockRestore();
  });

  function findWarnCall(fields: Record<string, unknown>) {
    return spyWarn.mock.calls.find(([obj]: [unknown, ...unknown[]]) => {
      if (typeof obj !== "object" || obj === null) return false;
      const o = obj as Record<string, unknown>;
      return Object.entries(fields).every(([k, v]) => o[k] === v);
    });
  }

  function findInfoCall(fields: Record<string, unknown>) {
    return spyInfo.mock.calls.find(([obj]: [unknown, ...unknown[]]) => {
      if (typeof obj !== "object" || obj === null) return false;
      const o = obj as Record<string, unknown>;
      return Object.entries(fields).every(([k, v]) => o[k] === v);
    });
  }

  // ── 1. Missing sessionId ───────────────────────────────────────────────────
  it("emits leo_connect_rejected / missing_session_id when sessionId is absent", async () => {
    const client = connectClient(port);
    const { code } = await waitForClose(client);

    expect(code).toBe(4001);
    expect(
      findWarnCall({
        event: "leo_connect_rejected",
        reason: "missing_session_id",
      }),
    ).toBeDefined();
  });

  // ── 2. Invalid (unknown) session ───────────────────────────────────────────
  it("emits leo_connect_rejected / invalid_session when session is not found", async () => {
    vi.mocked(storage.getSession).mockResolvedValue(null);

    const client = connectClient(port, "?sessionId=no-such-session");
    const { code } = await waitForClose(client);

    expect(code).toBe(4003);
    expect(
      findWarnCall({
        event: "leo_connect_rejected",
        reason: "invalid_session",
      }),
    ).toBeDefined();
  });

  // ── 3. Expired session ─────────────────────────────────────────────────────
  it("emits leo_connect_rejected / session_expired when session is past its expiry", async () => {
    vi.mocked(storage.getSession).mockResolvedValue({
      id: "expired-session",
      expiresAt: new Date(Date.now() - 60_000),
      stripeSessionId: null,
      createdAt: new Date(),
    } as never);

    const client = connectClient(port, "?sessionId=expired-session");
    const { code } = await waitForClose(client);

    expect(code).toBe(4003);
    expect(
      findWarnCall({
        event: "leo_connect_rejected",
        reason: "session_expired",
      }),
    ).toBeDefined();
  });

  // ── 4. Clean client disconnect ─────────────────────────────────────────────
  it("emits leo_client_disconnect when client closes cleanly with code 1000", async () => {
    vi.mocked(storage.getSession).mockResolvedValue({
      id: "valid-session",
      expiresAt: new Date(Date.now() + 3_600_000),
      stripeSessionId: null,
      createdAt: new Date(),
    } as never);

    const client = connectClient(port, "?sessionId=valid-session");
    // Wait for the proxy to relay the xAI "connected" message.
    await waitForMessage(client);

    client.close(1000, "done");
    await waitForClose(client);
    await flushAsync();

    expect(findInfoCall({ event: "leo_client_disconnect" })).toBeDefined();
  });

  // ── 5. xAI upstream error ──────────────────────────────────────────────────
  it("emits a structured error with sessionId when the xAI upstream errors", async () => {
    vi.mocked(storage.getSession).mockResolvedValue({
      id: "valid-session-2",
      expiresAt: new Date(Date.now() + 3_600_000),
      stripeSessionId: null,
      createdAt: new Date(),
    } as never);

    const client = connectClient(port, "?sessionId=valid-session-2");
    await waitForMessage(client);

    expect(shared.lastXaiInstance).not.toBeNull();
    shared.lastXaiInstance!.emit("error", new Error("xAI upstream blew up"));

    await waitForClose(client);
    await flushAsync();

    const errorCall = spyError.mock.calls.find(([obj]: [unknown, ...unknown[]]) => {
      if (typeof obj !== "object" || obj === null) return false;
      const o = obj as Record<string, unknown>;
      return o.sessionId !== undefined && o.err !== undefined;
    });
    expect(errorCall).toBeDefined();
  });
});
