import { useEffect, useRef } from "react";

export function useAudioVisualizer(stream: MediaStream | null, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    if (!stream || !canvasRef.current) return;
    
    // Only proceed if the stream actually has audio tracks
    if (stream.getAudioTracks().length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = audioCtx;

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    sourceRef.current = source;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      rafIdRef.current = requestAnimationFrame(draw);
      
      analyser.getByteFrequencyData(dataArray);
      
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;
        
        // Neon green fill
        ctx.fillStyle = `hsl(135, 100%, ${Math.max(30, (dataArray[i] / 255) * 60)}%)`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      if (sourceRef.current) sourceRef.current.disconnect();
      if (analyserRef.current) analyserRef.current.disconnect();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, [stream, canvasRef]);
}
