import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
      // Keep this list in step with implemented tests so new UI files don't
      // appear as noisy 0%-covered entries before their tests exist.
      include: ["src/lib/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    },
  },
});
