import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Radio, ShoppingBag } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface HomeTabProps {
  onGoToPackages: () => void;
}

export function HomeTab({ onGoToPackages }: HomeTabProps) {
  const { settings } = useSettings();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Hero Banner */}
      <div className="relative w-full">
        <img
          src={`${import.meta.env.BASE_URL}images/ai-banner.jpg`}
          alt="AIs & Ears"
          className="w-full object-cover"
          style={{ maxHeight: "46vh", objectPosition: "center top" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
      </div>

      {/* Hero Text */}
      <section className="px-6 text-center -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl font-light font-display tracking-tight mb-4 text-glow">
            Give Your AI<br />
            <span className="text-primary font-normal">Real Eyes & Ears</span>
          </h1>
          <p className="text-base text-muted-foreground mb-8 font-light leading-relaxed max-w-sm">
            Grant your favorite AI direct, real-time access to your microphone
            {settings.cameraEnabled ? " and camera" : ""}. No transcriptions. No middlemen.
          </p>

          {/* Active settings indicators */}
          <div className="flex gap-3 mb-8 flex-wrap justify-center">
            <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border ${settings.micEnabled ? "border-primary/40 text-primary bg-primary/10" : "border-muted text-muted-foreground bg-muted/30"}`}>
              <Radio className="w-3 h-3" /> Microphone {settings.micEnabled ? "Active" : "Off"}
            </span>
            <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border ${settings.cameraEnabled ? "border-primary/40 text-primary bg-primary/10" : "border-muted text-muted-foreground bg-muted/30"}`}>
              <Radio className="w-3 h-3" /> Camera {settings.cameraEnabled ? "Active" : "Off"}
            </span>
          </div>

          {/* CTA — takes them to Packages to pick a paid plan */}
          <Button
            variant="neon"
            size="lg"
            className="w-full max-w-sm text-lg py-6 rounded-2xl box-glow"
            onClick={onGoToPackages}
          >
            <ShoppingBag className="w-5 h-5 mr-2" /> Choose Your Uplink
          </Button>
        </motion.div>
      </section>

      {/* Feature highlights */}
      <section className="px-6 py-10 mt-4">
        <div className="max-w-lg mx-auto grid grid-cols-1 gap-4">
          {[
            { title: "Raw Audio Stream", desc: "PCM16 audio sent directly to Leo — no transcription, no delay." },
            { title: "Live Vision", desc: "Leo sees what your camera sees in real time." },
            { title: "Always-On Bridge", desc: "Runs in the background while you use any AI app." },
          ].map(({ title, desc }) => (
            <div key={title} className="glass-panel rounded-xl p-4 border border-primary/10">
              <h3 className="text-sm font-semibold text-primary mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
