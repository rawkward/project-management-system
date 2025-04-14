/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/__mocks__/**',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/test-utils/**',
      ],
    },
  },
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});