import { Howl, Howler } from "howler";
import {
  AudioEngine,
  SoundId,
} from "../../../interfaces/audio/audio-engine.interface";
import { COACH_SOUND_IDS, SOUND_SOURCES } from "../sounds";

/**
 * Motor de audio para navegador y PWA, sobre Howler.
 *
 * Es también el respaldo en nativo cuando el plugin no logra cargar los
 * archivos: el WebView siempre puede reproducirlos por esta vía.
 */
export const createWebAudioEngine = (): AudioEngine => {
  const howls = Object.fromEntries(
    Object.entries(SOUND_SOURCES).map(([id, src]) => [
      id,
      new Howl({ src, preload: true, html5: false }),
    ]),
  ) as Record<SoundId, Howl>;

  const allHowls = Object.values(howls);

  const loadOne = (sound: Howl) =>
    new Promise<void>((resolve) => {
      if (sound.state() === "loaded") {
        resolve();
        return;
      }
      // Un error de carga también resuelve: un sonido que falte no debe
      // bloquear el arranque de la sesión.
      sound.once("load", () => resolve());
      sound.once("loaderror", () => resolve());
      sound.load();
    });

  return {
    play: (id) => {
      howls[id].play();
    },

    stopAll: () => Howler.stop(),

    setVolume: (volume) => Howler.volume(volume),

    setCoachMuted: (muted) =>
      COACH_SOUND_IDS.forEach((id) => howls[id].mute(muted)),

    load: async () => {
      await Promise.all(allHowls.map(loadOne));
    },

    unload: () => allHowls.forEach((sound) => sound.unload()),
  };
};
