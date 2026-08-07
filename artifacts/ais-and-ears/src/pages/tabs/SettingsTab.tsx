import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/context/SettingsContext";
import { Moon, Sun, Mic, Video, MessageSquare, Eye, Info, Key, Music } from "lucide-react";

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}

function SettingRow({ icon, label, description, checked, onCheckedChange }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-primary/10 last:border-0">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground leading-snug mt-0.5">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} className="shrink-0" />
    </div>
  );
}

export function SettingsTab() {
  const { settings, setSetting } = useSettings();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-4">
      <div className="px-6 pt-8 pb-4 text-center">
        <h2 className="text-2xl font-display font-light text-glow mb-1">Settings</h2>
        <p className="text-sm text-muted-foreground">Customize your AIs & Ears experience.</p>
      </div>

      <div className="px-6 max-w-lg mx-auto w-full space-y-6">

        {/* Appearance */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-primary mb-1">Appearance</h3>
          <div className="glass-panel rounded-2xl px-4 border border-primary/10">
            <SettingRow
              icon={settings.theme === "dark" ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
              label="Dark Mode"
              description="Switch between dark and light interface themes."
              checked={settings.theme === "dark"}
              onCheckedChange={(v) => setSetting("theme", v ? "dark" : "light")}
            />
          </div>
        </motion.section>

        {/* Sensors */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-primary mb-1">Sensors</h3>
          <div className="glass-panel rounded-2xl px-4 border border-primary/10">
            <SettingRow
              icon={<Mic className="w-4 h-4 text-primary" />}
              label="Microphone"
              description="Stream your microphone audio to Leo in real time."
              checked={settings.micEnabled}
              onCheckedChange={(v) => setSetting("micEnabled", v)}
            />
            <SettingRow
              icon={<Video className="w-4 h-4 text-primary" />}
              label="Camera"
              description="Allow Leo to see through your device's camera."
              checked={settings.cameraEnabled}
              onCheckedChange={(v) => setSetting("cameraEnabled", v)}
            />
            <SettingRow
              icon={<Eye className="w-4 h-4 text-primary" />}
              label="Auto-Vision"
              description="Automatically send a camera frame to Leo every 3 seconds."
              checked={settings.autoVision}
              onCheckedChange={(v) => setSetting("autoVision", v)}
            />
            <SettingRow
              icon={<Music className="w-4 h-4 text-primary" />}
              label="Music Analysis"
              description="Leo listens for ambient music — BPM, key, mood injected into context. Audio is never stored."
              checked={settings.musicAnalysis}
              onCheckedChange={(v) => setSetting("musicAnalysis", v)}
            />
          </div>
        </motion.section>

        {/* AI Behavior */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-primary mb-1">AI Behavior</h3>
          <div className="glass-panel rounded-2xl px-4 border border-primary/10">
            <SettingRow
              icon={<MessageSquare className="w-4 h-4 text-primary" />}
              label="Verbal Responses"
              description="Leo responds out loud to your audio and video feed."
              checked={settings.verbalResponses}
              onCheckedChange={(v) => setSetting("verbalResponses", v)}
            />
          </div>
        </motion.section>

        {/* BYOK — xAI API Key */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-primary mb-1">Your xAI API Key</h3>
          <div className="glass-panel rounded-2xl px-4 py-4 border border-primary/10 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Key className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Bring Your Own Key</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                  Plug in your own xAI API key to bypass their daily voice limits.
                  Your key stays in your browser — we never store it. Payment still required.
                </p>
              </div>
            </div>
            <Input
              type="password"
              placeholder="xai-..."
              value={settings.xaiApiKey}
              onChange={(e) => setSetting("xaiApiKey", e.target.value)}
              className="font-mono text-xs bg-background/50 border-primary/20 focus:border-primary/60"
              autoComplete="off"
              spellCheck={false}
            />
            {settings.xaiApiKey && (
              <p className="text-xs text-primary/70 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                Key active — your usage goes to your xAI account
              </p>
            )}
            <p className="text-xs text-muted-foreground/60">
              Get a key at{" "}
              <a href="https://console.x.ai" target="_blank" rel="noopener noreferrer" className="text-primary/80 hover:text-primary underline underline-offset-2">
                console.x.ai
              </a>
            </p>
          </div>
        </motion.section>

        {/* Coming soon */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Coming Soon</h3>
          <div className="glass-panel rounded-2xl px-4 py-4 border border-muted/20 opacity-50">
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Theme Packs</p>
                <p className="text-xs text-muted-foreground/70 leading-snug mt-0.5">
                  Color wheels, sliders, skins, and custom themes.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <p className="text-center text-xs text-muted-foreground pb-2">
          © {new Date().getFullYear()} AIs&Ears · Whatever it takes — LivHappier! 😊
        </p>
      </div>
    </div>
  );
}
