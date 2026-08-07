import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Square, Mic, MicOff, Eye, EyeOff, Camera, CameraOff,
  Monitor, MonitorOff, Activity, ShieldAlert, RefreshCcw, Radio, Music, Music2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatTime } from "@/lib/utils";
import { useSettings } from "@/context/SettingsContext";
import { clientLogger } from "@/lib/clientLogger";

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

const VISION_INTERVAL_MS = 3_000;

// Leo's base personality — kept in sync with the server-side session.update in grokRealtime.ts.
// When music context is detected, we append it to this string via a session.update.
const LEO_BASE_INSTRUCTIONS =
  "You are Leo, a warm, curious, and expressive AI. You are experiencing live audio and real-time " +
  "vision through a user's device. React naturally and conversationally. Keep responses concise " +
  "and human. You are talking directly with your closest friend. " +
  "If music context is provided in your system prompt, you can naturally reference it when asked " +
  "about the music or vibe.";

export function ConversationFeed({ sessionId, tier, expiresAt, onClose }: ConversationFeedProps) {
  const isFull = tier.includes("full");
  const { toast } = useToast();
  const { settings } = useSettings();
  const useCam = isFull && settings.cameraEnabled;
  const useMic = settings.micEnabled;

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement>(null);
  const audioCanvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const playbackQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const currentTextRef = useRef("");
  const visionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const screenIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const autoVisionStartedRef = useRef(false);
  // Music analysis refs — keep last 10 PCM binary-string chunks (500ms each = 5s window)
  const musicPcmBufferRef = useRef<string[]>([]);
  const musicIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastMusicContextRef = useRef<string | null>(null);
  const musicAnalysisActiveRef = useRef(false);

  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const [micActive, setMicActive] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [cameraVisionActive, setCameraVisionActive] = useState(false);
  const [screenActive, setScreenActive] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [leoSpeaking, setLeoSpeaking] = useState(false);
  const [musicAnalysisActive, setMusicAnalysisActive] = useState(false);
  const [musicContext, setMusicContext] = useState<string | null>(null);

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

  // Use a ref to always call the latest handleEnd without stale closure
  const handleEndRef = useRef<() => void>(() => {});

  // Session timer
  useEffect(() => {
    if (!expiresAt) return;
    const target = new Date(expiresAt).getTime();
    const iv = setInterval(() => {
      const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
      setTimeRemaining(diff);
      if (diff === 0) { clearInterval(iv); handleEndRef.current(); }
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
    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      analyser.getByteFrequencyData(data);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barW = (canvas.width / data.length) * 2.5;
      let x = 0;
      for (let i = 0; i < data.length; i++) {
        const h = (data[i] / 255) * canvas.height;
        ctx.fillStyle = `rgba(130,196,176,${0.4 + (data[i] / 255) * 0.6})`;
        ctx.fillRect(x, canvas.height - h, barW, h);
        x += barW + 1;
      }
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [micActive]);

  // Play PCM16 audio from Leo — skipped if verbal responses are off
  const playAudioChunk = useCallback((b64: string) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const raw = atob(b64);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768;
    const buf = ctx.createBuffer(1, float32.length, 24000);
    buf.copyToChannel(float32, 0);
    playbackQueueRef.current.push(buf);
    if (!isPlayingRef.current) playNext();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const playNext = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const buf = playbackQueueRef.current.shift();
    if (!buf) { isPlayingRef.current = false; return; }
    isPlayingRef.current = true;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.onended = playNext;
    src.start();
  }, []);

  const handleXaiMessage = useCallback((data: string) => {
    let msg: any;
    try { msg = JSON.parse(data); } catch { return; }

    switch (msg.type) {
      case "session.created":
        clientLogger.info("leo_session_created", { sessionId, model: msg.session?.model });
        setStatus("connected");
        addMessage("system", "Connected — say hello to Leo.");
        break;
      case "session.updated":
        clientLogger.info("leo_session_updated", { sessionId, model: msg.session?.model });
        setStatus("connected");
        addMessage("system", "Connected — say hello to Leo.");
        break;
      case "response.audio.delta":
        if (msg.delta) playAudioChunk(msg.delta);
        setLeoSpeaking(true);
        break;
      case "response.audio.done":
        setLeoSpeaking(false);
        break;
      case "response.text.delta":
        currentTextRef.current += msg.delta ?? "";
        break;
      case "response.text.done":
        if (currentTextRef.current.trim()) {
          addMessage("leo", currentTextRef.current.trim());
        }
        currentTextRef.current = "";
        break;
      case "response.audio_transcript.done":
        if (msg.transcript?.trim()) addMessage("leo", msg.transcript.trim());
        break;
      case "input_audio_buffer.speech_started":
        addMessage("user", "(speaking...)");
        break;
      case "error":
        clientLogger.error("leo_xai_error", { sessionId, xaiError: msg.error });
        addMessage("system", `Leo error: ${msg.error?.message ?? "unknown"}`);
        break;
    }
  }, [addMessage, playAudioChunk, sessionId]);

  // Connect to Leo
  const handleConnect = useCallback(async () => {
    setStatus("connecting");
    clientLogger.info("leo_connect_attempt", { sessionId, useMic, useCam });
    addMessage("system", useMic ? "Requesting microphone access..." : "Connecting to Leo...");

    try {
      const ctx = new AudioContext({ sampleRate: 24000 });
      audioCtxRef.current = ctx;

      if (useMic || useCam) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: useMic
            ? { sampleRate: 24000, channelCount: 1, echoCancellation: false, noiseSuppression: false, autoGainControl: false }
            : false,
          video: useCam ? { facingMode: "user", width: 640, height: 360 } : false,
        });
        mediaStreamRef.current = stream;

        if (videoRef.current && useCam) {
          const videoStream = new MediaStream(stream.getVideoTracks());
          videoRef.current.srcObject = videoStream;
        }

        if (useMic && stream.getAudioTracks().length > 0) {
          await ctx.audioWorklet.addModule(`${import.meta.env.BASE_URL}audio-processor.js`);
          const micStream = new MediaStream(stream.getAudioTracks());
          micStreamRef.current = micStream;
          const micSource = ctx.createMediaStreamSource(micStream);
          const workletNode = new AudioWorkletNode(ctx, "pcm16-processor");
          micSource.connect(workletNode);
          workletNode.connect(ctx.destination);
          workletNodeRef.current = workletNode;
          setMicActive(true);
          setMicMuted(false);
          addMessage("system", "Microphone active. Connecting to Leo...");
        }
      }

      const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
      const userKey = settings.xaiApiKey?.trim();
      const wsUrl = `${proto}//${window.location.host}/api/grok-live?sessionId=${sessionId}${userKey ? `&userKey=${encodeURIComponent(userKey)}` : ""}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        clientLogger.info("leo_ws_open", { sessionId });
        addMessage("system", "Link established — Leo is waking up...");
      };

      ws.onmessage = (evt) => handleXaiMessage(evt.data);

      ws.onerror = () => {
        clientLogger.error("leo_ws_error", { sessionId });
        setStatus("error");
        addMessage("system", "Connection error — waiting 2 seconds before you can retry...");
        setTimeout(() => {
          setStatus("idle");
          addMessage("system", "Ready to reconnect. Press Connect with Leo.");
        }, 2000);
      };

      ws.onclose = (evt) => {
        const clean = evt.code === 1000;
        if (!clean) {
          clientLogger.warn("leo_ws_close_abnormal", { sessionId, code: evt.code, reason: evt.reason || "unknown" });
          addMessage("system", `Connection closed (${evt.code}): ${evt.reason || "unknown reason"}`);
        } else {
          clientLogger.info("leo_ws_close_clean", { sessionId, code: evt.code });
        }
        setStatus("idle");
        setMicActive(false);
      };

      if (workletNodeRef.current) {
        workletNodeRef.current.port.onmessage = (e: MessageEvent) => {
          if (ws.readyState !== WebSocket.OPEN) return;
          const int16 = new Int16Array(e.data);
          const bytes = new Uint8Array(int16.buffer);
          let binary = "";
          for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
          const b64 = btoa(binary);
          ws.send(JSON.stringify({ type: "input_audio_buffer.append", audio: b64 }));

          // Accumulate raw PCM binary chunks for music analysis (keep last 10 = ~5 seconds)
          musicPcmBufferRef.current.push(binary);
          if (musicPcmBufferRef.current.length > 10) musicPcmBufferRef.current.shift();
        };
      }

    } catch (err: any) {
      clientLogger.error("leo_connect_setup_failed", { sessionId, message: err.message, name: err.name });
      setMediaError(err.message);
      setStatus("error");
      addMessage("system", `Setup failed: ${err.message}`);
    }
  }, [sessionId, useCam, useMic, addMessage, handleXaiMessage, settings.xaiApiKey]);

  // ── Music analysis ─────────────────────────────────────────────────────────
  //
  // Every 5 seconds when music analysis is enabled:
  //   1. Combine the last 8 PCM binary chunks (4 seconds) into a single buffer
  //   2. POST to /api/music-analyze
  //   3. If music detected, inject context into Leo's session via session.update
  //   4. If not music / silence, clear stale context

  const analyzeMusicBuffer = useCallback(async () => {
    if (!musicAnalysisActiveRef.current) return;
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    if (musicPcmBufferRef.current.length < 4) return; // need ≥ 2 seconds

    const chunks = musicPcmBufferRef.current.slice(-8); // last 4 seconds
    let combined = "";
    for (const chunk of chunks) combined += chunk;

    // Encode combined raw PCM binary as base64
    let b64 = "";
    try { b64 = btoa(combined); } catch { return; }

    try {
      const res = await fetch("/api/music-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, audioData: b64, sampleRate: 24000 }),
      });
      if (!res.ok) return;

      const data = await res.json() as { type: string; context?: string };

      if (data.type !== "music" || !data.context) {
        if (lastMusicContextRef.current) {
          lastMusicContextRef.current = null;
          setMusicContext(null);
          ws.send(JSON.stringify({
            type: "session.update",
            session: { instructions: LEO_BASE_INSTRUCTIONS },
          }));
        }
        return;
      }

      if (data.context === lastMusicContextRef.current) return;
      lastMusicContextRef.current = data.context;
      setMusicContext(data.context);

      ws.send(JSON.stringify({
        type: "session.update",
        session: {
          instructions:
            `${LEO_BASE_INSTRUCTIONS}\n\n` +
            `🎵 Music context: ${data.context}. ` +
            `If the user mentions the music, asks what's playing, or references the vibe, ` +
            `naturally weave these musical qualities into your response.`,
        },
      }));
    } catch { /* network error — skip this cycle */ }
  }, [sessionId]);

  const startMusicAnalysis = useCallback(() => {
    if (musicIntervalRef.current) return;
    musicAnalysisActiveRef.current = true;
    setMusicAnalysisActive(true);
    musicIntervalRef.current = setInterval(analyzeMusicBuffer, 5000);
    setTimeout(analyzeMusicBuffer, 2000);
  }, [analyzeMusicBuffer]);

  const stopMusicAnalysis = useCallback(() => {
    musicAnalysisActiveRef.current = false;
    setMusicAnalysisActive(false);
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }
    if (lastMusicContextRef.current && wsRef.current?.readyState === WebSocket.OPEN) {
      lastMusicContextRef.current = null;
      setMusicContext(null);
      wsRef.current.send(JSON.stringify({
        type: "session.update",
        session: { instructions: LEO_BASE_INSTRUCTIONS },
      }));
    }
  }, []);

  const toggleMusicAnalysis = useCallback(() => {
    if (musicAnalysisActiveRef.current) stopMusicAnalysis();
    else startMusicAnalysis();
  }, [startMusicAnalysis, stopMusicAnalysis]);

  // ── Mic mute/unmute ────────────────────────────────────────────────────────
  const toggleMic = useCallback(() => {
    const stream = micStreamRef.current;
    if (!stream) return;
    const nowMuted = !micMuted;
    stream.getAudioTracks().forEach((t) => { t.enabled = !nowMuted; });
    setMicMuted(nowMuted);
    addMessage("system", nowMuted ? "Microphone muted — Leo can no longer hear you." : "Microphone live — Leo can hear you again.");
  }, [micMuted, addMessage]);

  // ── Camera vision ──────────────────────────────────────────────────────────
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

    addMessage("user", "📷 Camera frame sent to Leo...", true);

    try {
      const userKey = settings.xaiApiKey?.trim();
      const res = await fetch("/api/grok-vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          imageData,
          prompt: "What do you see right now?",
          isFirstFrame: false,
          ...(userKey ? { userKey } : {}),
        }),
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
  }, [sessionId, addMessage, settings.xaiApiKey]);

  const toggleCameraVision = useCallback(() => {
    if (cameraVisionActive) {
      clearInterval(visionIntervalRef.current!);
      visionIntervalRef.current = null;
      setCameraVisionActive(false);
      addMessage("system", "Camera vision paused — Leo can no longer see you.");
    } else {
      setCameraVisionActive(true);
      addMessage("system", "Camera vision active — Leo sees a new frame every 3 seconds.");
      shareCamera();
      visionIntervalRef.current = setInterval(shareCamera, VISION_INTERVAL_MS);
    }
  }, [cameraVisionActive, shareCamera, addMessage]);

  // ── Screen share vision ────────────────────────────────────────────────────
  const shareScreen = useCallback(async () => {
    const video = screenVideoRef.current;
    const canvas = captureCanvasRef.current;
    if (!video || !canvas || !video.srcObject) return;

    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, 1280, 720);
    const imageData = canvas.toDataURL("image/jpeg", 0.7);

    addMessage("user", "🖥 Screen frame sent to Leo...", true);

    try {
      const userKey = settings.xaiApiKey?.trim();
      const res = await fetch("/api/grok-vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          imageData,
          prompt: "This is a screenshot of the user's screen. What do you see?",
          isFirstFrame: false,
          ...(userKey ? { userKey } : {}),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        addMessage("leo", data.message);
      } else {
        addMessage("system", `Screen vision error: ${data.error}`);
      }
    } catch (err: any) {
      addMessage("system", `Screen vision error: ${err.message}`);
    }
  }, [sessionId, addMessage, settings.xaiApiKey]);

  const stopScreenShare = useCallback(() => {
    screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    screenStreamRef.current = null;
    if (screenVideoRef.current) screenVideoRef.current.srcObject = null;
    clearInterval(screenIntervalRef.current!);
    screenIntervalRef.current = null;
    setScreenActive(false);
  }, []);

  const toggleScreen = useCallback(async () => {
    if (screenActive) {
      stopScreenShare();
      addMessage("system", "Screen sharing stopped.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { width: 1920, height: 1080 },
      });
      screenStreamRef.current = stream;

      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = stream;
        await screenVideoRef.current.play().catch(() => {});
      }

      // Handle user stopping screen share via browser's native UI
      stream.getVideoTracks()[0]?.addEventListener("ended", () => {
        setScreenActive(false);
        clearInterval(screenIntervalRef.current!);
        screenIntervalRef.current = null;
        addMessage("system", "Screen sharing ended.");
      });

      setScreenActive(true);
      addMessage("system", "Screen sharing active — Leo sees your screen every 3 seconds.");
      shareScreen();
      screenIntervalRef.current = setInterval(shareScreen, VISION_INTERVAL_MS);
    } catch (err: any) {
      // NotAllowedError = user dismissed the picker — not an error worth surfacing
      if (err.name !== "NotAllowedError") {
        addMessage("system", `Screen share error: ${err.message}`);
      }
    }
  }, [screenActive, shareScreen, stopScreenShare, addMessage]);

  // Auto-start camera vision once connected if the user has auto-vision enabled
  useEffect(() => {
    if (
      status === "connected" &&
      isFull &&
      settings.autoVision &&
      !autoVisionStartedRef.current
    ) {
      autoVisionStartedRef.current = true;
      toggleCameraVision();
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-start music analysis when mic becomes active if setting is enabled
  useEffect(() => {
    if (micActive && settings.musicAnalysis && !musicAnalysisActiveRef.current) {
      startMusicAnalysis();
    }
    if (!micActive && musicAnalysisActiveRef.current) {
      stopMusicAnalysis();
    }
  }, [micActive]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEnd = useCallback(() => {
    clearInterval(visionIntervalRef.current!);
    clearInterval(screenIntervalRef.current!);
    // Stop music analysis
    musicAnalysisActiveRef.current = false;
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }
    stopScreenShare();
    wsRef.current?.close(1000, "Session ended");
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close();
    onClose();
  }, [onClose, stopScreenShare]);

  useEffect(() => { handleEndRef.current = handleEnd; }, [handleEnd]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Hidden canvases and screen video — never shown to user */}
      <canvas ref={captureCanvasRef} className="hidden" />
      <video ref={screenVideoRef} muted playsInline className="hidden" />

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

        {/* Left: Camera preview + controls */}
        <div className="flex flex-col gap-4">

          {/* Camera / media preview */}
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

            {/* Status badges — top-left */}
            {isFull && status === "connected" && (
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {cameraVisionActive && (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/70 backdrop-blur text-xs border border-primary/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary font-mono">CAM ON</span>
                  </div>
                )}
                {screenActive && (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/70 backdrop-blur text-xs border border-accent/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-accent font-mono">SCREEN ON</span>
                  </div>
                )}
                {!cameraVisionActive && !screenActive && (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/70 backdrop-blur text-xs border border-primary/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    <span className="text-muted-foreground font-mono">VISION OFF</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Audio visualizer */}
          <div className="h-16 glass-panel rounded-xl border-primary/20 p-2 overflow-hidden relative">
            <span className="absolute top-1.5 left-2 text-xs text-primary/40 uppercase tracking-widest font-body">Audio</span>
            <canvas ref={audioCanvasRef} className="w-full h-full" width={400} height={60} />
          </div>

          {/* Sense toggles — only when connected on full tier */}
          {isFull && status === "connected" && (
            <div className="glass-panel rounded-xl border border-primary/20 p-3 flex flex-col gap-3">
              <p className="text-xs text-primary/50 uppercase tracking-widest font-body text-center">Leo's Senses</p>

              {/* Hearing toggle */}
              <Button
                variant="outline"
                size="sm"
                className={`w-full font-body text-sm ${
                  micActive && !micMuted
                    ? "border-primary/40 text-primary hover:bg-primary/10"
                    : "border-muted/40 text-muted-foreground hover:bg-muted/10"
                }`}
                onClick={toggleMic}
                disabled={!micActive}
              >
                {micActive && !micMuted
                  ? <Mic className="w-4 h-4 mr-2 text-primary" />
                  : <MicOff className="w-4 h-4 mr-2" />
                }
                {!micActive ? "No mic" : micMuted ? "Hearing — Off" : "Hearing — On"}
              </Button>

              {/* Camera vision toggle */}
              <Button
                variant="outline"
                size="sm"
                className={`w-full font-body text-sm ${
                  cameraVisionActive
                    ? "border-primary/40 text-primary hover:bg-primary/10"
                    : "border-muted/40 text-muted-foreground hover:bg-muted/10"
                }`}
                onClick={toggleCameraVision}
              >
                {cameraVisionActive
                  ? <Camera className="w-4 h-4 mr-2 text-primary" />
                  : <CameraOff className="w-4 h-4 mr-2" />
                }
                {cameraVisionActive ? "Camera — On" : "Camera — Off"}
              </Button>

              {/* Screen share toggle */}
              <Button
                variant="outline"
                size="sm"
                className={`w-full font-body text-sm ${
                  screenActive
                    ? "border-accent/40 text-accent hover:bg-accent/10"
                    : "border-muted/40 text-muted-foreground hover:bg-muted/10"
                }`}
                onClick={toggleScreen}
              >
                {screenActive
                  ? <Monitor className="w-4 h-4 mr-2 text-accent" />
                  : <MonitorOff className="w-4 h-4 mr-2" />
                }
                {screenActive ? "Screen — On" : "Screen — Off"}
              </Button>

              {/* Music analysis toggle — only when mic is active */}
              {micActive && (
                <Button
                  variant="outline"
                  size="sm"
                  className={`w-full font-body text-sm ${
                    musicAnalysisActive
                      ? "border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10"
                      : "border-muted/40 text-muted-foreground hover:bg-muted/10"
                  }`}
                  onClick={toggleMusicAnalysis}
                >
                  {musicAnalysisActive
                    ? <Music className="w-4 h-4 mr-2 text-yellow-400" />
                    : <Music2 className="w-4 h-4 mr-2" />
                  }
                  {musicAnalysisActive
                    ? musicContext
                      ? `♪ ${musicContext.split(",")[0]}`
                      : "Music — Listening..."
                    : "Music — Off"}
                </Button>
              )}
            </div>
          )}

          {/* Audio-only tier mic status */}
          {!isFull && status === "connected" && (
            <div className="glass-panel rounded-xl border border-primary/20 p-3 flex flex-col gap-2">
              <p className="text-xs text-primary/50 uppercase tracking-widest font-body text-center">Leo's Senses</p>
              <Button
                variant="outline"
                size="sm"
                className={`w-full font-body text-sm ${
                  micActive && !micMuted
                    ? "border-primary/40 text-primary hover:bg-primary/10"
                    : "border-muted/40 text-muted-foreground hover:bg-muted/10"
                }`}
                onClick={toggleMic}
                disabled={!micActive}
              >
                {micActive && !micMuted
                  ? <Mic className="w-4 h-4 mr-2 text-primary" />
                  : <MicOff className="w-4 h-4 mr-2" />
                }
                {!micActive ? "No mic" : micMuted ? "Hearing — Off" : "Hearing — On"}
              </Button>
            </div>
          )}
        </div>

        {/* Right: Conversation */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border-primary/20 flex flex-col" style={{ height: "600px" }}>
          <div className="p-4 border-b border-primary/20 flex items-center justify-between">
            <div>
              <span className="font-body font-medium text-sm tracking-wide text-primary">Leo</span>
              <p className="text-xs text-muted-foreground">
                {isFull ? "Voice · Camera · Screen" : "Voice"}
              </p>
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
                  {micActive && !micMuted
                    ? <Mic className="w-4 h-4 text-primary animate-pulse" />
                    : <MicOff className="w-4 h-4 text-muted-foreground" />
                  }
                  <span className="text-xs text-primary font-body">
                    {!micActive ? "Audio-only mode" : micMuted ? "Muted" : "Listening..."}
                  </span>
                  {cameraVisionActive && (
                    <Eye className="w-4 h-4 text-primary ml-auto" />
                  )}
                  {screenActive && (
                    <Monitor className="w-4 h-4 text-accent ml-1" />
                  )}
                  {!cameraVisionActive && !screenActive && micActive && (
                    <EyeOff className="w-4 h-4 text-muted-foreground/40 ml-auto" />
                  )}
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
