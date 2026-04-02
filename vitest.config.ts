import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "automatic"
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "framer-motion": fileURLToPath(new URL("./src/test/mocks/framer-motion.tsx", import.meta.url)),
      recharts: fileURLToPath(new URL("./src/test/mocks/recharts.tsx", import.meta.url))
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts"
  }
});
