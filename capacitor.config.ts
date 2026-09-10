import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Live reload en dispositivo/emulador.
 *
 * Ruta automática:  yarn android:dev  /  yarn ios:dev
 *   (el CLI levanta Vite y apunta el WebView a la IP de la máquina)
 *
 * Ruta manual: exporta la URL del dev server antes de sincronizar, p. ej.
 *   CAP_SERVER_URL=http://192.168.1.42:5173 yarn cap:sync:fast
 */
const liveReloadUrl = process.env.CAP_SERVER_URL;

const config: CapacitorConfig = {
  appId: "com.stanlycalle.tabatatimer.app",
  appName: "Tabata Timer",
  webDir: "dist",

  // Evita el flash blanco del WebView antes de que pinte la app.
  // Debe coincidir con COLORS.bg (src/utils/colors.ts).
  backgroundColor: "#070908",

  android: {
    backgroundColor: "#070908",
  },

  ios: {
    backgroundColor: "#070908",
  },

  ...(liveReloadUrl && {
    server: {
      url: liveReloadUrl,
      // El dev server de Vite es HTTP plano: Android lo bloquea sin esto.
      cleartext: true,
    },
  }),
};

export default config;
