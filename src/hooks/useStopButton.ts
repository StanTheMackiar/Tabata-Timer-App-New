import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SoundContext, TimerContext } from "../context";


export const useStopButton = () => {

const { stopBeepSound, stopSound } = useContext(SoundContext);
  const { stopAllTimers } = useContext(TimerContext);

  const navigate = useNavigate();

  const stopTimer = () => {
      Howler.stop();
      stopBeepSound.play();
      stopSound.play();
      stopAllTimers();
      navigate('/');
  };

    return {
      stopTimer
    }
}