import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance, Platform } from "react-native";

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
   * Stored in AsyncStorage on-device only — never persisted server-side.
   * Payment is still required; your key just lifts xAI's per-account voice cap.
   *
   * Format: "xai-..." — get yours at console.x.ai
   */
  xaiApiKey: string;
}

interface SettingsContextType {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
}

const DEFAULTS: Settings = {
  useMic: true,
  useCam: false,
  verbalResponses: true,
  autoVision: false,
  isDark: true,
  xaiApiKey: "",
};

const STORAGE_KEY = "@aisears/settings";

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      const loaded = raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) } : DEFAULTS;
      setSettings(loaded);
      setScheme(loaded.isDark);
    }).catch(() => {
      setScheme(true);
    });
  }, []);

  const update = (patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      if (patch.isDark !== undefined) {
        setScheme(patch.isDark);
      }
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, update }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
