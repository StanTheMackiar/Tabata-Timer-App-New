import { FC, PropsWithChildren } from "react";
import { TimerPreset } from "../../interfaces";
import {
  EnterPhasePayload,
  TimerActionTypes,
  useTimerReducer,
} from "./timerReducer";
import { TimerContext } from "./useTimerContext";

export const TimerProvider: FC<PropsWithChildren> = ({ children }) => {
  const { dispatch, state } = useTimerReducer();

  const value = {
    state,

    startSession: (preset: TimerPreset) =>
      dispatch({ type: TimerActionTypes.START_SESSION, payload: preset }),

    enterPhase: (payload: EnterPhasePayload) =>
      dispatch({ type: TimerActionTypes.ENTER_PHASE, payload }),

    tick: (remaining: number) =>
      dispatch({ type: TimerActionTypes.TICK, payload: remaining }),

    togglePause: () => dispatch({ type: TimerActionTypes.TOGGLE_PAUSE }),

    setPause: (value: boolean) =>
      dispatch({ type: TimerActionTypes.SET_PAUSE, payload: value }),

    completeSession: () =>
      dispatch({ type: TimerActionTypes.COMPLETE_SESSION }),

    resetSession: () => dispatch({ type: TimerActionTypes.RESET_SESSION }),
  };

  return <TimerContext value={value}>{children}</TimerContext>;
};
