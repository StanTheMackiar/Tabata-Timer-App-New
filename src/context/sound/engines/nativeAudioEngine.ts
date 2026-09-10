import { NativeAudio } from "@capacitor-community/native-audio";
import {
  AudioEngine,
  SoundId,
} from "../../../interfaces/audio/audio-engine.interface";
import { COACH_SOUND_IDS, SOUND_IDS, SOUND_SOURCES } from "../sounds";

/**
 * Traduce la URL que emite Vite a la ruta que espera el plugin nativo.
 *
 * Capacitor copia el bundle web a la carpeta `public` del proyecto nativo, así
 * que /assets/prepare-a1b2c3.mp3 acaba en public/assets/prepare-a1b2c3.mp3.
 * Esa misma ruta sirve para el AssetManager de Android y para el bundle de iOS.
 */
const toNativeAssetPath = (webUrl: string) =>
  `public${new URL(webUrl, window.location.origin).pathname}`;

/**
 * Motor de audio nativo. Reproduce por la API del sistema en vez del WebView,
 * lo que baja la latencia y evita las restricciones de autoplay del navegador.
 *
 * `load` rechaza si algún archivo no se puede precargar, para que quien lo
 * invoque pueda caer al motor web.
 */
export const createNativeAudioEngine = (): AudioEngine => {
  let volume = 1;
  let isCoachMuted = false;
  let isLoaded = false;
  let loadPromise: Promise<void> | null = null;

  const isCoach = (id: SoundId) => COACH_SOUND_IDS.includes(id);

  const volumeFor = (id: SoundId) =>
    isCoachMuted && isCoach(id) ? 0 : volume;

  // El plugin no tiene volumen global: se aplica sonido a sonido. Antes de que
  // termine la precarga los assets no existen todavía, así que se omite y se
  // vuelve a aplicar al final de `preloadAll`.
  const applyVolumes = () => {
    if (!isLoaded) return;

    SOUND_IDS.forEach((id) => {
      void NativeAudio.setVolume({ assetId: id, volume: volumeFor(id) }).catch(
        () => undefined,
      );
    });
  };

  const preloadAll = async () => {
    // focus: false deja que los sonidos suenen mezclados con la música que ya
    // esté escuchando el usuario, en vez de robarle el foco de audio.
    await NativeAudio.configure({ focus: false, fade: false });

    await Promise.all(
      SOUND_IDS.map((id) =>
        NativeAudio.preload({
          assetId: id,
          assetPath: toNativeAssetPath(SOUND_SOURCES[id]),
          audioChannelNum: 1,
          isUrl: false,
          volume: volumeFor(id),
        }),
      ),
    );

    isLoaded = true;
    // El volumen pudo cambiar mientras la precarga estaba en vuelo.
    applyVolumes();
  };

  return {
    play: (id) => {
      if (!isLoaded) return;
      void NativeAudio.play({ assetId: id }).catch(() => undefined);
    },

    stopAll: () => {
      if (!isLoaded) return;

      SOUND_IDS.forEach((id) => {
        void NativeAudio.stop({ assetId: id }).catch(() => undefined);
      });
    },

    setVolume: (nextVolume) => {
      volume = nextVolume;
      applyVolumes();
    },

    setCoachMuted: (muted) => {
      isCoachMuted = muted;
      applyVolumes();
    },

    // Se memoriza la promesa porque `load` se invoca al montar y de nuevo al
    // enviar el formulario, y el plugin rechaza una segunda precarga.
    load: () => (loadPromise ??= preloadAll()),

    unload: () => {
      if (!isLoaded) return;
      isLoaded = false;
      loadPromise = null;

      SOUND_IDS.forEach((id) => {
        void NativeAudio.unload({ assetId: id }).catch(() => undefined);
      });
    },
  };
};
