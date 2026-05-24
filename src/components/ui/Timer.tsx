/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

import { animated } from "@react-spring/web";
import styled from "styled-components";
import { useTimer } from "../../hooks";

import { TimerTypes } from "../../interfaces";
import { TimerFormNumber } from "../../interfaces/timer.interface";
import { PauseTimer } from "./PauseTimer";

export interface Props {
  currentTimerName: TimerTypes;
  form: TimerFormNumber;
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
    workTimerStyle,
  } = useTimer({ currentTimerName, form });

  return (
    <>
      <TimerSection bgColor={bgColor} currentTimerState={currentTimerState}>
        <Subtitle currentTimerState={currentTimerState}>
          {currentTimerName}
        </Subtitle>
        {currentTimerState ? (
          <>
            <animated.h2 style={workTimerStyle as any}>
              {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
            </animated.h2>
            <PauseTimer isPaused={isPaused} togglePause={togglePause} />
          </>
        ) : (
          <animated.h2 style={workTimerStyle as any}>
            {`${String(initialMinutes).padStart(2, "0")}:${String(initialSeconds).padStart(2, "0")}`}
          </animated.h2>
        )}
      </TimerSection>
    </>
  );
};

const TimerSection = styled.div<{
  bgColor: string;
  currentTimerState: boolean;
}>`
  background-color: ${({ bgColor }) => bgColor};
  user-select: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ currentTimerState }) =>
    currentTimerState ? "min(58vh, 34rem)" : "4.5rem"};
  border-radius: 0.35rem;
  color: #111;
  overflow: hidden;
  display: ${({ currentTimerState }) => (currentTimerState ? "flex" : "none")};
`;

const Subtitle = styled.h4<{ currentTimerState: boolean }>`
  margin: 0;
  align-self: stretch;
  justify-content: center;
  display: flex;
  font-size: ${({ currentTimerState }) =>
    currentTimerState ? "clamp(2.25rem, 12vw, 4.75rem)" : "1rem"};
  font-weight: 900;
  text-align: center;
  padding: ${({ currentTimerState }) =>
    currentTimerState ? "1.25rem 0 0" : "0"};
  text-transform: uppercase;
`;
