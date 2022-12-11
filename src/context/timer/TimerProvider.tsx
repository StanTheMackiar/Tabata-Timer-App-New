import { FC, PropsWithChildren, useReducer } from 'react'
import { CurrentStateTimer, TimerTypes } from '../../interfaces';
import { timerReducer, TimerContext } from './';

export interface TimerState {
    timerState: CurrentStateTimer
    timer: {
        minutes: number;
        seconds: number;
        tabatas: number;
        cycles: number;
    };
    isPaused: boolean;
}

const TIMER_INITIAL_STATE:TimerState = {
    timerState: {
        prepare: false,
        work: false,
        rest: false,
        recovery: false,
    },
    timer: {
        minutes: 0,
        seconds: 0,
        tabatas: 0,
        cycles: 0,
    },
    isPaused: false,
}
export const TimerProvider: FC<PropsWithChildren> = ({ children }) => {

   const [state, dispatch] = useReducer(timerReducer, TIMER_INITIAL_STATE)


  const runTimer = ( timerName: TimerTypes ) => {
    dispatch({ type: 'Timer - Run Timer', payload: { timerName } });
  };

  const stopTimer = ( timerName: TimerTypes ) => {
    dispatch({ type: 'Timer - Stop Timer', payload: { timerName } });
  };

  const stopAllTimers = () => {
    dispatch({ type: 'Timer - Stop All Timers' });
  };
  
  const changeSeconds = ( value: number ) => dispatch({type: 'Timer - Change Seconds', payload: value})

  const changeMinutes = ( value: number ) => dispatch({type: 'Timer - Change Minutes', payload: value})

  const changeCycles = ( value: number ) => dispatch({type: 'Timer - Change Cycles', payload: value})

  const changeTabatas = ( value: number ) => dispatch({type: 'Timer - Change Tabatas', payload: value})

  const togglePause = () => dispatch({type: 'Timer - Toggle Pause'})
  const setPause = ( value: boolean ) => dispatch({type: 'Timer - Set Pause', payload: value})


   return (
       <TimerContext.Provider value={{
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
       }}>
          { children }
       </TimerContext.Provider>
   )
};