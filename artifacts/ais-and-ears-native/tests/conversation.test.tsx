import React from "react";
import { FlatList } from "react-native";
import { act, create, type ReactTestRenderer } from "react-test-renderer";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({
  stop: vi.fn(),
  speak: vi.fn(),
  mode: vi.fn(async () => {}),
  cameraPermission: vi.fn(async () => ({ status: "granted" })),
  camera: vi.fn(async () => ({ canceled: true, assets: [] })),
  params: { session_id: "test-session", tier: "full-session" } as Record<
    string,
    string
  >,
  background: null as null | ((s: string) => void),
}));
vi.mock("react-native", () => ({
  Platform: { OS: "ios" },
  AppState: {
    addEventListener: (_: string, fn: (s: string) => void) => {
      mocks.background = fn;
      return { remove: vi.fn() };
    },
  },
  StyleSheet: { create: (x: unknown) => x, hairlineWidth: 1 },
  Alert: { alert: vi.fn() },
  ActivityIndicator: "ActivityIndicator",
  FlatList: "FlatList",
  KeyboardAvoidingView: "KeyboardAvoidingView",
  Pressable: "Pressable",
  Text: "Text",
  TextInput: "TextInput",
  View: "View",
}));
vi.mock("expo-av", () => ({
  Audio: {
    RecordingOptionsPresets: { HIGH_QUALITY: { android: {} } },
    AndroidOutputFormat: { MPEG_4: 1 },
    AndroidAudioEncoder: { AAC: 1 },
    IOSAudioQuality: { MAX: 1 },
    IOSOutputFormat: { LINEARPCM: 1 },
    setAudioModeAsync: mocks.mode,
    requestPermissionsAsync: vi.fn(async () => ({ status: "granted" })),
  },
}));
vi.mock("expo-file-system/legacy", () => ({
  deleteAsync: vi.fn(async () => {}),
  EncodingType: { Base64: "base64" },
}));
vi.mock("expo-haptics", () => ({
  impactAsync: vi.fn(),
  ImpactFeedbackStyle: { Medium: 1, Light: 0 },
}));
vi.mock("expo-image-picker", () => ({
  requestCameraPermissionsAsync: mocks.cameraPermission,
  launchCameraAsync: mocks.camera,
}));
vi.mock("expo-router", () => ({
  useRouter: () => ({ back: vi.fn() }),
  useLocalSearchParams: () => mocks.params,
}));
vi.mock("expo-speech", () => ({ stop: mocks.stop, speak: mocks.speak }));
vi.mock("@expo/vector-icons", () => ({
  Feather: "Feather",
  Ionicons: "Ionicons",
}));
vi.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0 }),
}));
vi.mock("@/hooks/useColors", () => ({ useColors: () => ({}) }));
vi.mock("@/context/SettingsContext", () => ({
  useSettings: () => ({
    ready: true,
    settings: { xaiApiKey: "", verbalResponses: false },
  }),
}));
import Conversation from "../app/conversation";
class Socket {
  static OPEN = 1;
  static CLOSING = 2;
  static last: Socket;
  readyState = 1;
  url: string;
  send = vi.fn();
  close = vi.fn(() => {
    this.readyState = 3;
  });
  onopen: null | (() => void) = null;
  onmessage: null | ((e: { data: string }) => void) = null;
  onclose: null | ((e: { code: number }) => void) = null;
  onerror: null | (() => void) = null;
  constructor(url: string) {
    this.url = url;
    Socket.last = this;
  }
  event(msg: unknown) {
    this.onmessage?.({ data: JSON.stringify(msg) });
  }
}
let tree: ReactTestRenderer | undefined;
beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("WebSocket", Socket);
  vi.stubEnv("EXPO_PUBLIC_API_BASE_URL", "https://api.example.com/api");
  mocks.stop.mockClear();
  mocks.camera.mockClear();
  mocks.cameraPermission.mockReset().mockResolvedValue({ status: "granted" });
  mocks.params = { session_id: "test-session", tier: "full-session" };
});
afterEach(async () => {
  if (tree) await act(async () => tree!.unmount());
  tree = undefined;
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
async function mount() {
  await act(async () => {
    tree = create(<Conversation />);
  });
  return Socket.last;
}
describe("native socket lifecycle", () => {
  it("does not close its own socket on connecting -> connected", async () => {
    const ws = await mount();
    await act(async () => {
      ws.onopen?.();
      ws.event({ type: "connected" });
    });
    expect(ws.close).not.toHaveBeenCalled();
    expect(ws.url).toBe(
      "wss://api.example.com/api/grok-live?sessionId=test-session",
    );
  });
  it("stops speech and closes socket on unmount", async () => {
    const ws = await mount();
    await act(async () => tree!.unmount());
    tree = undefined;
    expect(ws.close).toHaveBeenCalledWith(1000, "Screen unmounted");
    expect(mocks.stop).toHaveBeenCalled();
  });
  it("immediately stops/disconnects with the visible stop button", async () => {
    const ws = await mount();
    await act(async () =>
      tree!.root
        .findByProps({ accessibilityLabel: "Stop all media and speech" })
        .props.onPress(),
    );
    expect(ws.close).toHaveBeenCalledWith(1000, "Stopped");
    expect(mocks.stop).toHaveBeenCalled();
  });
  it("does not disconnect for a permission sheet's inactive state", async () => {
    const ws = await mount();
    await act(async () => mocks.background?.("inactive"));
    expect(ws.close).not.toHaveBeenCalled();
  });
  it("stops media when backgrounded", async () => {
    const ws = await mount();
    await act(async () => mocks.background?.("background"));
    expect(ws.close).toHaveBeenCalledWith(1000, "App backgrounded");
    expect(mocks.stop).toHaveBeenCalled();
  });
  it("does not open the camera after Stop while permission is pending", async () => {
    let permission!: (v: { status: string }) => void;
    mocks.cameraPermission.mockImplementationOnce(
      () =>
        new Promise((r) => {
          permission = r;
        }),
    );
    const ws = await mount();
    await act(async () => ws.event({ type: "connected" }));
    let pending!: Promise<void>;
    await act(async () => {
      pending = tree!.root
        .findByProps({ testID: "camera-button" })
        .props.onPress();
    });
    await act(async () =>
      tree!.root
        .findByProps({ accessibilityLabel: "Stop all media and speech" })
        .props.onPress(),
    );
    await act(async () => {
      permission({ status: "granted" });
      await pending;
    });
    expect(mocks.camera).not.toHaveBeenCalled();
  });
  it("surfaces camera permission errors without an unhandled rejection", async () => {
    mocks.cameraPermission.mockRejectedValueOnce(
      new Error("camera unavailable"),
    );
    const ws = await mount();
    await act(async () => ws.event({ type: "connected" }));
    await act(async () =>
      tree!.root.findByProps({ testID: "camera-button" }).props.onPress(),
    );
    const list = tree!.root.findByType(FlatList);
    expect(
      list.props.data.some((m: { text: string }) =>
        m.text.includes("camera unavailable"),
      ),
    ).toBe(true);
  });
  it("accepts the membership_id checkout callback parameter", async () => {
    mocks.params = { membership_id: "mem_test", tier: "full-session" };
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ sessionId: "verified-test" }),
      })),
    );
    const ws = await mount();
    expect(ws.url).toContain("sessionId=verified-test");
  });
});
