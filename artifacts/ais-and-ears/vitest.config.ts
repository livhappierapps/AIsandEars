import { defineConfig } from "vitest/config";
import { URL, fileURLToPath } from "node:url";
export default defineConfig({
  esbuild: { jsx: "automatic" },
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: { environment: "node", include: ["tests/**/*.test.tsx"] },
});
