import { Capacitor } from "@capacitor/core";
import { AudioEngine } from "../../../interfaces/audio/audio-engine.interface";
import { createNativeAudioEngine } from "./nativeAudioEngine";
import { createWebAudioEngine } from "./webAudioEngine";

export { createNativeAudioEngine } from "./nativeAudioEngine";
export { createWebAudioEngine } from "./webAudioEngine";

/**
 * Motor nativo que se degrada al motor web si la precarga falla.
 *
 * El caso realista es el live reload: el WebView carga desde el dev server, y
 * los archivos que hay en el bundle nativo pueden no coincidir con los hashes
 * que pide esta build. En vez de quedarse mudo, sigue sonando por el WebView.
 */
const createNativeEngineWithWebFallback = (): AudioEngine => {
  const native = createNativeAudioEngine();

  let active: AudioEngine = native;
  let volume = 1;
  let isCoachMuted = false;

  const fallBackToWeb = async (reason: unknown) => {
    console.warn(
      "[audio] La precarga nativa falló; se continúa con el motor web.",
      reason,
    );

    const web = createWebAudioEngine();
    active = web;

    // El volumen y el silencio del coach pudieron ajustarse antes del fallo.
    web.setVolume(volume);
    web.setCoachMuted(isCoachMuted);

    await web.load();
  };

  return {
    play: (id) => active.play(id),

    stopAll: () => active.stopAll(),

    setVolume: (nextVolume) => {
      volume = nextVolume;
      active.setVolume(nextVolume);
    },

    setCoachMuted: (muted) => {
      isCoachMuted = muted;
      active.setCoachMuted(muted);
    },

    load: async () => {
      try {
        await active.load();
      } catch (reason) {
        if (active !== native) throw reason;
        await fallBackToWeb(reason);
      }
    },

    unload: () => active.unload(),
  };
};

export const createAudioEngine = (): AudioEngine =>
  Capacitor.isNativePlatform()
    ? createNativeEngineWithWebFallback()
    : createWebAudioEngine();
