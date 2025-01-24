import { defineConfig } from "@solidjs/start/config"

import htmlTerserCompression from "vite-plugin-simple-html"

export default defineConfig({
  server: {
    preset: process.env.NODE_ENV === "production" ? "vercel-edge" : "node-server",
    prerender: {
      crawlLinks: true,
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.indexOf(".pnpm") > -1) {
              return id.split(".pnpm/")[1].split("/")[0]
            }

            if (id.indexOf("node_modules") > -1) {
              return id.split("node_modules/")[1].split("/")[0]
            }
          },
        },
      },
    },
    plugins: [htmlTerserCompression({ minify: true })],
  },
})
