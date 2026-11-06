import React from "react";
import { act, create, type ReactTestRenderer } from "react-test-renderer";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({
  settings: {
    cameraEnabled: false,
    micEnabled: true,
    verbalResponses: false,
    autoVision: false,
    xaiApiKey: "",
    musicAnalysis: false,
  },
}));
vi.mock("framer-motion", () => ({
  motion: { div: "div" },
  AnimatePresence: "div",
}));
vi.mock("lucide-react", () =>
  Object.fromEntries(
    [
      "Square",
      "Mic",
      "MicOff",
      "Eye",
      "EyeOff",
      "Camera",
      "CameraOff",
      "Monitor",
      "MonitorOff",
      "Activity",
      "ShieldAlert",
      "RefreshCcw",
      "Radio",
      "Music",
      "Music2",
    ].map((n) => [n, n]),
  ),
);
vi.mock("@/components/ui/button", () => ({ Button: "button" }));
vi.mock("@/components/ui/badge", () => ({ Badge: "span" }));
vi.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast: vi.fn() }) }));
vi.mock("@/context/SettingsContext", () => ({
  useSettings: () => ({ settings: mocks.settings }),
}));
vi.mock("@/lib/clientLogger", () => ({
  clientLogger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock("@/lib/utils", () => ({ formatTime: () => "" }));
import { ConversationFeed } from "../src/components/feed/ConversationFeed";
class Socket {
  static OPEN = 1;
  static last: Socket;
  readyState = 1;
  send = vi.fn();
  close = vi.fn();
  onopen: null | (() => void) = null;
  onmessage: null | ((e: { data: string }) => void) = null;
  onerror: null | (() => void) = null;
  onclose: null | ((e: { code: number }) => void) = null;
  constructor() {
    Socket.last = this;
  }
}
const track = () => ({ stop: vi.fn(), enabled: true });
let audio: ReturnType<typeof track>;
let stream: {
  getTracks: () => ReturnType<typeof track>[];
  getAudioTracks: () => ReturnType<typeof track>[];
  getVideoTracks: () => ReturnType<typeof track>[];
};
let gum: ReturnType<typeof vi.fn>;
let tree: ReactTestRenderer | undefined;
class Context {
  state = "running";
  sampleRate = 24000;
  destination = {};
  close = vi.fn(async () => {});
  resume = vi.fn(async () => {});
  audioWorklet = { addModule: vi.fn(async () => {}) };
  createMediaStreamSource() {
    return { connect: vi.fn() };
  }
  createAnalyser() {
    return {
      fftSize: 256,
      frequencyBinCount: 128,
      getByteFrequencyData: vi.fn(),
    };
  }
}
beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("WebSocket", Socket);
  vi.stubGlobal("AudioContext", Context);
  vi.stubGlobal(
    "AudioWorkletNode",
    class {
      port = { onmessage: null };
      connect = vi.fn();
      disconnect = vi.fn();
    },
  );
  vi.stubGlobal("requestAnimationFrame", () => 1);
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.stubGlobal("document", {
    hidden: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  vi.stubGlobal("window", {
    location: { protocol: "https:", host: "web.example.com" },
  });
  audio = track();
  stream = {
    getTracks: () => [audio],
    getAudioTracks: () => [audio],
    getVideoTracks: () => [],
  };
  vi.stubGlobal(
    "MediaStream",
    class {
      getAudioTracks = () => [audio];
      getTracks = () => [audio];
    },
  );
  gum = vi.fn(async () => stream);
  vi.stubGlobal("navigator", { mediaDevices: { getUserMedia: gum } });
});
afterEach(async () => {
  if (tree) await act(async () => tree!.unmount());
  tree = undefined;
  vi.unstubAllGlobals();
});
function button(text: string) {
  return tree!.root
    .findAllByType("button")
    .find((b) =>
      b.children.some((c) => typeof c === "string" && c.includes(text)),
    )!;
}
async function mount() {
  await act(async () => {
    tree = create(
      <ConversationFeed
        sessionId="test-only"
        tier="full-session"
        expiresAt={null}
        onClose={() => {}}
      />,
    );
  });
}
async function connect() {
  await act(async () => button("Connect with Leo").props.onClick());
  return Socket.last;
}
describe("browser media lifecycle", () => {
  it("stops microphone and socket on unmount", async () => {
    await mount();
    const ws = await connect();
    await act(async () => tree!.unmount());
    tree = undefined;
    expect(audio.stop).toHaveBeenCalled();
    expect(ws.close).toHaveBeenCalled();
  });
  it("stops microphone after a connection error", async () => {
    await mount();
    const ws = await connect();
    await act(async () => ws.onerror?.());
    expect(audio.stop).toHaveBeenCalled();
    expect(ws.close).toHaveBeenCalled();
  });
  it("stops late permission results after navigation", async () => {
    let resolve!: (s: typeof stream) => void;
    gum.mockImplementation(
      () =>
        new Promise((r) => {
          resolve = r;
        }),
    );
    await mount();
    let pending: Promise<void>;
    await act(async () => {
      pending = button("Connect with Leo").props.onClick();
    });
    await act(async () => tree!.unmount());
    tree = undefined;
    await act(async () => {
      resolve(stream);
      await pending!;
    });
    expect(audio.stop).toHaveBeenCalled();
  });
  it("offers a reply-audio stop control independent of End Session", async () => {
    await mount();
    const ws = await connect();
    await act(async () => button("Stop reply audio").props.onClick());
    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({ type: "response.cancel" }),
    );
  });
});
