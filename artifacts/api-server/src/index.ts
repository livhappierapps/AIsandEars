import { createServer } from "http";
import app from "./app";
import { logger } from "./lib/logger";
import { attachGrokRealtimeProxy } from "./websocket/grokRealtime";

// Render (and most platforms) inject PORT automatically.
// Default to 3000 for local dev so the server starts without extra env setup.
const rawPort = process.env["PORT"] ?? "3000";
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) throw new Error(`Invalid PORT value: "${rawPort}"`);

const httpServer = createServer(app);
attachGrokRealtimeProxy(httpServer);

httpServer.listen(port, () => {
  logger.info({ port }, "Server listening");
});
