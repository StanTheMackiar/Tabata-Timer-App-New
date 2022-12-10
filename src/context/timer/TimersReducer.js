import { TYPES } from "../actions/timersActions";

export const TimersInitialState = {
  timerState: {
    global: false,
    prepare: false,
    work: false,
    rest: false,
    recovery: false,
  },
  timer: {
    minutes: 0,
    seconds: 0,
  }
};

export function TimersReducer(state, action) {
    

  switch (action.type) {
    case TYPES.ACTIVATE_TIMER: {
    let {timerName, boolean} = action.payload;
      return {
        ...state,
        timerState: {
            ...state.timerState,
            [timerName]: boolean ? true : false,
        }
      };
    }
    case TYPES.CHANGE_MINUTES: {
       return {
        ...state,
        timer: {
            ...state.timer,
            minutes: action.payload,
        }
       }
    }
    case TYPES.CHANGE_SECONDS: {
        return {
         ...state,
         timer: {
             ...state.timer,
             seconds: action.payload,
         }
        }
     }
    default:
      return state;
  }
}
