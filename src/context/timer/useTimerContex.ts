import { createContext, useContext } from "react";
import { TimerTypes } from "../../interfaces";
import { TimerState } from "./timerReducer";

interface ContextProps {
  state: TimerState;

  changeCycles: (value: number) => void;
  changeMinutes: (value: number) => void;
  changeSeconds: (value: number) => void;
  changeTabatas: (value: number) => void;
  runTimer: (timerName: TimerTypes) => void;
  stopAllTimers: () => void;
  stopTimer: (timerName: TimerTypes) => void;
  togglePause: () => void;
  setPause: (value: boolean) => void;
}

export const TimerContext = createContext({} as ContextProps);

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};
