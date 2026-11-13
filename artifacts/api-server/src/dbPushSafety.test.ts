import { readFileSync } from "fs";
import path from "path";
import { describe, expect, it, vi } from "vitest";
import { getTableName, is } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import * as schema from "@workspace/db/schema";

// Render's build runs `pnpm --filter @workspace/db run push-force`.
// Guard against it ever auto-approving data loss or touching foreign tables.
const dbDir = path.resolve(__dirname, "../../../lib/db");

describe("Render DB push safety", () => {
  it("never passes --force to drizzle-kit push", () => {
    const pkg = JSON.parse(readFileSync(path.join(dbDir, "package.json"), "utf8"));
    for (const [name, cmd] of Object.entries<string>(pkg.scripts)) {
      if (cmd.includes("drizzle-kit push")) {
        expect(cmd, name).not.toMatch(/--force|\s-f\b/);
      }
    }
    expect(pkg.scripts["push-force"]).toBeDefined(); // name kept for Render's dashboard command
  });

  it("limits push to exactly the tables lib/db defines", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://unused.invalid/db");
    const { default: config } = await import(path.join(dbDir, "drizzle.config.ts"));
    vi.unstubAllEnvs();
    const owned = Object.values(schema)
      .filter((v) => is(v, PgTable))
      .map((t) => getTableName(t as PgTable))
      .sort();
    expect(owned).toEqual(["paid_sessions"]);
    expect([...(config.tablesFilter as string[])].sort()).toEqual(owned);
  });
});
