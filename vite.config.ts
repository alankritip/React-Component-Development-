/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // Define multiple Vitest projects: one for regular unit tests, one for Storybook tests
    projects: [
      // Regular unit/component tests (Node runner + jsdom env)
      {
        test: {
          name: "unit",
          environment: "jsdom",
          setupFiles: ["./vitest.setup.ts"], // registers jest-dom for Vitest
          // globals: true, // optional if not importing describe/it/expect
        }
      },
      // Storybook-driven tests in browser mode
      {
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"], // keep your Storybook test setup
        },
      },
    ],
  },
});
