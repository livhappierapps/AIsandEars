import { ReplitConnectors } from "@replit/connectors-sdk";
import { createClient } from "@replit/revenuecat-sdk/client";

export async function getUncachableRevenueCatClient() {
  const connectors = new ReplitConnectors();

  const tokenResp = await connectors.proxy("revenuecat", "/v2/projects", {
    method: "GET",
  });

  const authHeader = (tokenResp as any)?.request?.headers?.Authorization as string | undefined;

  if (!authHeader) {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const replToken = process.env.REPL_IDENTITY
      ? "repl " + process.env.REPL_IDENTITY
      : process.env.WEB_REPL_RENEWAL
        ? "depl " + process.env.WEB_REPL_RENEWAL
        : null;

    if (!hostname || !replToken) {
      throw new Error("RevenueCat integration not connected. Connect via the Integrations tab.");
    }

    const credResp = await fetch(
      `https://${hostname}/api/v2/connection?include_secrets=true&connector_names=revenuecat`,
      { headers: { "X-Replit-Token": replToken } }
    );
    const credData = await credResp.json() as any;
    const apiKey = credData?.items?.[0]?.settings?.api_key;
    if (!apiKey) throw new Error("RevenueCat API key not found in integration credentials.");

    return createClient({
      baseUrl: "https://api.revenuecat.com/v2",
      headers: { Authorization: `Bearer ${apiKey}` },
    });
  }

  return createClient({
    baseUrl: "https://api.revenuecat.com/v2",
    headers: { Authorization: authHeader },
  });
}
