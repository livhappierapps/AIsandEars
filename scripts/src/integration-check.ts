/**
 * AIs&Ears — API integration check
 *
 * Runs a suite of HTTP assertions against the running server to verify that
 * all key routes behave as expected (correct status codes, required fields).
 *
 * Usage:
 *   pnpm --filter @workspace/scripts run check
 *
 * Override the target with:
 *   API_URL=https://your-domain.replit.app/api pnpm --filter @workspace/scripts run check
 */

const BASE = process.env.API_URL ?? "http://localhost:80/api";

let passed = 0;
let failed = 0;

async function check(label: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`  ✓  ${label}`);
    passed++;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  ✗  ${label}`);
    console.error(`       ${msg}`);
    failed++;
    process.exitCode = 1;
  }
}

async function json(r: Response): Promise<Record<string, unknown>> {
  return r.json() as Promise<Record<string, unknown>>;
}

async function main() {
  console.log(`\nAIs&Ears integration check\nTarget: ${BASE}\n`);

  // ── Health ─────────────────────────────────────────────────────────────────
  await check("GET /healthz → 200 { status: 'ok' }", async () => {
    const r = await fetch(`${BASE}/healthz`);
    if (!r.ok) throw new Error(`Expected 200, got ${r.status}`);
    const d = await json(r);
    if (d["status"] !== "ok") throw new Error(`Expected status=ok, got ${JSON.stringify(d)}`);
  });

  // ── Products ───────────────────────────────────────────────────────────────
  await check("GET /products → 200 with ≥4 products", async () => {
    const r = await fetch(`${BASE}/products`);
    if (!r.ok) throw new Error(`Expected 200, got ${r.status}`);
    const d = await json(r);
    if (!Array.isArray(d["data"])) throw new Error(`Expected data array, got ${JSON.stringify(d)}`);
    if ((d["data"] as unknown[]).length < 4) throw new Error(`Expected ≥4 products, got ${(d["data"] as unknown[]).length}`);
  });

  await check("GET /products → each product has id, name, prices[]", async () => {
    const r = await fetch(`${BASE}/products`);
    const d = await json(r);
    const data = d["data"] as Record<string, unknown>[];
    for (const p of data) {
      if (!p["id"]) throw new Error(`Product missing id: ${JSON.stringify(p)}`);
      if (!p["name"]) throw new Error(`Product missing name: ${JSON.stringify(p)}`);
      if (!Array.isArray(p["prices"])) throw new Error(`Product missing prices[]: ${JSON.stringify(p)}`);
    }
  });

  // ── Checkout ───────────────────────────────────────────────────────────────
  await check("POST /checkout — missing body → 400", async () => {
    const r = await fetch(`${BASE}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (r.status !== 400) throw new Error(`Expected 400, got ${r.status}`);
    const d = await json(r);
    if (!d["error"]) throw new Error(`Expected error field, got ${JSON.stringify(d)}`);
  });

  await check("POST /checkout — missing tier → 400", async () => {
    const r = await fetch(`${BASE}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId: "price_test" }),
    });
    if (r.status !== 400) throw new Error(`Expected 400, got ${r.status}`);
  });

  // ── Checkout/Verify ────────────────────────────────────────────────────────
  await check("GET /checkout/verify — no params → 400", async () => {
    const r = await fetch(`${BASE}/checkout/verify`);
    if (r.status !== 400) throw new Error(`Expected 400, got ${r.status}`);
  });

  await check("GET /checkout/verify — fake cs_ session → 400 or 503", async () => {
    const r = await fetch(`${BASE}/checkout/verify?session_id=cs_fake_test_session`);
    if (r.status !== 400 && r.status !== 503) {
      throw new Error(`Expected 400 or 503, got ${r.status}`);
    }
  });

  // ── Grok Vision ────────────────────────────────────────────────────────────
  await check("POST /grok-vision — missing sessionId → 400", async () => {
    const r = await fetch(`${BASE}/grok-vision`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageData: "data:image/jpeg;base64,abc" }),
    });
    if (r.status !== 400) throw new Error(`Expected 400, got ${r.status}`);
  });

  await check("POST /grok-vision — missing imageData → 400", async () => {
    const r = await fetch(`${BASE}/grok-vision`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: "test-id" }),
    });
    if (r.status !== 400) throw new Error(`Expected 400, got ${r.status}`);
  });

  await check("POST /grok-vision — malformed imageData → 400", async () => {
    const r = await fetch(`${BASE}/grok-vision`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: "test-id", imageData: "not-a-data-url" }),
    });
    if (r.status !== 400) throw new Error(`Expected 400, got ${r.status}`);
  });

  await check("POST /grok-vision — valid format but fake sessionId → 403", async () => {
    const r = await fetch(`${BASE}/grok-vision`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "00000000-0000-0000-0000-000000000000",
        imageData: "data:image/jpeg;base64,/9j/abc=",
      }),
    });
    if (r.status !== 403) throw new Error(`Expected 403, got ${r.status}`);
  });

  // ── Deprecated endpoint ────────────────────────────────────────────────────
  await check("POST /ai-token → 410 (deprecated)", async () => {
    const r = await fetch(`${BASE}/ai-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: "test" }),
    });
    if (r.status !== 410) throw new Error(`Expected 410, got ${r.status}`);
  });

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log(`\n${passed + failed} checks — ${passed} passed, ${failed} failed\n`);
}

main().catch((err: unknown) => {
  console.error("Fatal:", err);
  process.exit(1);
});
