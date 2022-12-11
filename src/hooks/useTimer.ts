import { useContext, useEffect, useRef } from 'react';
import { useSpring } from "react-spring";
import { Props as useTimerProps } from "../components";
import { SoundContext, TimerContext } from "../context";
import { timers } from "../utils";
import { useInterval } from "./useInterval";
import { useStopButton } from "./useStopButton";


export const useTimer = ({ currentTimerName, form }: useTimerProps ) => {



    const { startBeepSound, finalBeepSound, threeSound, twoSound, oneSound,  workSound, restSound } = useContext(SoundContext);

    const { changeMinutes, changeSeconds, changeCycles, changeTabatas, runTimer, stopAllTimers, state, togglePause, setPause } = useContext(TimerContext);

    const stopButton = useStopButton();
    const firstLoad = useRef(true);

    const bgColor = timers.getBGColor(currentTimerName);
    const currentTimerState = timers.getCurrentTimerState(state.timerState, currentTimerName )
    const initialMinutes = timers.getTimerValue('minutes', form, currentTimerName);
    const initialSeconds = timers.getTimerValue('seconds', form, currentTimerName);
    
    const { minutes, seconds, cycles, tabatas } = state.timer;
 

    useEffect(() => {
      changeMinutes(form.prepareM);
      changeSeconds(form.prepareS)
      changeCycles(form.initialCycles)
      changeTabatas(form.initialTabatas)
    }, []);

    useEffect(() => {
      if ( firstLoad.current ) {
        runTimer('prepare');
        firstLoad.current = false
      }
    }, []);
  
    useEffect(() => {
      setPause(false)
    }, []);
  
    const workTimerStyle = useSpring({
      from: {
        color: "rgb(255, 255, 255)",
        textAlign: "center",
        fontWeight: "bold",
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      to: {
        fontSize: currentTimerState ? "6rem" : "1.5rem",
        margin: currentTimerState ? "1rem 0" : "0.2rem 0",
      },
      config: {
        tension: 1000,
        mass: 3,
        friction: 50,
      },
    });
    
  
    useInterval(
      () => {
        
        if ( minutes === 0 ) {
          if (seconds === 3) threeSound.play(), finalBeepSound.play();
          if (seconds === 2) twoSound.play(), finalBeepSound.play();
          if (seconds === 1) oneSound.play(), finalBeepSound.play();
          if (seconds === 0) startBeepSound.play();
        }
  
        if ( seconds === 0 && minutes === 0 ) {
  
          stopAllTimers();
          
          if (currentTimerName === 'prepare'){
            workSound.play();
            changeMinutes(form.workM)
            changeSeconds(form.workS)
            return runTimer('work');
          }    
          if (currentTimerName === 'work'){
            
            if (cycles === 1 ) {
              if (tabatas === 1) return stopButton.stopTimer();
              changeCycles( form.initialCycles );
              changeTabatas( tabatas - 1 );
              changeMinutes(form.recoveryM)
              changeSeconds(form.recoveryS)
              runTimer('recovery');
              
            } else {
              changeMinutes(form.restM)
              changeSeconds(form.restS)
              runTimer('rest');

            }
            return restSound.play();
          }
          
          if  (currentTimerName === 'rest') {
            if (cycles > 1) changeCycles( cycles - 1 );
            workSound.play();
            changeMinutes(form.workM)
            changeSeconds(form.workS)
            return runTimer('work');
          }
  
          if (currentTimerName === 'recovery' ) {
            workSound.play();
            changeMinutes(form.workM)
            changeSeconds(form.workS)
            return runTimer('work')
          } 
        } 
        
        if ( minutes !== 0 && seconds === 0 ) {
          changeMinutes(minutes - 1);
          return changeSeconds(59);
        }
        
        changeSeconds( seconds - 1 )
      },
      currentTimerState && !state.isPaused ? 1000 : null
    );



   return {
        bgColor,
        currentTimerState,
        minutes,
        togglePause,
        seconds,
        isPaused: state.isPaused,
        workTimerStyle,
        initialMinutes, 
        initialSeconds

    }
}