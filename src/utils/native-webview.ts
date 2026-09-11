import { Capacitor } from "@capacitor/core";

const VIEWPORT_CONTENT = [
  "width=device-width",
  "initial-scale=1.0",
  // Dentro del contenedor nativo la app no es un documento que se lea, sino
  // una pantalla fija: el zoom sólo serviría para descuadrarla.
  "maximum-scale=1.0",
  "user-scalable=no",
  // Lo mantiene el área segura: sin esto env(safe-area-inset-*) da 0.
  "viewport-fit=cover",
].join(", ");

const preventContextMenu = (event: Event) => event.preventDefault();

/**
 * Restricciones que sólo se aplican dentro de Android e iOS.
 *
 * En navegador y PWA la app sigue comportándose como una página normal: se
 * puede seleccionar texto y hacer zoom, que es lo que espera quien la abre
 * ahí. El interruptor es el atributo `data-native` del elemento raíz, que
 * consume `GlobalStyle`.
 */
export const applyNativeWebViewRules = () => {
  if (!Capacitor.isNativePlatform()) return;

  document.documentElement.dataset.native = "true";

  document
    .querySelector('meta[name="viewport"]')
    ?.setAttribute("content", VIEWPORT_CONTENT);

  // El WebView de Android abre su propio menú al mantener pulsado, aunque el
  // texto no sea seleccionable.
  document.addEventListener("contextmenu", preventContextMenu);
};
