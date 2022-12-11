/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

import { animated } from 'react-spring';
import styled from "styled-components";
import { useTimer } from '../../hooks';

import { TimerTypes } from "../../interfaces";
import { PauseTimer } from './PauseTimer';
import { TimerFormNumber } from '../../interfaces/timer';


export interface Props {
  currentTimerName: TimerTypes,
  form: TimerFormNumber,
}

export const Timer: FC<Props> = ({ currentTimerName, form }) => {

  const { 
    bgColor,
    currentTimerState,
    initialMinutes,
    initialSeconds,
    isPaused,
    minutes,
    seconds,
    togglePause,
    workTimerStyle 
  } = useTimer({ currentTimerName, form });


  return (
    <>
        <TimerSection 
          bgColor={bgColor} 
          currentTimerState={currentTimerState}
        >
          <Subtitle currentTimerState={currentTimerState}>{currentTimerName}</Subtitle>
          {
            currentTimerState 
            ? ( 
            <>
              <animated.h2 style={workTimerStyle as any}>
                {`${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`}
              </animated.h2>
              <PauseTimer isPaused={isPaused} togglePause={togglePause} />
            </>
            )  : (
              <animated.h2 style={workTimerStyle as any}>
              {`${String(initialMinutes).padStart(2, '0')} : ${String(initialSeconds).padStart(2, '0')}`}
             </animated.h2>
            )
          }
          
        </TimerSection>

    </>
  );
}


const TimerSection = styled.div<{bgColor: string, currentTimerState: boolean}>`
  background-color: ${({ bgColor }) => bgColor};
  user-select: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border-top: thin #313131 solid;
  border-bottom: thin #313131 solid;
`;

const Subtitle = styled.h4<{currentTimerState: boolean}>`
  margin: 0;
  align-self: stretch;
  justify-content: center;
  display: flex;
  font-size: ${({currentTimerState}) => currentTimerState ? '1.5rem' : '1rem'};
  text-align: center;
  background-color: #ffffff1f;
  padding: ${({currentTimerState}) => currentTimerState ? '0.5rem' : '0'};
  text-transform: uppercase;
`;