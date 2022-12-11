import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Tabata PowerFit',
        short_name: 'Tabata',
        description: 'Timer for yout Tabata trains!',
        background_color: '#2B2B2B',
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
            type: "image/png"
          },
          {
            src: "/logo192.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "/logo512.png",
            type: "image/png",
            sizes: "512x512"
          }
        ]
      }
    }),
  ],

})
