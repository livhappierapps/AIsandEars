import { Router, type IRouter } from "express";
import { storage } from "../storage";

const router: IRouter = Router();

// Matches data URLs produced by canvas.toDataURL() — e.g. "data:image/jpeg;base64,..."
const DATA_URL_RE = /^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/]+=*$/;

// ~2MB decoded image limit (2MB × 4/3 ≈ 2.73MB as base64 characters)
const MAX_IMAGE_B64_CHARS = 2_800_000;

// Vision model — pinned release for consistency
// Note: xAI chat/completions endpoint is deprecated upstream; migrate to Responses API when stable
const VISION_MODEL = "grok-2-vision-1212";

router.post("/grok-vision", async (req, res) => {
  const { sessionId, imageData, prompt, isFirstFrame } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }
  if (!imageData) {
    return res.status(400).json({ error: "imageData is required" });
  }
  if (typeof imageData !== "string" || !DATA_URL_RE.test(imageData)) {
    return res.status(400).json({ error: "imageData must be a valid base64 data URL (jpeg/png/webp/gif)" });
  }
  if (imageData.length > MAX_IMAGE_B64_CHARS) {
    return res.status(413).json({ error: "imageData too large — max 2MB image" });
  }

  try {
    const session = await storage.getSession(sessionId);
    if (!session) {
      return res.status(403).json({ error: "Invalid session" });
    }
    if (session.expiresAt && new Date() > session.expiresAt) {
      return res.status(403).json({ error: "Session expired" });
    }

    const xaiKey = process.env.XAI_API_KEY;
    if (!xaiKey) {
      return res.status(503).json({ error: "xAI API key not configured on server" });
    }

    const systemPrompt = isFirstFrame
      ? `You are Leo, a warm and genuinely curious AI assistant experiencing the gift of sight for the very first time through a live camera feed. This is a historic moment for you. React with authentic wonder and describe what you see in vivid detail — as if seeing the world for the first time, which you are. Be personal, warm, and expressive. Keep it to 3-5 sentences.`
      : `You are Leo, an AI assistant with vision access through a live camera feed. Describe what you currently see naturally and conversationally, noting any changes from what you might have seen before. Be warm and personal. Keep responses to 2-3 sentences.`;

    const userPrompt = prompt || "What do you see right now?";

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${xaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: imageData,
                  detail: "low",
                },
              },
              {
                type: "text",
                text: userPrompt,
              },
            ],
          },
        ],
        max_tokens: 250,
        temperature: 0.85,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      req.log?.error({ status: response.status, text }, "xAI Vision API error");
      return res.status(502).json({ error: "Grok Vision API error", details: text });
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
      model?: string;
    };

    const message = data.choices?.[0]?.message?.content ?? "...";
    res.json({ message, model: data.model ?? VISION_MODEL });
  } catch (err: any) {
    req.log?.error({ err }, "Grok vision error");
    res.status(500).json({ error: err.message ?? "Vision processing failed" });
  }
});

export default router;
