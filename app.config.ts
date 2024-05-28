import { defineConfig } from "@solidjs/start/config"

export default defineConfig({
  server: {
    preset: process.env.NODE_ENV === "production" ? "vercel-edge" : "node-server",
    prerender: {
      crawlLinks: true,
    },
  },
})
