import Whop from "@whop/sdk";

let clientPromise: Promise<Whop> | null = null;

async function initWhopClient(): Promise<Whop> {
  // ── Direct API key path (Render, Fly, any non-Replit host) ────────────────
  // Set WHOP_API_KEY in your deployment environment and the Replit connector
  // flow is bypassed entirely. Get your key at: app.whop.com → Settings → API Keys
  if (process.env.WHOP_API_KEY) {
    return new Whop({ apiKey: process.env.WHOP_API_KEY });
  }

  // ── Replit connector path (dev / Replit-hosted production) ────────────────
  // Falls through to this only when WHOP_API_KEY is not set.
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!hostname || !xReplitToken) {
    throw new Error(
      "Whop not configured. Set WHOP_API_KEY (for Render/external hosting) " +
        "or connect Whop via the Integrations tab (for Replit hosting).",
    );
  }

  const resp = await fetch(
    `https://${hostname}/api/v2/connection?include_secrets=true&connector_names=whop`,
    {
      headers: { Accept: "application/json", "X-Replit-Token": xReplitToken },
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!resp.ok) {
    throw new Error(`Failed to fetch Whop credentials: ${resp.status} ${resp.statusText}`);
  }

  const data = await resp.json() as { items?: Array<{ settings?: { api_key?: string } }> };
  const settings = data.items?.[0]?.settings;

  if (!settings?.api_key) {
    throw new Error(
      "Whop integration not connected or missing credentials. " +
        "Connect Whop via the Integrations tab first.",
    );
  }

  return new Whop({ apiKey: settings.api_key });
}

export function getWhopClient(): Promise<Whop> {
  if (!clientPromise) {
    clientPromise = initWhopClient().catch((err) => {
      clientPromise = null;
      throw err;
    });
  }
  return clientPromise;
}
