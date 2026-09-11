import { createContext, useContext } from "react";
import { TimerPreset } from "../../interfaces";
import { EnterPhasePayload, TimerState } from "./timerReducer";

interface ContextProps {
  state: TimerState;

  startSession: (preset: TimerPreset) => void;
  enterPhase: (payload: EnterPhasePayload) => void;
  tick: (remaining: number) => void;
  togglePause: () => void;
  setPause: (value: boolean) => void;
  completeSession: () => void;
  resetSession: () => void;
}

export const TimerContext = createContext({} as ContextProps);

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};
