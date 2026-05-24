import { useReducer } from "react";
import { TimerType } from "../../enums";
import { RunTimerParams } from "./useTimerContex";

export enum TimerActionTypes {
  RUN_TIMER = "run_timer",
  STOP_SESSION = "stop_session",
  CHANGE_MINUTES = "change_minutes",
  CHANGE_SECONDS = "change_seconds",
  CHANGE_CYCLES = "change_cycles",
  CHANGE_TABATAS = "change_tabatas",
  TOGGLE_PAUSE = "toggle_pause",
  SET_PAUSE = "set_pause",
}

export interface TimerState {
  activeTimer: TimerType | null;
  timer: {
    minutes: number;
    seconds: number;
    tabatas: number;
    cycles: number;
  };
  isPaused: boolean;
}

type TimerActionType =
  | {
      type: TimerActionTypes.RUN_TIMER;
      payload: RunTimerParams;
    }
  | { type: TimerActionTypes.STOP_SESSION }
  | { type: TimerActionTypes.CHANGE_MINUTES; payload: number }
  | { type: TimerActionTypes.CHANGE_SECONDS; payload: number }
  | { type: TimerActionTypes.CHANGE_CYCLES; payload: number }
  | { type: TimerActionTypes.CHANGE_TABATAS; payload: number }
  | { type: TimerActionTypes.TOGGLE_PAUSE }
  | { type: TimerActionTypes.SET_PAUSE; payload: boolean };

const TIMER_INITIAL_STATE: TimerState = {
  activeTimer: null,
  timer: {
    minutes: 0,
    seconds: 0,
    tabatas: 0,
    cycles: 0,
  },
  isPaused: false,
};

export const timerReducer = (
  state: TimerState,
  action: TimerActionType,
): TimerState => {
  switch (action.type) {
    case TimerActionTypes.RUN_TIMER: {
      const { timerName, minutes, seconds, cycles, tabatas } = action.payload;
      return {
        ...state,
        activeTimer: timerName,
        timer: {
          ...state.timer,
          minutes,
          seconds,
          ...(cycles != null && { cycles }),
          ...(tabatas != null && { tabatas }),
        },
      };
    }
    case TimerActionTypes.STOP_SESSION: {
      return TIMER_INITIAL_STATE;
    }
    case TimerActionTypes.CHANGE_MINUTES: {
      return {
        ...state,
        timer: {
          ...state.timer,
          minutes: action.payload,
        },
      };
    }
    case TimerActionTypes.CHANGE_SECONDS: {
      return {
        ...state,
        timer: {
          ...state.timer,
          seconds: action.payload,
        },
      };
    }
    case TimerActionTypes.CHANGE_CYCLES: {
      return {
        ...state,
        timer: {
          ...state.timer,
          cycles: action.payload,
        },
      };
    }
    case TimerActionTypes.CHANGE_TABATAS: {
      return {
        ...state,
        timer: {
          ...state.timer,
          tabatas: action.payload,
        },
      };
    }
    case TimerActionTypes.TOGGLE_PAUSE: {
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    }
    case TimerActionTypes.SET_PAUSE: {
      return {
        ...state,
        isPaused: action.payload,
      };
    }

    default:
      return state;
  }
};

export const useTimerReducer = () => {
  const [state, dispatch] = useReducer(timerReducer, TIMER_INITIAL_STATE);

  return { state, dispatch };
};
