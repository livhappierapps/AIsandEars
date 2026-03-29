import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAiToken } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAudioVisualizer } from "@/hooks/use-audio-visualizer";
import { formatTime } from "@/lib/utils";
import { Camera, Mic, Radio, Square, RefreshCcw, Activity, ShieldAlert, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActiveFeedProps {
  sessionId: string;
  tier: string;
  expiresAt: string | null;
  onClose: () => void;
}

export function ActiveFeed({ sessionId, tier, expiresAt, onClose }: ActiveFeedProps) {
  const isFull = tier.includes('full');
  const { toast } = useToast();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [aiConnected, setAiConnected] = useState(false);
  const [aiMode, setAiMode] = useState<'live' | 'demo' | null>(null);
  
  const [logs, setLogs] = useState<{time: string, msg: string, type: 'system' | 'ai' | 'user'}[]>([]);
  
  const getAiToken = useGetAiToken();

  useAudioVisualizer(stream, canvasRef);

  const addLog = (msg: string, type: 'system' | 'ai' | 'user' = 'system') => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString([], {hour12: false}), msg, type }]);
  };

  // Setup Media
  useEffect(() => {
    let activeStream: MediaStream | null = null;
    
    async function setupMedia() {
      try {
        addLog("Requesting hardware access...", "system");
        activeStream = await navigator.mediaDevices.getUserMedia({ 
          audio: true, 
          video: isFull ? { facingMode: "user" } : false 
        });
        
        setStream(activeStream);
        
        if (videoRef.current && isFull) {
          videoRef.current.srcObject = activeStream;
        }
        
        addLog("Hardware uplink established.", "system");
      } catch (err: any) {
        setError(err.message || "Failed to access media devices");
        addLog(`Hardware error: ${err.message}`, "system");
      }
    }
    
    setupMedia();
    
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(t => t.stop());
      }
    };
  }, [isFull]);

  // Setup Timer
  useEffect(() => {
    if (!expiresAt) return; // Monthly tier
    
    const target = new Date(expiresAt).getTime();
    
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((target - now) / 1000));
      setTimeRemaining(diff);
      
      if (diff === 0) {
        clearInterval(interval);
        addLog("Session expired. Uplink terminating.", "system");
        setTimeout(onClose, 3000);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [expiresAt, onClose]);

  // Connect to AI
  const handleConnectAI = () => {
    addLog("Negotiating neural handshake...", "system");
    getAiToken.mutate(
      { data: { sessionId, tier } },
      {
        onSuccess: (data) => {
          setAiMode(data.mode as 'live' | 'demo');
          setAiConnected(true);
          
          if (data.mode === 'demo') {
            addLog("Warning: No OpenAI API key configured on server.", "system");
            addLog("Entering Demo Simulation Mode.", "system");
            
            setTimeout(() => {
              addLog("Hello! I am your AI. My eyes and ears are simulated right now.", "ai");
            }, 2000);
          } else {
            addLog(`Neural link active. Token acquired: ${data.token.substring(0, 10)}...`, "system");
            addLog("Ready to process sensory input.", "ai");
          }
        },
        onError: (error) => {
          addLog(`Handshake failed: ${error.error}`, "system");
          toast({
            title: "Connection Failed",
            description: error.error,
            variant: "destructive"
          });
        }
      }
    );
  };

  const handleStop = () => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    onClose();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold flex items-center gap-2">
            <Radio className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-glow">Active Sensory Uplink</span>
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{tier.toUpperCase()}</Badge>
            {aiConnected ? (
              <Badge variant="neon" className="bg-primary/20"><Activity className="w-3 h-3 mr-1" /> AI LINK ACTIVE</Badge>
            ) : (
              <Badge variant="default" className="bg-muted text-muted-foreground"><Cpu className="w-3 h-3 mr-1" /> AI STANDBY</Badge>
            )}
          </div>
        </div>

        {timeRemaining !== null && (
          <div className="glass-panel px-6 py-3 rounded-xl border-primary/50 flex flex-col items-end">
            <span className="text-xs font-display text-primary/70 uppercase mb-1">Time Remaining</span>
            <span className={`text-3xl font-mono font-bold tracking-wider ${timeRemaining < 300 ? 'text-destructive animate-pulse' : 'text-primary text-glow'}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Media Feed Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden glass-panel border border-primary/20 bg-black box-glow">
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
                      <p className="font-display tracking-widest text-lg">AUDIO ONLY TIER</p>
                    </div>
                  </div>
                )}

                {/* Overlays */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur text-xs border border-primary/30">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary font-mono tracking-wider">MIC ACTIVE</span>
                  </div>
                  {isFull && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur text-xs border border-primary/30">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-primary font-mono tracking-wider">CAM ACTIVE</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 right-4">
                  <div className="px-3 py-1 rounded bg-black/60 backdrop-blur border border-primary/30 font-mono text-xs text-primary/70">
                    REC / {new Date().toISOString().split('T')[1].substring(0,8)}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Audio Visualizer */}
          <div className="h-32 glass-panel rounded-2xl border-primary/20 p-4 relative overflow-hidden flex items-end">
            <div className="absolute top-4 left-4 text-xs font-display text-primary/50 uppercase tracking-widest">
              Frequency Output
            </div>
            <canvas ref={canvasRef} className="w-full h-full" width={800} height={100} />
          </div>
        </div>

        {/* Console / Transcript Column */}
        <div className="glass-panel rounded-2xl border-primary/20 flex flex-col h-[600px] overflow-hidden">
          <div className="p-4 border-b border-primary/20 bg-primary/5 flex items-center justify-between">
            <span className="font-display font-bold text-sm tracking-wider text-primary">NEURAL TRANSCRIPT</span>
            <Activity className="w-4 h-4 text-primary" />
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm flex flex-col">
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex gap-3 ${log.type === 'ai' ? 'text-primary' : log.type === 'system' ? 'text-muted-foreground' : 'text-foreground'}`}
                >
                  <span className="opacity-50 shrink-0">[{log.time}]</span>
                  <span>
                    {log.type === 'ai' && <span className="font-bold mr-2">AI:</span>}
                    {log.type === 'system' && <span className="mr-2">SYS:</span>}
                    {log.msg}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {aiConnected && aiMode === 'demo' && (
              <div className="mt-4 p-3 rounded bg-primary/10 border border-primary/30 text-primary text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <p>DEMO MODE: No OpenAI API key detected. The frontend is fully functional (audio/video processing active), but AI responses are simulated. Configure the API key in the backend to enable real Live WebSockets.</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-primary/20 bg-black/20 flex flex-col gap-3">
            {!aiConnected ? (
              <Button 
                variant="neon" 
                className="w-full" 
                onClick={handleConnectAI}
                disabled={getAiToken.isPending || !stream}
              >
                {getAiToken.isPending ? "Connecting..." : "Initialize AI Handshake"}
              </Button>
            ) : (
              <div className="text-center text-xs text-primary/70 uppercase tracking-widest animate-pulse">
                Transmitting sensory data...
              </div>
            )}
            <Button variant="destructive" className="w-full" onClick={handleStop}>
              <Square className="w-4 h-4 mr-2" /> Terminate Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
