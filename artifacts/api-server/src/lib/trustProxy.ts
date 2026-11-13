import type { Express } from "express";

/**
 * Trust the hosting proxy (Render's load balancer) so `req.ip` is the real
 * client address from the right-most X-Forwarded-For hop, not the proxy's.
 * Per-client rate limits (owner pass) depend on this.
 *
 * TRUST_PROXY_HOPS overrides the number of trusted hops (default 1). Set it to
 * 0 when the server is exposed directly with no proxy in front.
 */
export function trustProxyHops(): number {
  const raw = process.env.TRUST_PROXY_HOPS;
  if (raw === undefined || raw.trim() === "") return 1;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 0 && n <= 10 ? n : 1;
}

export function applyTrustProxy(app: Express): void {
  app.set("trust proxy", trustProxyHops());
}
