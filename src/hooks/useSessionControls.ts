import { useSoundContext } from "../context/sound/useSoundContext";
import { useTimerContext } from "../context/timer/useTimerContext";
import { TimerPreset } from "../interfaces";
import { getInitialPhase } from "../utils/presets";
import { getPhaseCue } from "../utils/session";
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
    // Con la preparación a 0 la sesión abre en trabajo, y el aviso debe
    // corresponder con la fase que realmente empieza.
    play(getPhaseCue(getInitialPhase(preset)));

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
