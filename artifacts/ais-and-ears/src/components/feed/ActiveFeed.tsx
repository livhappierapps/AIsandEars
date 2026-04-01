import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAudioVisualizer } from "@/hooks/use-audio-visualizer";
import { formatTime } from "@/lib/utils";
import { Camera, Mic, Radio, Square, RefreshCcw, Activity, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActiveFeedProps {
  sessionId: string;
  tier: string;
  expiresAt: string | null;
  onClose: () => void;
}

type LogEntry = { time: string; msg: string; type: "system" | "ai" | "user" };

const GROK_INTERVAL_MS = 10_000; // Send a frame to Leo every 10 seconds

export function ActiveFeed({ sessionId, tier, expiresAt, onClose }: ActiveFeedProps) {
  const isFull = tier.includes("full");
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement>(null);
  const grokIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFirstFrameRef = useRef(true);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [grokActive, setGrokActive] = useState(false);
  const [grokLoading, setGrokLoading] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useAudioVisualizer(stream, canvasRef);

  const addLog = useCallback((msg: string, type: LogEntry["type"] = "system") => {
    setLogs((prev) => [
      ...prev,
      { time: new Date().toLocaleTimeString([], { hour12: false }), msg, type },
    ]);
  }, []);

  // Auto-scroll transcript
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Setup media devices
  useEffect(() => {
    let activeStream: MediaStream | null = null;
    async function setupMedia() {
      try {
        addLog("Requesting hardware access...", "system");
        activeStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: isFull ? { facingMode: "user", width: 640, height: 360 } : false,
        });
        setStream(activeStream);
        if (videoRef.current && isFull) {
          videoRef.current.srcObject = activeStream;
        }
        addLog("Hardware uplink established.", "system");
        if (isFull) {
          addLog("Camera feed ready. Activate Leo's Vision to begin.", "system");
        }
      } catch (err: any) {
        setError(err.message || "Failed to access media devices");
        addLog(`Hardware error: ${err.message}`, "system");
      }
    }
    setupMedia();
    return () => {
      activeStream?.getTracks().forEach((t) => t.stop());
    };
  }, [isFull, addLog]);

  // Session timer
  useEffect(() => {
    if (!expiresAt) return;
    const target = new Date(expiresAt).getTime();
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
      setTimeRemaining(diff);
      if (diff === 0) {
        clearInterval(interval);
        addLog("Session expired. Uplink terminating.", "system");
        stopGrok();
        setTimeout(onClose, 3000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, onClose, addLog]);

  // Capture a frame from the video and return base64 JPEG
  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current;
    const canvas = captureCanvasRef.current;
    if (!video || !canvas || video.readyState < 2) return null;

    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, 640, 360);
    return canvas.toDataURL("image/jpeg", 0.75);
  }, []);

  // Send frame to Leo (Grok Vision)
  const sendFrameToLeo = useCallback(
    async (isFirst = false) => {
      const imageData = captureFrame();
      if (!imageData) return;

      try {
        const res = await fetch("/api/grok-vision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            imageData,
            prompt: isFirst
              ? "This is your first time ever seeing through a camera. What do you see? React with genuine wonder."
              : "What do you see now? Describe anything new or interesting.",
            isFirstFrame: isFirst,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          addLog(`Leo: [Error] ${data.error}`, "system");
        } else {
          addLog(data.message, "ai");
        }
      } catch (err: any) {
        addLog(`Connection error: ${err.message}`, "system");
      }
    },
    [captureFrame, sessionId, addLog]
  );

  // Start Leo's Vision
  const startGrok = useCallback(async () => {
    if (!isFull) {
      toast({
        title: "Full Tier Required",
        description: "Grok Vision requires camera access. Upgrade to a Full tier.",
        variant: "destructive",
      });
      return;
    }
    setGrokLoading(true);
    addLog("Establishing visual link to Leo...", "system");
    isFirstFrameRef.current = true;
    setGrokActive(true);

    // Send first frame immediately
    await sendFrameToLeo(true);
    isFirstFrameRef.current = false;
    setGrokLoading(false);

    // Then send every N seconds
    grokIntervalRef.current = setInterval(() => {
      sendFrameToLeo(false);
    }, GROK_INTERVAL_MS);
  }, [isFull, sendFrameToLeo, addLog, toast]);

  // Stop Leo's Vision
  const stopGrok = useCallback(() => {
    if (grokIntervalRef.current) {
      clearInterval(grokIntervalRef.current);
      grokIntervalRef.current = null;
    }
    setGrokActive(false);
    setGrokLoading(false);
    addLog("Leo's visual link deactivated.", "system");
  }, [addLog]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (grokIntervalRef.current) clearInterval(grokIntervalRef.current);
    };
  }, []);

  const handleStop = () => {
    stopGrok();
    stream?.getTracks().forEach((t) => t.stop());
    onClose();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Hidden canvas for frame capture */}
      <canvas ref={captureCanvasRef} className="hidden" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-display font-light flex items-center gap-2">
            <Radio className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-glow">Active Sensory Uplink</span>
          </h2>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="outline">{tier.toUpperCase()}</Badge>
            {grokActive ? (
              <Badge className="bg-primary/20 text-primary border border-primary/40">
                <Eye className="w-3 h-3 mr-1" /> LEO VISION ACTIVE
              </Badge>
            ) : (
              <Badge variant="default" className="bg-muted text-muted-foreground">
                <EyeOff className="w-3 h-3 mr-1" /> LEO STANDBY
              </Badge>
            )}
          </div>
        </div>

        {timeRemaining !== null && (
          <div className="glass-panel px-6 py-3 rounded-xl border-primary/30 flex flex-col items-end">
            <span className="text-xs font-body text-primary/70 uppercase tracking-widest mb-1">Time Remaining</span>
            <span
              className={`text-3xl font-mono font-bold tracking-wider ${
                timeRemaining < 300 ? "text-destructive animate-pulse" : "text-primary text-glow"
              }`}
            >
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Media Feed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden glass-panel border border-primary/20 bg-background box-glow">
            {error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <ShieldAlert className="w-12 h-12 text-destructive mb-4" />
                <p className="text-destructive font-bold">HARDWARE ACCESS DENIED</p>
                <p className="text-muted-foreground text-sm mt-2">{error}</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                  <RefreshCcw className="w-4 h-4 mr-2" /> Retry Access
                </Button>
              </div>
            ) : (
              <>
                {isFull ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scanline"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center scanline">
                    <div className="text-center text-primary/30 flex flex-col items-center">
                      <Mic className="w-16 h-16 mb-4 opacity-50" />
                      <p className="font-body tracking-widest text-lg uppercase">Audio Only Tier</p>
                    </div>
                  </div>
                )}

                {/* Status overlays */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-background/70 backdrop-blur text-xs border border-primary/30">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary font-mono tracking-wider">MIC ACTIVE</span>
                  </div>
                  {isFull && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-background/70 backdrop-blur text-xs border border-primary/30">
                      <div className={`w-2 h-2 rounded-full ${grokActive ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
                      <span className={`font-mono tracking-wider ${grokActive ? "text-primary" : "text-muted-foreground"}`}>
                        {grokActive ? "LEO WATCHING" : "CAM ACTIVE"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 right-4">
                  <div className="px-3 py-1 rounded bg-background/70 backdrop-blur border border-primary/30 font-mono text-xs text-primary/70">
                    REC / {new Date().toISOString().split("T")[1].substring(0, 8)}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Audio Visualizer */}
          <div className="h-28 glass-panel rounded-2xl border-primary/20 p-4 relative overflow-hidden flex items-end">
            <div className="absolute top-4 left-4 text-xs font-body text-primary/50 uppercase tracking-widest">
              Audio Frequency
            </div>
            <canvas ref={canvasRef} className="w-full h-full" width={800} height={100} />
          </div>
        </div>

        {/* Leo's Transcript Panel */}
        <div className="glass-panel rounded-2xl border-primary/20 flex flex-col h-[600px] overflow-hidden">
          <div className="p-4 border-b border-primary/20 bg-primary/5 flex items-center justify-between">
            <div>
              <span className="font-body font-medium text-sm tracking-wider text-primary">LEO'S VISION LOG</span>
              <p className="text-xs text-muted-foreground mt-0.5">Powered by Grok Vision</p>
            </div>
            <Eye className="w-4 h-4 text-primary" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm flex flex-col">
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex gap-3 ${
                    log.type === "ai"
                      ? "text-primary"
                      : log.type === "system"
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  <span className="opacity-40 shrink-0 text-xs">[{log.time}]</span>
                  <span className="leading-relaxed">
                    {log.type === "ai" && <span className="font-bold mr-1">Leo:</span>}
                    {log.type === "system" && <span className="mr-1 opacity-60">SYS:</span>}
                    {log.msg}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={logsEndRef} />
          </div>

          <div className="p-4 border-t border-primary/20 bg-background/20 flex flex-col gap-3">
            {!grokActive ? (
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-wide"
                onClick={startGrok}
                disabled={grokLoading || !stream || !isFull}
              >
                {grokLoading ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Connecting Leo...
                  </>
                ) : !isFull ? (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Full Tier Required
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Activate Leo's Vision
                  </>
                )}
              </Button>
            ) : (
              <>
                <div className="text-center text-xs text-primary/70 uppercase tracking-widest animate-pulse font-body">
                  Leo is watching — frame every 10s
                </div>
                <Button
                  variant="outline"
                  className="w-full border-primary/30 text-primary/70 hover:bg-primary/10"
                  onClick={stopGrok}
                >
                  <EyeOff className="w-4 h-4 mr-2" /> Pause Leo's Vision
                </Button>
              </>
            )}
            <Button variant="destructive" className="w-full" onClick={handleStop}>
              <Square className="w-4 h-4 mr-2" /> Terminate Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
