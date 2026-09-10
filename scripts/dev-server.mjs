/**
 * Puerto y host del dev server, en un único sitio.
 *
 * Lo consumen `vite.config.ts` (para `yarn dev`) y `scripts/dev-cap.mjs`
 * (para el reenvío de `adb reverse`). El puerto es fijo a propósito: si Vite
 * escogiera otro al estar ocupado, el reenvío apuntaría al puerto equivocado.
 */
export const DEV_SERVER_PORT = 5173;

/** 0.0.0.0 expone el server a la red local: necesario para dispositivos físicos. */
export const DEV_SERVER_HOST = "0.0.0.0";
