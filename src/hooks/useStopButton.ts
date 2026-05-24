import { Howler } from "howler";
import { useSoundContext } from "../context/sound/useSoundContext";
import { useTimerContext } from "../context/timer/useTimerContex";
import { AppRoute } from "../routes/routes.enum";
import { useAppNavigate } from "../routes/navigation.helper";

export const useStopButton = () => {
  const { stopBeepSound, stopSound } = useSoundContext();
  const { stopAllTimers } = useTimerContext();

  const navigate = useAppNavigate();

  const stopTimer = () => {
    Howler.stop();
    stopBeepSound.play();
    stopSound.play();
    stopAllTimers();
    navigate(AppRoute.HOME);
  };

  return {
    stopTimer,
  };
};
