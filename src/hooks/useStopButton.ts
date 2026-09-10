import { useSoundContext } from "../context/sound/useSoundContext";
import { useTimerContext } from "../context/timer/useTimerContex";
import { useAppNavigate } from "../routes/navigation.helper";
import { AppRoute } from "../routes/routes.enum";

export const useStopButton = () => {
  const { play, stopAllSounds } = useSoundContext();
  const { stopAllTimers } = useTimerContext();

  const navigate = useAppNavigate();

  const stopTimer = ({ complete = false } = {}) => {
    stopAllSounds();
    play(complete ? "complete" : "stop");
    stopAllTimers();
    navigate(AppRoute.HOME);
  };

  return {
    stopTimer,
  };
};
