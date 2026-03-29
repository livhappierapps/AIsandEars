import { Router, type IRouter } from "express";
import { storage } from "../storage";

const router: IRouter = Router();

router.post("/ai-token", async (req, res) => {
  const { sessionId, tier } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  try {
    const session = await storage.getSession(sessionId);
    if (!session) {
      return res.status(403).json({ error: "Invalid session" });
    }

    if (session.expiresAt && new Date() > session.expiresAt) {
      return res.status(403).json({ error: "Session expired" });
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return res.json({ token: "demo-no-api-key", mode: "demo" });
    }

    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "alloy",
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      req.log?.error({ status: response.status, text }, "OpenAI ephemeral token error");
      return res.json({ token: "demo-api-error", mode: "demo" });
    }

    const data = (await response.json()) as { client_secret?: { value?: string } };
    const token = data.client_secret?.value ?? "";

    res.json({ token, mode: "live" });
  } catch (err: any) {
    req.log?.error({ err }, "AI token error");
    res.status(500).json({ error: err.message ?? "Token generation failed" });
  }
});

export default router;
