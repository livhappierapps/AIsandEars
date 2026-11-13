import { defineConfig } from "drizzle-kit";
import path from "path";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

// Only manage the tables this package owns. drizzle-kit push otherwise diffs
// every table in the database and would try to DROP tables it doesn't know
// about (e.g. another app's tables in a shared database). Add new table names
// here when you add tables to src/schema.
export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  tablesFilter: ["paid_sessions"],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
