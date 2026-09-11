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
        name: "Workbata",
        short_name: "Workbata",
        description: "Tabata interval timer for HIIT training",
        background_color: "#161826",
        theme_color: "#161826",
        orientation: "portrait",
        display_override: ["fullscreen", "minimal-ui"],
        display: "standalone",
        scope: "./",
        categories: ["sports", "lifestyle"],
        lang: "en-US",
        icons: [
          {
            src: "/favicon.png",
            sizes: "64x64",
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
          {
            // Variante recortable: la obra vive en el 80% central, así que
            // sobrevive a la máscara que aplique cada lanzador.
            src: "/logo512-maskable.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
