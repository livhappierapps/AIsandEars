import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Square, Mic, MicOff, Eye, Camera, Activity, ShieldAlert, RefreshCcw, Radio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatTime } from "@/lib/utils";

interface ConversationFeedProps {
  sessionId: string;
  tier: string;
  expiresAt: string | null;
  onClose: () => void;
}

type Message = {
  id: string;
  role: "leo" | "user" | "system";
  text: string;
  timestamp: Date;
  hasImage?: boolean;
};

const VISION_INTERVAL_MS = 12_000;

export function ConversationFeed({ sessionId, tier, expiresAt, onClose }: ConversationFeedProps) {
  const isFull = tier.includes("full");
  const { toast } = useToast();

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement>(null);
  const audioCanvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const playbackQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const currentTextRef = useRef("");
  const visionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const [micActive, setMicActive] = useState(false);
  const [visionActive, setVisionActive] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [leoSpeaking, setLeoSpeaking] = useState(false);

  const addMessage = useCallback((role: Message["role"], text: string, hasImage = false) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role, text, timestamp: new Date(), hasImage },
    ]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Session timer
  useEffect(() => {
    if (!expiresAt) return;
    const target = new Date(expiresAt).getTime();
    const iv = setInterval(() => {
      const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
      setTimeRemaining(diff);
      if (diff === 0) { clearInterval(iv); handleEnd(); }
    }, 1000);
    return () => clearInterval(iv);
  }, [expiresAt]);

  // Audio visualizer
  useEffect(() => {
    if (!audioCtxRef.current || !micStreamRef.current) return;
    const analyser = audioCtxRef.current.createAnalyser();
    analyser.fftSize = 256;
    const src = audioCtxRef.current.createMediaStreamSource(micStreamRef.current);
    src.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    const canvas = audioCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(data);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barW = canvas.width / data.length * 2.5;
      let x = 0;
      for (let i = 0; i < data.length; i++) {
        const h = (data[i] / 255) * canvas.height;
        const alpha = 0.4 + (data[i] / 255) * 0.6;
        ctx.fillStyle = `hsla(162, 36%, 64%, ${alpha})`;
        ctx.fillRect(x, canvas.height - h, barW - 1, h);
        x += barW;
      }
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [micActive]);

  // Play PCM16 audio from Leo
  const playAudioChunk = useCallback((base64: string) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768;

    const buffer = ctx.createBuffer(1, float32.length, 24000);
    buffer.copyToChannel(float32, 0);
    playbackQueueRef.current.push(buffer);

    if (!isPlayingRef.current) drainPlaybackQueue();
  }, []);

  const drainPlaybackQueue = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx || playbackQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      setLeoSpeaking(false);
      return;
    }
    isPlayingRef.current = true;
    setLeoSpeaking(true);
    const buf = playbackQueueRef.current.shift()!;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.onended = drainPlaybackQueue;
    src.start();
  }, []);

  // Handle messages from xAI
  const handleXaiMessage = useCallback((raw: string) => {
    let evt: any;
    try { evt = JSON.parse(raw); } catch { return; }

    switch (evt.type) {
      case "connected":
        setStatus("connected");
        addMessage("system", "Leo is connected and listening...");
        break;

      case "response.text.delta":
        currentTextRef.current += evt.delta ?? "";
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "leo" && last.id === "streaming") {
            return [...prev.slice(0, -1), { ...last, text: currentTextRef.current }];
          }
          return [...prev, { id: "streaming", role: "leo", text: currentTextRef.current, timestamp: new Date() }];
        });
        break;

      case "response.text.done":
        currentTextRef.current = "";
        setMessages((prev) =>
          prev.map((m) => m.id === "streaming" ? { ...m, id: Date.now().toString() } : m)
        );
        break;

      case "response.audio.delta":
        if (evt.delta) playAudioChunk(evt.delta);
        break;

      case "response.audio.done":
        break;

      case "response.done":
        setLeoSpeaking(false);
        break;

      case "error":
        addMessage("system", `Error: ${evt.message ?? evt.error?.message ?? "Unknown error"}`);
        setStatus("error");
        break;

      default:
        break;
    }
  }, [addMessage, playAudioChunk]);

  // Connect to Leo
  const handleConnect = useCallback(async () => {
    setStatus("connecting");
    addMessage("system", "Requesting microphone access...");

    try {
      // Get media
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { sampleRate: 24000, channelCount: 1, echoCancellation: true, noiseSuppression: true },
        video: isFull ? { facingMode: "user", width: 640, height: 360 } : false,
      });
      mediaStreamRef.current = stream;

      // Setup video preview
      if (videoRef.current && isFull) {
        const videoStream = new MediaStream(stream.getVideoTracks());
        videoRef.current.srcObject = videoStream;
      }

      // Setup audio context + worklet
      const ctx = new AudioContext({ sampleRate: 24000 });
      audioCtxRef.current = ctx;
      await ctx.audioWorklet.addModule(`${import.meta.env.BASE_URL}audio-processor.js`);

      const micStream = new MediaStream(stream.getAudioTracks());
      micStreamRef.current = micStream;
      const micSource = ctx.createMediaStreamSource(micStream);
      const workletNode = new AudioWorkletNode(ctx, "pcm16-processor");
      micSource.connect(workletNode);
      workletNode.connect(ctx.destination);
      workletNodeRef.current = workletNode;

      setMicActive(true);
      addMessage("system", "Microphone active. Connecting to Leo...");

      // Open WebSocket
      const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${proto}//${window.location.host}/api/grok-live?sessionId=${sessionId}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        addMessage("system", "Link established — Leo is waking up...");
      };

      ws.onmessage = (evt) => handleXaiMessage(evt.data);

      ws.onerror = () => {
        setStatus("error");
        addMessage("system", "Connection error — waiting 2 seconds before you can retry...");
        setTimeout(() => {
          setStatus("idle");
          addMessage("system", "Ready to reconnect. Press Connect with Leo.");
        }, 2000);
      };

      ws.onclose = (evt) => {
        if (evt.code !== 1000) {
          addMessage("system", `Connection closed (${evt.code}): ${evt.reason || "unknown reason"}`);
        }
        setStatus("idle");
        setMicActive(false);
      };

      // Stream mic audio
      workletNode.port.onmessage = (e: MessageEvent) => {
        if (ws.readyState !== WebSocket.OPEN) return;
        const int16 = new Int16Array(e.data);
        const bytes = new Uint8Array(int16.buffer);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        const b64 = btoa(binary);
        ws.send(JSON.stringify({ type: "input_audio_buffer.append", audio: b64 }));
      };

    } catch (err: any) {
      setMediaError(err.message);
      setStatus("error");
      addMessage("system", `Setup failed: ${err.message}`);
    }
  }, [sessionId, isFull, addMessage, handleXaiMessage]);

  // Capture & send camera frame to Leo (via REST vision endpoint)
  const shareCamera = useCallback(async () => {
    const video = videoRef.current;
    const canvas = captureCanvasRef.current;
    if (!video || !canvas) return;

    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, 640, 360);
    const imageData = canvas.toDataURL("image/jpeg", 0.75);

    addMessage("user", "📷 Sharing camera view with Leo...", true);

    try {
      const res = await fetch("/api/grok-vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, imageData, prompt: "What do you see right now?", isFirstFrame: false }),
      });
      const data = await res.json();
      if (res.ok) {
        addMessage("leo", data.message);
      } else {
        addMessage("system", `Vision error: ${data.error}`);
      }
    } catch (err: any) {
      addMessage("system", `Vision error: ${err.message}`);
    }
  }, [sessionId, addMessage]);

  // Auto vision
  const toggleVision = useCallback(() => {
    if (visionActive) {
      clearInterval(visionIntervalRef.current!);
      visionIntervalRef.current = null;
      setVisionActive(false);
      addMessage("system", "Auto-vision paused.");
    } else {
      setVisionActive(true);
      addMessage("system", "Auto-vision active — Leo sees a new frame every 12 seconds.");
      shareCamera();
      visionIntervalRef.current = setInterval(shareCamera, VISION_INTERVAL_MS);
    }
  }, [visionActive, shareCamera, addMessage]);

  const handleEnd = useCallback(() => {
    visionIntervalRef.current && clearInterval(visionIntervalRef.current);
    wsRef.current?.close(1000, "Session ended");
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close();
    onClose();
  }, [onClose]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <canvas ref={captureCanvasRef} className="hidden" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3">
        <div>
          <h2 className="text-2xl font-display font-light flex items-center gap-2 text-glow">
            <Radio className="w-5 h-5 text-primary animate-pulse" />
            Conversation with Leo
          </h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant="outline" className="text-xs">{tier.toUpperCase()}</Badge>
            {status === "connected" && (
              <Badge className="bg-primary/20 text-primary border border-primary/40 text-xs">
                <Activity className="w-3 h-3 mr-1 animate-pulse" /> LIVE
              </Badge>
            )}
            {leoSpeaking && (
              <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs animate-pulse">
                Leo is speaking...
              </Badge>
            )}
          </div>
        </div>
        {timeRemaining !== null && (
          <div className="glass-panel px-4 py-2 rounded-xl border-primary/30 flex flex-col items-end">
            <span className="text-xs text-primary/60 uppercase tracking-widest">Session</span>
            <span className={`text-2xl font-mono font-bold ${timeRemaining < 300 ? "text-destructive animate-pulse" : "text-primary text-glow"}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left: Camera + controls */}
        <div className="flex flex-col gap-4">
          {/* Camera preview */}
          <div className="relative aspect-video rounded-xl overflow-hidden glass-panel border border-primary/20 bg-background">
            {mediaError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <ShieldAlert className="w-8 h-8 text-destructive mb-2" />
                <p className="text-destructive text-sm font-bold">Camera Error</p>
                <p className="text-muted-foreground text-xs mt-1">{mediaError}</p>
                <Button variant="outline" size="sm" className="mt-3" onClick={() => window.location.reload()}>
                  <RefreshCcw className="w-3 h-3 mr-1" /> Retry
                </Button>
              </div>
            ) : isFull ? (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Mic className="w-12 h-12 text-primary/30" />
              </div>
            )}

            {/* Camera overlay */}
            {isFull && status === "connected" && (
              <div className="absolute top-2 left-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/70 backdrop-blur text-xs border border-primary/30">
                  <div className={`w-1.5 h-1.5 rounded-full ${visionActive ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
                  <span className={visionActive ? "text-primary font-mono" : "text-muted-foreground font-mono"}>
                    {visionActive ? "LEO WATCHING" : "CAM READY"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Audio bar */}
          <div className="h-16 glass-panel rounded-xl border-primary/20 p-2 overflow-hidden relative">
            <span className="absolute top-1.5 left-2 text-xs text-primary/40 uppercase tracking-widest font-body">Audio</span>
            <canvas ref={audioCanvasRef} className="w-full h-full" width={400} height={60} />
          </div>

          {/* Vision controls */}
          {isFull && status === "connected" && (
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/10 font-body"
                onClick={shareCamera}
              >
                <Camera className="w-4 h-4 mr-2" /> Share This Moment
              </Button>
              <Button
                variant="outline"
                className={`w-full font-body ${visionActive ? "border-destructive/40 text-destructive hover:bg-destructive/10" : "border-primary/30 text-primary/70 hover:bg-primary/10"}`}
                onClick={toggleVision}
              >
                <Eye className="w-4 h-4 mr-2" />
                {visionActive ? "Stop Auto-Vision" : "Start Auto-Vision"}
              </Button>
            </div>
          )}
        </div>

        {/* Right: Conversation */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border-primary/20 flex flex-col" style={{ height: "600px" }}>
          <div className="p-4 border-b border-primary/20 flex items-center justify-between">
            <div>
              <span className="font-body font-medium text-sm tracking-wide text-primary">Leo</span>
              <p className="text-xs text-muted-foreground">Grok Vision + Audio</p>
            </div>
            <div className={`w-2 h-2 rounded-full ${status === "connected" ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                <Radio className="w-10 h-10 mb-3 opacity-30" />
                <p className="font-display font-light text-lg">Ready to connect with Leo</p>
                <p className="text-sm mt-1 opacity-60">Press Connect below to begin</p>
              </div>
            )}
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "system" ? (
                    <p className="text-xs text-muted-foreground/60 font-mono w-full text-center py-1">
                      — {msg.text} —
                    </p>
                  ) : (
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "leo"
                        ? "bg-primary/10 border border-primary/20 text-foreground rounded-tl-sm"
                        : "bg-secondary text-foreground rounded-tr-sm"
                    }`}>
                      {msg.role === "leo" && (
                        <p className="text-xs text-primary font-body font-medium mb-1">Leo</p>
                      )}
                      {msg.text}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Footer controls */}
          <div className="p-4 border-t border-primary/20 bg-background/20 flex flex-col gap-3">
            {status === "idle" || status === "error" ? (
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-wide"
                onClick={handleConnect}
              >
                <Mic className="w-4 h-4 mr-2" />
                Connect with Leo
              </Button>
            ) : status === "connecting" ? (
              <Button disabled className="w-full font-body">
                <Activity className="w-4 h-4 mr-2 animate-spin" /> Connecting...
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Mic className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-xs text-primary font-body">Listening to you...</span>
                </div>
              </div>
            )}
            <Button variant="destructive" className="w-full font-body" onClick={handleEnd}>
              <Square className="w-4 h-4 mr-2" /> End Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
