import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { setBaseUrl } from "@workspace/api-client-react";
import "./index.css";

// Point the generated API client at the external API host when deployed to
// Cloudflare Pages (or any host that isn't the API server itself).
// When VITE_API_BASE_URL is unset the client uses same-origin relative paths
// (current Replit behaviour — no change needed there).
setBaseUrl((import.meta.env.VITE_API_BASE_URL as string | undefined) || null);

// ── Global error visibility ───────────────────────────────────────────────
// Structured log format so any console capture (Sentry, LogRocket, etc.) can
// parse these as first-class events. No PII — URL path only, no query strings.

window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  console.error(
    JSON.stringify({
      level: "error",
      type: "unhandled_promise_rejection",
      message: reason instanceof Error ? reason.message : String(reason),
      stack: reason instanceof Error ? reason.stack : undefined,
      time: new Date().toISOString(),
    }),
  );
});

window.addEventListener("error", (event) => {
  // Ignore cross-origin script errors (no useful info available)
  if (!event.message || event.message === "Script error.") return;
  console.error(
    JSON.stringify({
      level: "error",
      type: "uncaught_error",
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error instanceof Error ? event.error.stack : undefined,
      time: new Date().toISOString(),
    }),
  );
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </HelmetProvider>
);
