import { normalizeApiOrigin } from "@workspace/media-utils";

// Expo replaces direct process.env.EXPO_PUBLIC_* accesses at bundle time.
export function apiUrl(path: string): string {
  const origin = normalizeApiOrigin(
    process.env.EXPO_PUBLIC_API_BASE_URL ||
      process.env.EXPO_PUBLIC_DOMAIN ||
      "",
  );
  return `${origin}/api/${path.replace(/^\/?api\//, "").replace(/^\//, "")}`;
}
export function socketUrl(sessionId: string, userKey?: string): string {
  const url = new URL(apiUrl("grok-live"));
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.searchParams.set("sessionId", sessionId);
  if (userKey) url.searchParams.set("userKey", userKey);
  return url.toString();
}
