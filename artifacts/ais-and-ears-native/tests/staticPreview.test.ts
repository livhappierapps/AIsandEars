import { afterEach, expect, it } from "vitest";
import { mkdtempSync, writeFileSync, unlinkSync, rmdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { request } from "node:http";
import type { AddressInfo } from "node:net";
import { createStaticServer } from "../serve-production.mjs";
const dir = mkdtempSync(join(tmpdir(), "aisears-static-test-"));
const server = createStaticServer(dir);
afterEach(async () => {
  if (server.listening) await new Promise<void>((r) => server.close(() => r()));
});
async function get(path: string) {
  if (!server.listening)
    await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  return new Promise<{ status: number; body: string }>((r) => {
    request(
      {
        hostname: "127.0.0.1",
        port: (server.address() as AddressInfo).port,
        path,
      },
      (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => r({ status: res.statusCode!, body }));
      },
    ).end();
  });
}
it("refuses encoded traversal outside dist", async () => {
  expect((await get("/%2e%2e/package.json")).status).toBe(403);
});
it("returns an explicit missing-build error rather than crashing", async () => {
  expect((await get("/conversation")).status).toBe(503);
});
it("uses index fallback only for app routes, not missing scripts", async () => {
  writeFileSync(join(dir, "index.html"), "<main>ok</main>");
  try {
    expect((await get("/conversation")).status).toBe(200);
    expect((await get("/missing.js")).status).toBe(404);
  } finally {
    unlinkSync(join(dir, "index.html"));
  }
});
import { afterAll } from "vitest";
afterAll(() => rmdirSync(dir));
