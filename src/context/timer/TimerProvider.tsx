import { FC, PropsWithChildren } from "react";
import { TimerType } from "../../enums";
import { TimerActionTypes, useTimerReducer } from "./timerReducer";
import { TimerContext } from "./useTimerContex";

export const TimerProvider: FC<PropsWithChildren> = ({ children }) => {
  const { dispatch, state } = useTimerReducer();

  const runTimer = (timerName: TimerType) => {
    dispatch({ type: TimerActionTypes.RUN_TIMER, payload: { timerName } });
  };

  const stopTimer = (timerName: TimerType) => {
    dispatch({ type: TimerActionTypes.STOP_TIMER, payload: { timerName } });
  };

  const stopAllTimers = () => {
    dispatch({ type: TimerActionTypes.STOP_ALL_TIMERS });
  };

  const changeSeconds = (value: number) =>
    dispatch({ type: TimerActionTypes.CHANGE_SECONDS, payload: value });

  const changeMinutes = (value: number) =>
    dispatch({ type: TimerActionTypes.CHANGE_MINUTES, payload: value });

  const changeCycles = (value: number) =>
    dispatch({ type: TimerActionTypes.CHANGE_CYCLES, payload: value });

  const changeTabatas = (value: number) =>
    dispatch({ type: TimerActionTypes.CHANGE_TABATAS, payload: value });

  const togglePause = () => dispatch({ type: TimerActionTypes.TOGGLE_PAUSE });

  const setPause = (value: boolean) =>
    dispatch({ type: TimerActionTypes.SET_PAUSE, payload: value });

  return (
    <TimerContext
      value={{
        state,

        changeCycles,
        changeMinutes,
        changeSeconds,
        changeTabatas,
        runTimer,
        setPause,
        stopAllTimers,
        stopTimer,
        togglePause,
      }}
    >
      {children}
    </TimerContext>
  );
};
