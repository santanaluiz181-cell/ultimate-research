import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/ts/**/*.test.ts", "test/**/*.test.ts"],
    environment: "node",
    globals: false,
    passWithNoTests: false
  }
});
