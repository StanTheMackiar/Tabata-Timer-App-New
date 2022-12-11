
import { TimerTypes } from '../../interfaces';
import { TimerState } from './';

export const TimersInitialState = {

};


type TimerActionType = 
   | { type: 'Timer - Run Timer', payload: { timerName: TimerTypes } }
   | { type: 'Timer - Stop Timer', payload: { timerName: TimerTypes } }
   | { type: 'Timer - Stop All Timers' }
   | { type: 'Timer - Change Minutes', payload: number }
   | { type: 'Timer - Change Seconds', payload: number }
   | { type: 'Timer - Change Cycles', payload: number }
   | { type: 'Timer - Change Tabatas', payload: number }
   | { type: 'Timer - Toggle Pause' }
   | { type: 'Timer - Set Pause', payload: boolean }


export const timerReducer = ( state: TimerState, action: TimerActionType): TimerState => {

   switch (action.type) {
    case 'Timer - Run Timer': {
      const { timerName } = action.payload;
        return {
          ...state,
          timerState: {
              ...state.timerState,
              [timerName]: true
          }
        };
      }
    case 'Timer - Stop Timer': {
      const { timerName } = action.payload;
        return {
          ...state,
          timerState: {
              ...state.timerState,
              [timerName]: false
          }
        };
      }
    case 'Timer - Stop All Timers': {
        return {
          ...state,
          timerState: {
              ...state.timerState,
              prepare: false,
              recovery: false,
              rest: false,
              work: false,
          }
        };
      }
      case 'Timer - Change Minutes': {
         return {
          ...state,
          timer: {
              ...state.timer,
              minutes: action.payload,
          }
         }
      }
      case 'Timer - Change Seconds': {
          return {
           ...state,
           timer: {
               ...state.timer,
               seconds: action.payload,
           }
          }
       }
      case 'Timer - Change Cycles': {
          return {
           ...state,
           timer: {
               ...state.timer,
               cycles: action.payload,
           }
          }
       }
      case 'Timer - Change Tabatas': {
          return {
           ...state,
           timer: {
               ...state.timer,
               tabatas: action.payload,
           }
          }
       }
      case 'Timer - Toggle Pause': {
          return {
           ...state,
           isPaused: !state.isPaused
           }
       }
      case 'Timer - Set Pause': {
          return {
           ...state,
           isPaused: action.payload
           }
       }
       
      default:
        return state;
   }
}