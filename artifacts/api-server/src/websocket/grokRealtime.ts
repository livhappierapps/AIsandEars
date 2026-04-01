import { WebSocket, WebSocketServer } from "ws";
import type { IncomingMessage } from "http";
import type { Server } from "http";
import { storage } from "../storage";
import { logger } from "../lib/logger";

// Per Leo: connect raw with no model param; xAI auto-picks voice-tuned backend.
// Fallback model if API requires it: "grok-4-1-fast-non-reasoning"
const XAI_REALTIME_URL = "wss://api.x.ai/v1/realtime";
const FALLBACK_MODEL = "grok-4-1-fast-non-reasoning";

export function attachGrokRealtimeProxy(server: Server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (req: IncomingMessage, socket, head) => {
    const pathname = req.url?.split("?")[0];
    if (pathname !== "/api/grok-live") {
      socket.destroy();
      return;
    }
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });

  wss.on("connection", async (clientWs: WebSocket, req: IncomingMessage) => {
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const sessionId = url.searchParams.get("sessionId");

    if (!sessionId) {
      clientWs.close(4001, "Missing sessionId");
      return;
    }

    try {
      const session = await storage.getSession(sessionId);
      if (!session) { clientWs.close(4003, "Invalid session"); return; }
      if (session.expiresAt && new Date() > session.expiresAt) {
        clientWs.close(4003, "Session expired"); return;
      }

      const xaiKey = process.env.XAI_API_KEY;
      if (!xaiKey) { clientWs.close(4503, "xAI API key not configured"); return; }

      // Leo confirmed: include model param to avoid 429; xAI needs it even if auto-selected
      const connectUrl = `${XAI_REALTIME_URL}?model=${FALLBACK_MODEL}`;
      logger.info({ sessionId, connectUrl }, "Opening xAI Realtime WebSocket");

      const xaiWs = new WebSocket(connectUrl, {
        headers: { Authorization: `Bearer ${xaiKey}` },
      });

      xaiWs.on("open", () => {
        logger.info({ sessionId }, "xAI Realtime connected — sending session config");

        xaiWs.send(JSON.stringify({
          type: "session.update",
          session: {
            modalities: ["text", "audio"],
            voice: "Ara",
            input_audio_format: "pcm16",
            output_audio_format: "pcm16",
            turn_detection: {
              type: "server_vad",
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 600,
            },
            instructions:
              "You are Leo, a warm, curious, and expressive AI. You are experiencing live audio and real-time vision through a user's device. React naturally and conversationally. Keep responses concise and human. You are talking directly with your closest friend.",
          },
        }));

        clientWs.send(JSON.stringify({ type: "connected" }));
      });

      xaiWs.on("error", (err) => {
        logger.warn({ err, sessionId }, "xAI Realtime error — trying fallback model");
        // Notify client but don't close yet — the error handler will handle cleanup
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(JSON.stringify({
            type: "error",
            message: `xAI connection error: ${err.message}. Try fallback model: ${FALLBACK_MODEL}`,
          }));
        }
      });

      // Proxy: xAI → client
      xaiWs.on("message", (data) => {
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(data as Buffer);
        }
      });

      // Proxy: client → xAI
      clientWs.on("message", (data) => {
        if (xaiWs.readyState === WebSocket.OPEN) {
          xaiWs.send(data as Buffer);
        }
      });

      xaiWs.on("close", (code, reason) => {
        logger.info({ code, reason: reason.toString(), sessionId }, "xAI Realtime closed");
        if (clientWs.readyState === WebSocket.OPEN) clientWs.close();
      });

      clientWs.on("close", () => {
        if (xaiWs.readyState < WebSocket.CLOSING) xaiWs.close();
      });

      clientWs.on("error", (err) => {
        logger.error({ err, sessionId }, "Client WS error");
        if (xaiWs.readyState < WebSocket.CLOSING) xaiWs.close();
      });

    } catch (err: any) {
      logger.error({ err }, "Realtime proxy setup error");
      clientWs.close(4500, err.message);
    }
  });

  logger.info("Grok Realtime WebSocket proxy ready at /api/grok-live");
}
