import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface AppSettings {
  theme: "dark" | "light";
  cameraEnabled: boolean;
  micEnabled: boolean;
  verbalResponses: boolean;
  autoVision: boolean;
}

const DEFAULTS: AppSettings = {
  theme: "dark",
  cameraEnabled: true,
  micEnabled: true,
  verbalResponses: true,
  autoVision: true,
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
