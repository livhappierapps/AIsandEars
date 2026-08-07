import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface AppSettings {
  theme: "dark" | "light";
  cameraEnabled: boolean;
  micEnabled: boolean;
  verbalResponses: boolean;
  autoVision: boolean;
  /**
   * BYOK — Bring Your Own xAI API Key
   *
   * If set, this key is used instead of the server's XAI_API_KEY for Realtime
   * and Vision calls. Stored in localStorage (client-side only — never sent to
   * our server's DB). Payment is still required; your key just lifts xAI's
   * per-account rate limits so you're not blocked by their daily voice cap.
   *
   * Format: "xai-..." — get yours at console.x.ai
   */
  xaiApiKey: string;
  /**
   * Music Analysis — Leo's ears for ambient music
   *
   * When enabled, microphone audio is periodically sent to the server for
   * music detection. BPM, key, and mood tags are injected into Leo's context
   * so he can reference what's playing. Audio is never stored.
   */
  musicAnalysis: boolean;
}

const DEFAULTS: AppSettings = {
  theme: "dark",
  cameraEnabled: true,
  micEnabled: true,
  verbalResponses: true,
  autoVision: true,
  xaiApiKey: "",
  musicAnalysis: false,
};

interface SettingsContextValue {
  settings: AppSettings;
  setSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: DEFAULTS,
  setSetting: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    // Guard: localStorage is not available in SSR/Node environments
    if (typeof window === "undefined") return DEFAULTS;
    try {
      const stored = localStorage.getItem("aisears-settings");
      return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    localStorage.setItem("aisears-settings", JSON.stringify(settings));
    if (settings.theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, [settings]);

  const setSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
