import { it, expect, vi } from "vitest";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, unlinkSync, rmdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import express from "express";
import type { Server } from "http";
import type { AddressInfo } from "net";
vi.mock("../storage", () => ({
  storage: {
    getSession: async () => ({ tier: "full-session", expiresAt: null }),
  },
}));
import music from "./musicAnalyze";
const available =
  spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status === 0;
it.skipIf(!available)(
  "decodes an actual Android-style AAC/M4A clip through ffmpeg (no keys)",
  async () => {
    const dir = mkdtempSync(join(tmpdir(), "aisears-decoder-test-")),
      file = join(dir, "sine.m4a");
    let server: Server | undefined;
    try {
      execFileSync(
        "ffmpeg",
        [
          "-y",
          "-f",
          "lavfi",
          "-i",
          "sine=frequency=440:duration=4",
          "-ac",
          "1",
          "-c:a",
          "aac",
          file,
        ],
        { stdio: "ignore", timeout: 10000 },
      );
      const app = express();
      app.use(express.json({ limit: "10mb" }));
      app.use("/api", music);
      server = await new Promise<Server>((r) => {
        const s = app.listen(0, "127.0.0.1", () => r(s));
      });
      const res = await fetch(
        `http://127.0.0.1:${(server.address() as AddressInfo).port}/api/music-analyze`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: "test-only",
            audioData: readFileSync(file).toString("base64"),
            format: "m4a",
          }),
        },
      );
      expect(res.status).toBe(200);
      expect(["music", "speech"]).toContain(
        ((await res.json()) as { type: string }).type,
      );
    } finally {
      if (server) await new Promise<void>((r) => server!.close(() => r()));
      try {
        unlinkSync(file);
      } catch {}
      rmdirSync(dir);
    }
  },
);
