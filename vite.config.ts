/// <reference types="vitest" />
import { defineConfig } from "vite"

import react from "@vitejs/plugin-react"

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [react()],
  test: {
    environment: "happy-dom",
    outputFile: {
      junit: "test-results.xml",
    },
    reporters: process.env.GITHUB_ACTIONS
      ? ["junit", "github-actions"]
      : "default",
  },
})
