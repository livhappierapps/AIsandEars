/**
 * grokRealtime.ts — WebSocket proxy: browser ↔ xAI Voice Agent API
 *
 * HOW IT WORKS (for devs reading this):
 *
 * The xAI Realtime API is a persistent WebSocket connection, not a REST call.
 * We cannot open it from the browser directly — the API key would be exposed.
 * Instead, this server acts as a transparent bidirectional proxy:
 *
 *   Browser ──ws──▶ /api/grok-live (this file) ──ws──▶ wss://api.x.ai/v1/realtime
 *
 * Message flow (each direction just passes raw bytes through unchanged):
 *   - Browser sends PCM16 audio chunks as base64 JSON events
 *   - xAI sends back transcribed text deltas and PCM16 audio response chunks
 *   - We add one extra step on open: send a session.update to configure Leo's
 *     voice, personality, and VAD (voice activity detection) settings
 *
 * Why server_vad?
 *   xAI's server-side VAD means xAI itself decides when the user has stopped
 *   speaking and generates a response — no need for us to manage turn detection.
 *
 * BYOK (Bring Your Own Key):
 *   If the client passes ?userKey=<xai_api_key> in the WS URL, we use that
 *   instead of our server-side XAI_API_KEY. The user's key never touches our DB —
 *   it only lives in this connection's scope, and the user's payment still validates
 *   the session. This lets power users bypass xAI's per-account rate limits.
 */

import { WebSocket, WebSocketServer } from "ws";
import type { IncomingMessage } from "http";
import type { Server } from "http";
import { storage } from "../storage";
import { logger } from "../lib/logger";
import {
  defaultAudioConfig,
  handleClientFrame,
  translateUpstreamFrame,
} from "./realtimeProtocol";

// xAI Realtime API endpoint — model is passed as a query param
const XAI_REALTIME_URL = "wss://api.x.ai/v1/realtime";

// The voice model. "grok-voice-latest" tracks xAI's current speech-to-speech
// model (grok-voice-3.0 as of Nov 2026). Override with XAI_VOICE_MODEL to pin.
// Do NOT substitute a text model like grok-4 here — it will reject the WS upgrade.
const VOICE_MODEL = process.env.XAI_VOICE_MODEL || "grok-voice-latest";
// Lowercase voice id (ara, eve, leo, rex, sal). Override with XAI_VOICE.
const VOICE = (process.env.XAI_VOICE || "ara").toLowerCase();
// Cap on client frames buffered while the upstream xAI socket is still opening.
const MAX_PENDING_FRAMES = 200;

export function attachGrokRealtimeProxy(server: Server) {
  // noServer: true means we handle the HTTP→WS upgrade ourselves (below),
  // which lets us share the same HTTP server with Express routes.
  const wss = new WebSocketServer({ noServer: true, maxPayload: 1_048_576 });

  // Intercept HTTP upgrade requests and hand off only our path to this WSS.
  // Any other upgrade path (e.g. Vite HMR) gets its socket destroyed cleanly.
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
    // Capture frames that arrive while we validate the session (async DB
    // lookup) — without this the client's first session.update is lost.
    let bufferedBytes = 0;
    const MAX_BUFFER_BYTES = 2_097_152;
    const earlyFrames: { data: unknown; isBinary: boolean }[] = [];
    const captureEarly = (data: unknown, isBinary: boolean) => {
      const size = Buffer.byteLength(String(data));
      if (
        earlyFrames.length >= MAX_PENDING_FRAMES ||
        bufferedBytes + size > MAX_BUFFER_BYTES
      ) {
        clientWs.close(1009, "Too much pending audio");
        return;
      }
      bufferedBytes += size;
      earlyFrames.push({ data, isBinary });
    };
    clientWs.on("message", captureEarly);

    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const sessionId = url.searchParams.get("sessionId");

    // BYOK: client may pass their own xAI API key as a query param.
    // We validate it's non-empty but never log or store it.
    const userProvidedKey = url.searchParams.get("userKey") ?? "";

    logger.info(
      { sessionId: sessionId ?? "(none)", usingUserKey: !!userProvidedKey },
      "Leo session connect",
    );

    if (!sessionId) {
      logger.warn(
        { event: "leo_connect_rejected", reason: "missing_session_id" },
        "Leo connect rejected: missing sessionId",
      );
      clientWs.close(4001, "Missing sessionId");
      return;
    }

    try {
      // Gate every connection behind a paid session row in our DB.
      // No valid session = no xAI access, regardless of what key is used.
      const session = await storage.getSession(sessionId);
      if (clientWs.readyState !== WebSocket.OPEN) return;
      if (!session) {
        logger.warn(
          {
            sessionId,
            event: "leo_connect_rejected",
            reason: "invalid_session",
          },
          "Leo connect rejected: invalid session",
        );
        clientWs.close(4003, "Invalid session");
        return;
      }
      if (session.expiresAt && new Date() > session.expiresAt) {
        logger.warn(
          {
            sessionId,
            event: "leo_connect_rejected",
            reason: "session_expired",
            expiresAt: session.expiresAt,
          },
          "Leo connect rejected: session expired",
        );
        clientWs.close(4003, "Session expired");
        return;
      }

      // Key resolution: user-supplied key wins over server key.
      // If neither exists, close with a clear error.
      const xaiKey = userProvidedKey || process.env.XAI_API_KEY;
      if (!xaiKey) {
        clientWs.close(4503, "xAI API key not configured");
        return;
      }

      const connectUrl = `${XAI_REALTIME_URL}?model=${encodeURIComponent(VOICE_MODEL)}`;
      logger.info(
        { sessionId, usingUserKey: !!userProvidedKey },
        "Opening xAI Realtime WebSocket",
      );

      // Open the upstream connection to xAI.
      // The Authorization header carries the API key (Bearer token scheme).
      const pendingFrames: (string | Buffer)[] = [];
      const xaiWs = new WebSocket(connectUrl, {
        headers: { Authorization: `Bearer ${xaiKey}` },
        handshakeTimeout: 45_000,
      });

      xaiWs.on("open", () => {
        if (clientWs.readyState !== WebSocket.OPEN) {
          xaiWs.close();
          return;
        }
        logger.info(
          { sessionId },
          "xAI Realtime connected — sending session config",
        );

        // session.update configures Leo's personality and audio settings
        // (current xAI schema: audio.input/output.format, lowercase voice).
        // Clients may send their own session.update afterwards; the proxy
        // normalizes those too (see realtimeProtocol.ts).
        xaiWs.send(
          JSON.stringify({
            type: "session.update",
            session: {
              voice: VOICE,
              audio: defaultAudioConfig(),
              turn_detection: {
                type: "server_vad",
                threshold: 0.5,
                prefix_padding_ms: 300,
                silence_duration_ms: 600,
              },
              instructions:
                "You are Leo, a warm, curious, and expressive AI. You are experiencing live audio and real-time vision through a user's device. React naturally and conversationally. Keep responses concise and human. You are talking directly with your closest friend.",
            },
          }),
        );

        // Flush anything the client sent while we were connecting upstream
        // (e.g. the Expo app's session.update, sent the moment its socket opens).
        for (const frame of pendingFrames.splice(0)) xaiWs.send(frame);

        // Tell the client the connection is ready.
        // ConversationFeed.tsx listens for this to switch status → "connected".
        if (clientWs.readyState === WebSocket.OPEN)
          clientWs.send(JSON.stringify({ type: "connected" }));
      });

      xaiWs.on("error", (err) => {
        logger.error(
          { err, sessionId },
          "xAI Realtime error — closing client connection",
        );
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(
            JSON.stringify({
              type: "error",
              message: `xAI connection error: ${err.message}`,
            }),
          );
          clientWs.close(1011, "xAI connection error");
        }
      });

      // ── Transparent bidirectional proxy ───────────────────────────────────
      // We pass raw bytes in both directions without inspecting or modifying them.
      // xAI's event protocol (input_audio_buffer.append, response.audio.delta, etc.)
      // is documented at: https://docs.x.ai/docs/guides/live

      // xAI → client: relay all events, renaming current event names to the
      // legacy ones our clients listen for (response.audio.delta, etc.).
      xaiWs.on("message", (data, isBinary) => {
        if (clientWs.readyState !== WebSocket.OPEN) return;
        if (isBinary) {
          clientWs.send(data as Buffer);
          return;
        }
        clientWs.send(translateUpstreamFrame(data.toString()));
      });

      // client → xAI: answer keep-alive pings locally, normalize session.update
      // and WAV-wrapped audio, then relay. Frames that arrive before the
      // upstream socket is open are queued instead of silently dropped.
      const onClientMessage = (data: unknown, isBinary: boolean) => {
        let payload: string | Buffer = data as Buffer;
        if (!isBinary) {
          const action = handleClientFrame(String(data));
          if (action.kind === "pong") {
            if (clientWs.readyState === WebSocket.OPEN)
              clientWs.send(JSON.stringify({ type: "pong" }));
            return;
          }
          if (action.kind === "drop") return;
          if (action.kind === "error") {
            if (clientWs.readyState === WebSocket.OPEN)
              clientWs.send(
                JSON.stringify({
                  type: "error",
                  error: { message: action.message },
                }),
              );
            return;
          }
          payload = action.payload;
        }
        if (xaiWs.readyState === WebSocket.OPEN) {
          xaiWs.send(payload);
        } else if (
          xaiWs.readyState === WebSocket.CONNECTING &&
          pendingFrames.length < MAX_PENDING_FRAMES
        ) {
          if (bufferedBytes + Buffer.byteLength(payload) > MAX_BUFFER_BYTES) {
            clientWs.close(1009, "Too much pending audio");
            return;
          }
          bufferedBytes += Buffer.byteLength(payload);
          pendingFrames.push(payload);
        }
      };
      clientWs.off("message", captureEarly);
      clientWs.on("message", onClientMessage);
      bufferedBytes = 0;
      for (const f of earlyFrames.splice(0))
        onClientMessage(f.data, f.isBinary);

      const expiryTimer = session.expiresAt
        ? setTimeout(
            () => {
              clientWs.close(4003, "Session expired");
              if (xaiWs.readyState < WebSocket.CLOSING) xaiWs.close();
            },
            Math.max(
              0,
              Math.min(2_147_483_647, session.expiresAt.getTime() - Date.now()),
            ),
          )
        : null;
      expiryTimer?.unref();

      // ── Teardown ──────────────────────────────────────────────────────────
      // When either side closes, close the other. Code 1000 = clean close.

      xaiWs.on("close", (code, reason) => {
        logger.info(
          { code, reason: reason.toString(), sessionId },
          "xAI Realtime closed",
        );
        if (clientWs.readyState === WebSocket.OPEN) clientWs.close();
      });

      clientWs.on("close", (code, reason) => {
        if (expiryTimer) clearTimeout(expiryTimer);
        pendingFrames.length = 0;
        const clean = code === 1000;
        if (!clean) {
          logger.warn(
            {
              sessionId,
              code,
              reason: reason.toString(),
              event: "leo_client_disconnect_abnormal",
            },
            "Leo client disconnected abnormally",
          );
        } else {
          logger.info(
            { sessionId, code, event: "leo_client_disconnect" },
            "Leo client disconnected cleanly",
          );
        }
        if (xaiWs.readyState < WebSocket.CLOSING) xaiWs.close();
      });

      clientWs.on("error", (err) => {
        logger.error({ err, sessionId }, "Client WS error");
        if (xaiWs.readyState < WebSocket.CLOSING) xaiWs.close();
      });
    } catch (err: any) {
      logger.error({ err }, "Realtime proxy setup error");
      clientWs.close(4500, "Session setup failed");
    }
  });

  logger.info("Grok Realtime WebSocket proxy ready at /api/grok-live");
}
