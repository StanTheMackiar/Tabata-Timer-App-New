import { Howler } from "howler";
import { useNavigate } from "react-router-dom";
import { useSoundContext } from "../context/sound/useSoundContext";
import { useTimerContext } from "../context/timer/useTimerContex";

export const useStopButton = () => {
  const { stopBeepSound, stopSound } = useSoundContext();
  const { stopAllTimers } = useTimerContext();

  const navigate = useNavigate();

  const stopTimer = () => {
    Howler.stop();
    stopBeepSound.play();
    stopSound.play();
    stopAllTimers();
    navigate("/");
  };

  return {
    stopTimer,
  };
};
