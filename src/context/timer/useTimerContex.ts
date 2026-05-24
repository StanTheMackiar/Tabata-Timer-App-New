import { createContext, useContext } from "react";
import { TimerType } from "../../enums";
import { TimerState } from "./timerReducer";

export type RunTimerParams = {
  timerName: TimerType;
  minutes: number;
  seconds: number;
  cycles?: number;
  tabatas?: number;
};
export type RunTimerFun = (params: RunTimerParams) => void;

interface ContextProps {
  state: TimerState;

  changeCycles: (value: number) => void;
  changeMinutes: (value: number) => void;
  changeSeconds: (value: number) => void;
  changeTabatas: (value: number) => void;
  runTimer: RunTimerFun;
  stopAllTimers: () => void;
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
