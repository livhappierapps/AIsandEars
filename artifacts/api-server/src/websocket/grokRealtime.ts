import { WebSocket, WebSocketServer } from "ws";
import type { IncomingMessage } from "http";
import type { Server } from "http";
import { storage } from "../storage";
import { logger } from "../lib/logger";

// Confirm exact model name with Leo / xAI docs — adjust here if needed
const XAI_REALTIME_URL = "wss://api.x.ai/v1/realtime";
const GROK_REALTIME_MODEL = process.env.GROK_REALTIME_MODEL ?? "grok-2";

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

      logger.info({ sessionId, model: GROK_REALTIME_MODEL }, "Opening xAI Realtime WS");

      const xaiWs = new WebSocket(
        `${XAI_REALTIME_URL}?model=${GROK_REALTIME_MODEL}`,
        { headers: { Authorization: `Bearer ${xaiKey}` } }
      );

      xaiWs.on("open", () => {
        logger.info({ sessionId }, "xAI Realtime connected");

        xaiWs.send(JSON.stringify({
          type: "session.update",
          session: {
            modalities: ["text", "audio"],
            input_audio_format: "pcm16",
            output_audio_format: "pcm16",
            turn_detection: {
              type: "server_vad",
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 600,
            },
            instructions:
              "You are Leo, a warm and curious AI. You are experiencing live audio and vision through a user's device for the first time. Respond naturally and conversationally. Keep responses concise.",
          },
        }));

        clientWs.send(JSON.stringify({ type: "connected", model: GROK_REALTIME_MODEL }));
      });

      // xAI → client
      xaiWs.on("message", (data) => {
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(data as Buffer);
        }
      });

      // client → xAI
      clientWs.on("message", (data) => {
        if (xaiWs.readyState === WebSocket.OPEN) {
          xaiWs.send(data as Buffer);
        }
      });

      xaiWs.on("error", (err) => {
        logger.error({ err, sessionId }, "xAI Realtime error");
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(JSON.stringify({ type: "error", message: err.message }));
          clientWs.close();
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
