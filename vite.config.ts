import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";
import { DEV_SERVER_PORT } from "./scripts/dev-server.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: DEV_SERVER_PORT,
    // Falla en vez de saltar a otro puerto: el reenvío de `adb reverse`
    // y CAP_SERVER_URL apuntan a este número concreto.
    strictPort: true,
  },

  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          isDevelopment: process.env.NODE_ENV !== "production",
          isProduction: process.env.NODE_ENV === "production",
        },
      },
    }),
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Tabata Timer",
        short_name: "Tabata",
        description: "Timer for your Tabata trains!",
        background_color: "#2B2B2B",
        theme_color: "#169F9F",
        orientation: "portrait",
        display_override: ["fullscreen", "minimal-ui"],
        display: "standalone",
        scope: "./",
        categories: ["sports", "lifestyle"],
        lang: "en-US",
        icons: [
          {
            src: "/favicon.png",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/png",
          },
          {
            src: "/logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],
});
