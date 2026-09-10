#!/usr/bin/env node
/**
 * Dev server preparado para el contenedor nativo de Android.
 *
 * Ejecuta `adb reverse` antes de levantar Vite, de forma que el
 * emulador o el dispositivo conectado por USB resuelva su propio
 * `localhost:5173` contra el dev server de esta máquina. Así el WebView
 * puede apuntar a `http://localhost:5173` sin depender de la IP de la LAN,
 * que cambia de red en red.
 *
 * Uso:
 *   yarn dev:cap
 *   CAP_SERVER_URL=http://localhost:5173 yarn cap:sync:fast   (en otra terminal)
 *
 * Si `adb` no está disponible o no hay dispositivo conectado, avisa y arranca
 * Vite igualmente: en iOS no hace falta reenvío y en web tampoco.
 */
import { spawn, spawnSync } from "node:child_process";
import { DEV_SERVER_HOST, DEV_SERVER_PORT } from "./dev-server.mjs";

const runAdbReverse = () => {
  const result = spawnSync(
    "adb",
    ["reverse", `tcp:${DEV_SERVER_PORT}`, `tcp:${DEV_SERVER_PORT}`],
    // Sin shell: en Windows `adb` es un .exe y spawn lo resuelve directamente.
    { encoding: "utf8" },
  );

  if (result.error) {
    console.warn(
      `\n⚠️  No se encontró 'adb' en el PATH: se omite el reenvío de puertos.` +
        `\n   Añade <ANDROID_SDK>/platform-tools al PATH si vas a usar el emulador.\n`,
    );
    return;
  }

  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    console.warn(
      `\n⚠️  'adb reverse' falló: se omite el reenvío de puertos.` +
        `\n   ¿Hay algún emulador o dispositivo conectado? ('adb devices')` +
        (detail ? `\n   ${detail}` : "") +
        `\n`,
    );
    return;
  }

  console.log(
    `\n✔ adb reverse tcp:${DEV_SERVER_PORT} → el dispositivo ya resuelve ` +
      `localhost:${DEV_SERVER_PORT}\n`,
  );
};

runAdbReverse();

// Comando en una sola cadena: `shell: true` hace falta para resolver el
// binario de Vite en node_modules/.bin en Windows, donde es un .cmd, y pasar
// los argumentos por separado con shell activo dispara DEP0190 en Node.
const vite = spawn(`vite --host ${DEV_SERVER_HOST}`, {
  stdio: "inherit",
  shell: true,
});

vite.on("exit", (code) => process.exit(code ?? 0));
