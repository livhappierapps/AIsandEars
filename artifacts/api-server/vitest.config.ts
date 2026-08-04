import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: false,
    // Each test file gets its own isolated module registry so vi.mock works cleanly
    isolate: true,
    testTimeout: 10_000,
  },
});
