import { Howler } from "howler";
import { useSoundContext } from "../context/sound/useSoundContext";
import { useTimerContext } from "../context/timer/useTimerContex";
import { useAppNavigate } from "../routes/navigation.helper";
import { AppRoute } from "../routes/routes.enum";

export const useStopButton = () => {
  const { stopSound, completeSound } = useSoundContext();
  const { stopAllTimers } = useTimerContext();

  const navigate = useAppNavigate();

  const stopTimer = ({ complete = false } = {}) => {
    Howler.stop();
    if (complete) completeSound.play();
    else stopSound.play();
    stopAllTimers();
    navigate(AppRoute.HOME);
  };

  return {
    stopTimer,
  };
};
