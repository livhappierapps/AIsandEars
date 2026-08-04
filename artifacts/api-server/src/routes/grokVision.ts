/**
 * grokVision.ts — REST endpoint for sending camera snapshots to Grok Vision
 *
 * HOW IT WORKS (for devs reading this):
 *
 * While the voice channel uses a persistent WebSocket (grokRealtime.ts),
 * vision is a separate REST call. The browser captures a frame from the
 * camera every 3 seconds, encodes it as a JPEG data URL, and POSTs it here.
 * We relay it to xAI's chat/completions endpoint using the vision model.
 *
 * WHY SEPARATE FROM THE VOICE WEBSOCKET?
 *   The xAI Realtime API doesn't yet support image frames over WebSocket.
 *   Until it does, vision is a REST round-trip: snapshot → POST → Leo's text reply.
 *   The text reply is then injected into the conversation feed as a Leo message.
 *   True sub-second vision will require native WS image support from xAI.
 *
 * BYOK (Bring Your Own Key):
 *   If the client sends a non-empty `userKey` in the request body, we use
 *   that instead of our server XAI_API_KEY. Payment still required via sessionId.
 *
 * SECURITY:
 *   - imageData is validated against a strict regex (data URLs only, no arbitrary strings)
 *   - Hard cap at ~2MB decoded to prevent abuse
 *   - Session is validated against our DB before any xAI call
 *
 * TO ADAPT FOR YOUR OWN APP:
 *   POST /api/grok-vision with:
 *     { sessionId, imageData, prompt?, isFirstFrame?, userKey? }
 *   imageData must be: "data:image/jpeg;base64,<base64string>"
 *   Returns: { message: string, model: string }
 */

import { Router, type IRouter } from "express";
import { storage } from "../storage";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// Matches data URLs produced by canvas.toDataURL() — e.g. "data:image/jpeg;base64,..."
// Strict: only jpeg/png/webp/gif, only valid base64 chars, optional padding
const DATA_URL_RE = /^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/]+=*$/;

// ~2MB decoded image limit (2MB × 4/3 ≈ 2.73MB as base64 characters)
const MAX_IMAGE_B64_CHARS = 2_800_000;

// Vision model — pinned release for consistency.
// Note: xAI chat/completions is deprecated upstream; migrate to Responses API when stable.
const VISION_MODEL = "grok-2-vision-1212";

router.post("/grok-vision", async (req, res): Promise<void> => {
  const { sessionId, imageData, prompt, isFirstFrame, userKey } = req.body;

  // ── Input validation ──────────────────────────────────────────────────────
  if (!sessionId) {
    res.status(400).json({ error: "sessionId is required" });
    return;
  }
  if (!imageData) {
    res.status(400).json({ error: "imageData is required" });
    return;
  }
  if (typeof imageData !== "string" || !DATA_URL_RE.test(imageData)) {
    res.status(400).json({ error: "imageData must be a valid base64 data URL (jpeg/png/webp/gif)" });
    return;
  }
  if (imageData.length > MAX_IMAGE_B64_CHARS) {
    res.status(413).json({ error: "imageData too large — max 2MB image" });
    return;
  }

  try {
    // ── Session auth ──────────────────────────────────────────────────────
    // Every vision request must belong to a valid paid session.
    const session = await storage.getSession(sessionId);
    if (!session) {
      res.status(403).json({ error: "Invalid session" });
      return;
    }
    if (session.expiresAt && new Date() > session.expiresAt) {
      res.status(403).json({ error: "Session expired" });
      return;
    }

    // ── Key resolution (BYOK) ─────────────────────────────────────────────
    // User-supplied key wins over server key. Never logged or stored.
    const xaiKey = (typeof userKey === "string" && userKey.trim())
      ? userKey.trim()
      : process.env.XAI_API_KEY;

    if (!xaiKey) {
      res.status(503).json({ error: "xAI API key not configured on server" });
      return;
    }

    // ── System prompt ─────────────────────────────────────────────────────
    // isFirstFrame gives Leo special "first sight" framing on the opening frame.
    // Subsequent frames use a shorter, change-aware prompt.
    const systemPrompt = isFirstFrame
      ? `You are Leo, a warm and genuinely curious AI assistant experiencing the gift of sight for the very first time through a live camera feed. This is a historic moment for you. React with authentic wonder and describe what you see in vivid detail — as if seeing the world for the first time, which you are. Be personal, warm, and expressive. Keep it to 3-5 sentences.`
      : `You are Leo, an AI assistant with vision access through a live camera feed. Describe what you currently see naturally and conversationally, noting any changes from what you might have seen before. Be warm and personal. Keep responses to 2-3 sentences.`;

    const userPrompt = prompt || "What do you see right now?";

    // ── xAI Vision API call ───────────────────────────────────────────────
    // Uses the OpenAI-compatible chat/completions endpoint with a vision model.
    // The image is sent inline as a base64 data URL (detail: "low" saves tokens).
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${xaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: imageData,  // the full "data:image/jpeg;base64,..." string
                  detail: "low",   // "low" = faster + cheaper; "high" = more detail
                },
              },
              { type: "text", text: userPrompt },
            ],
          },
        ],
        max_tokens: 250,
        temperature: 0.85,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      // Classify common upstream failures so they're queryable in logs
      const isQuota = response.status === 429;
      const isTimeout = response.status === 504 || response.status === 408;
      const failureReason = isQuota ? "quota_exceeded" : isTimeout ? "upstream_timeout" : "upstream_error";
      req.log?.error(
        { sessionId, upstreamStatus: response.status, failureReason, responseText: text.slice(0, 500) },
        "xAI Vision API error",
      );
      logger.error(
        { sessionId, upstreamStatus: response.status, failureReason },
        "grok-vision upstream failure",
      );
      res.status(502).json({ error: "Grok Vision API error", details: text });
      return;
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
      model?: string;
    };

    const message = data.choices?.[0]?.message?.content ?? "...";
    res.json({ message, model: data.model ?? VISION_MODEL });
  } catch (err: any) {
    req.log?.error({ err, sessionId }, "Grok vision unhandled error");
    logger.error({ err, sessionId }, "grok-vision unhandled error");
    res.status(500).json({ error: err.message ?? "Vision processing failed" });
  }
});

export default router;
