import * as SecureStore from "expo-secure-store";
import {
  loadCredentialSettings,
  saveCredentialSettings,
} from "@/lib/credentialSettings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Alert, Appearance, Platform } from "react-native";

function setScheme(isDark: boolean) {
  if (Platform.OS !== "web") {
    Appearance.setColorScheme(isDark ? "dark" : "light");
  }
}

export interface Settings {
  useMic: boolean;
  useCam: boolean;
  verbalResponses: boolean;
  autoVision: boolean;
  isDark: boolean;
  /**
   * BYOK — Bring Your Own xAI API Key
   *
   * If set, passed to the server as `userKey` on WebSocket and vision requests.
   * Stored in iOS Keychain / Android Keystore-backed SecureStore — never persisted server-side.
   * Payment is still required; your key just lifts xAI's per-account voice cap.
   *
   * Format: "xai-..." — get yours at console.x.ai
   */
  xaiApiKey: string;
  /**
   * Music Analysis — Leo's ears for ambient music
   *
   * When enabled, audio captured by the mic is periodically analyzed for
   * musical content (BPM, key, mood). Detected music context is injected
   * into Leo's session so he can reference what's playing.
   * Audio is not retained; compressed clips use temporary server files during decoding.
   */
  musicAnalysis: boolean;
}

interface SettingsContextType {
  settings: Settings;
  ready: boolean;
  update: (patch: Partial<Settings>) => void;
}

const DEFAULTS: Settings = {
  useMic: true,
  useCam: false,
  verbalResponses: true,
  autoVision: false,
  isDark: true,
  xaiApiKey: "",
  musicAnalysis: false,
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [ready, setReady] = useState(false);
  const settingsRef = useRef(DEFAULTS);
  const writesRef = useRef(Promise.resolve());
  // Web preview has no Keychain: keep BYOK session-only, never persist plaintext.
  const webKeys = useRef(new Map<string, string>());
  const credentials =
    Platform.OS === "web"
      ? {
          getItemAsync: async (k: string) => webKeys.current.get(k) ?? null,
          setItemAsync: async (k: string, v: string) => {
            webKeys.current.set(k, v);
          },
          deleteItemAsync: async (k: string) => {
            webKeys.current.delete(k);
          },
        }
      : SecureStore;

  useEffect(() => {
    let active = true;
    loadCredentialSettings(AsyncStorage, credentials)
      .then((loaded) => {
        if (!active) return;
        const next = { ...DEFAULTS, ...loaded } as Settings;
        settingsRef.current = next;
        setSettings(next);
        setScheme(next.isDark);
        setReady(true);
      })
      .catch(() => {
        Alert.alert(
          "Secure settings unavailable",
          "Your old settings were not erased. Restart after unlocking the device; keys will not be saved in plaintext.",
        );
      });
    return () => {
      active = false;
    };
  }, []);

  const update = (patch: Partial<Settings>) => {
    if (!ready) {
      Alert.alert(
        "Settings not ready",
        "Unlock the device and restart to load secure credentials.",
      );
      return;
    }
    const next = { ...settingsRef.current, ...patch };
    settingsRef.current = next;
    setSettings(next);
    if (patch.isDark !== undefined) setScheme(patch.isDark);
    writesRef.current = writesRef.current
      .then(() => saveCredentialSettings(AsyncStorage, credentials, next))
      .catch(() => {
        Alert.alert(
          "Settings not saved",
          "Secure storage failed. The key is available only for this session; no plaintext fallback was written.",
        );
      });
  };

  return (
    <SettingsContext.Provider value={{ settings, update, ready }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
