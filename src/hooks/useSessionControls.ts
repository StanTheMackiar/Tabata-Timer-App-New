import { useSoundContext } from "../context/sound/useSoundContext";
import { useTimerContext } from "../context/timer/useTimerContext";
import { TimerPreset } from "../interfaces";
import { useAppNavigate } from "../routes/navigation.helper";
import { AppRoute } from "../routes/routes.enum";

export const useSessionControls = () => {
  const { loadSounds, play, stopAllSounds } = useSoundContext();
  const { resetSession, startSession } = useTimerContext();

  const navigate = useAppNavigate();

  const start = async (preset: TimerPreset) => {
    // La carga debe colgar de este gesto: sin él los navegadores móviles
    // bloquean la reproducción durante el resto de la sesión.
    await loadSounds();
    play("prepare");

    startSession(preset);
    navigate(AppRoute.RUN);
  };

  const stop = () => {
    stopAllSounds();
    play("stop");
    resetSession();
    navigate(AppRoute.HOME);
  };

  /** Salir del resumen: el sonido de fin ya sonó al completar la sesión. */
  const dismissSummary = () => {
    resetSession();
    navigate(AppRoute.HOME);
  };

  return { dismissSummary, start, stop };
};
