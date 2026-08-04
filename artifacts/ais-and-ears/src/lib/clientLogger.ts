/**
 * clientLogger.ts — Structured console logging for the web client.
 *
 * Writes JSON lines to console so any attached log capture (browser devtools,
 * Sentry breadcrumbs, etc.) can parse events by type. No PII is logged —
 * sessionId is treated as an opaque correlation token, not user identity.
 */

type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, event: string, context: Record<string, unknown> = {}) {
  const record = {
    level,
    event,
    ...context,
    time: new Date().toISOString(),
  };
  const line = JSON.stringify(record);
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.info(line);
  }
}

export const clientLogger = {
  info: (event: string, context?: Record<string, unknown>) => log("info", event, context),
  warn: (event: string, context?: Record<string, unknown>) => log("warn", event, context),
  error: (event: string, context?: Record<string, unknown>) => log("error", event, context),
};
