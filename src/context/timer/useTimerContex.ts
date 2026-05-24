import { createContext, useContext } from "react";
import { TimerType } from "../../enums";
import { TimerState } from "./timerReducer";

interface ContextProps {
  state: TimerState;

  changeCycles: (value: number) => void;
  changeMinutes: (value: number) => void;
  changeSeconds: (value: number) => void;
  changeTabatas: (value: number) => void;
  runTimer: (timerName: TimerType) => void;
  stopAllTimers: () => void;
  stopTimer: (timerName: TimerType) => void;
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
