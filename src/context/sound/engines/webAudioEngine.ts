import { Howl, Howler } from "howler";
import {
  AudioEngine,
  SoundId,
} from "../../../interfaces/audio/audio-engine.interface";
import { isIos } from "../../../utils/platform";
import { COACH_SOUND_IDS, SOUND_SOURCES } from "../sounds";

/**
 * Safari en iOS enruta la Web Audio API por la sesión de audio "ambient", que
 * el interruptor de silencio del iPhone silencia por completo. Los elementos
 * <audio> van por el canal de reproducción y siguen sonando con el
 * interruptor puesto, así que en iOS se usa el modo HTML5 de Howler.
 *
 * Cuesta algo de latencia frente a la Web Audio API, pero es la diferencia
 * entre oír los avisos y no oír nada.
 */
const shouldUseHtml5Audio = isIos();

/** Reanuda el contexto: iOS lo suspende con más frecuencia que el resto. */
const resumeAudioContext = () => {
  const context = Howler.ctx;
  if (!context || context.state === "running") return;

  void context.resume().catch(() => undefined);
};

const handleVisibilityChange = () => {
  if (document.visibilityState === "visible") resumeAudioContext();
};

/**
 * Vigila el contexto por si el navegador lo suspende.
 *
 * En captura para adelantarse a los manejadores de React: así el contexto ya
 * está activo cuando el gesto llega al botón, aunque quien lo maneje espere a
 * una promesa antes de reproducir y pierda el hilo del gesto de usuario.
 *
 * El `visibilitychange` cubre el caso propio de un temporizador: iOS suspende
 * el contexto al pasar la pestaña a segundo plano y no siempre lo reanuda al
 * volver, de modo que la sesión se quedaría muda a mitad de entreno.
 */
const watchAudioContext = () => {
  document.addEventListener("pointerdown", resumeAudioContext, true);
  document.addEventListener("touchend", resumeAudioContext, true);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    document.removeEventListener("pointerdown", resumeAudioContext, true);
    document.removeEventListener("touchend", resumeAudioContext, true);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
};

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
      new Howl({ src, preload: true, html5: shouldUseHtml5Audio }),
    ]),
  ) as Record<SoundId, Howl>;

  const allHowls = Object.values(howls);
  const stopWatching = watchAudioContext();

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
      // Por si el gesto que abre la sesión es el primero de la página.
      resumeAudioContext();
      howls[id].play();
    },

    stopAll: () => Howler.stop(),

    setVolume: (volume) => Howler.volume(volume),

    setCoachMuted: (muted) =>
      COACH_SOUND_IDS.forEach((id) => howls[id].mute(muted)),

    load: async () => {
      resumeAudioContext();
      await Promise.all(allHowls.map(loadOne));
    },

    unload: () => {
      stopWatching();
      allHowls.forEach((sound) => sound.unload());
    },
  };
};
