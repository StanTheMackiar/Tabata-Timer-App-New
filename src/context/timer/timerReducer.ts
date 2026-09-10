import { useReducer } from "react";
import { TimerType } from "../../enums";
import { TimerPreset } from "../../interfaces";
import { getTotalSeconds } from "../../utils/presets";

export interface TimerSession {
  phase: TimerType;
  /** Índice 1-based, como se muestra en pantalla ("2 / 4"). */
  cycle: number;
  tabata: number;
  /** Duración total de la fase en curso, para el porcentaje del anillo. */
  duration: number;
  remaining: number;
  /** Segundos de trabajo acumulados, para el resumen final. */
  workDone: number;
}

export interface SessionSummary {
  workDone: number;
  cycles: number;
  tabatas: number;
  total: number;
}

export interface TimerState {
  preset: TimerPreset | null;
  session: TimerSession | null;
  summary: SessionSummary | null;
  isPaused: boolean;
}

export enum TimerActionTypes {
  START_SESSION = "start_session",
  ENTER_PHASE = "enter_phase",
  TICK = "tick",
  TOGGLE_PAUSE = "toggle_pause",
  SET_PAUSE = "set_pause",
  COMPLETE_SESSION = "complete_session",
  RESET_SESSION = "reset_session",
}

export type EnterPhasePayload = {
  phase: TimerType;
  duration: number;
  cycle: number;
  tabata: number;
  workDone: number;
};

type TimerAction =
  | { type: TimerActionTypes.START_SESSION; payload: TimerPreset }
  | { type: TimerActionTypes.ENTER_PHASE; payload: EnterPhasePayload }
  | { type: TimerActionTypes.TICK; payload: number }
  | { type: TimerActionTypes.TOGGLE_PAUSE }
  | { type: TimerActionTypes.SET_PAUSE; payload: boolean }
  | { type: TimerActionTypes.COMPLETE_SESSION }
  | { type: TimerActionTypes.RESET_SESSION };

const TIMER_INITIAL_STATE: TimerState = {
  preset: null,
  session: null,
  summary: null,
  isPaused: false,
};

export const timerReducer = (
  state: TimerState,
  action: TimerAction,
): TimerState => {
  switch (action.type) {
    case TimerActionTypes.START_SESSION: {
      const preset = action.payload;
      // Un preset sin preparación arranca directamente en trabajo.
      const phase = preset.prepare > 0 ? TimerType.PREPARE : TimerType.WORK;
      const duration = preset.prepare > 0 ? preset.prepare : preset.work;

      return {
        preset,
        summary: null,
        isPaused: false,
        session: {
          phase,
          cycle: 1,
          tabata: 1,
          duration,
          remaining: duration,
          workDone: 0,
        },
      };
    }

    case TimerActionTypes.ENTER_PHASE: {
      const { phase, duration, cycle, tabata, workDone } = action.payload;

      return {
        ...state,
        session: { phase, duration, cycle, tabata, workDone, remaining: duration },
      };
    }

    case TimerActionTypes.TICK: {
      if (!state.session) return state;

      return {
        ...state,
        session: { ...state.session, remaining: action.payload },
      };
    }

    case TimerActionTypes.TOGGLE_PAUSE:
      return { ...state, isPaused: !state.isPaused };

    case TimerActionTypes.SET_PAUSE:
      return { ...state, isPaused: action.payload };

    case TimerActionTypes.COMPLETE_SESSION: {
      if (!state.preset || !state.session) return state;

      const { preset, session } = state;

      return {
        ...state,
        session: null,
        isPaused: false,
        summary: {
          workDone: session.workDone,
          cycles: preset.cycles * preset.tabatas,
          tabatas: preset.tabatas,
          total: getTotalSeconds(preset),
        },
      };
    }

    case TimerActionTypes.RESET_SESSION:
      return TIMER_INITIAL_STATE;

    default:
      return state;
  }
};

export const useTimerReducer = () => {
  const [state, dispatch] = useReducer(timerReducer, TIMER_INITIAL_STATE);

  return { state, dispatch };
};
