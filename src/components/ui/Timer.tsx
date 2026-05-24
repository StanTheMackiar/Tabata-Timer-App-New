import { FC } from "react";

import styled from "styled-components";
import { useTimer } from "../../hooks";

import { TimerFormNumber } from "../../interfaces/timer.interface";
import { PauseTimer } from "./PauseTimer";

export interface Props {
  form: TimerFormNumber;
}

export const Timer: FC<Props> = ({ form }) => {
  const { bgColor, activeTimer, isPaused, minutes, seconds, togglePause } =
    useTimer({ form });

  return (
    <>
      <TimerSection bgColor={bgColor}>
        <Subtitle>{activeTimer}</Subtitle>

        <h2>
          {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
        </h2>

        <PauseTimer isPaused={isPaused} togglePause={togglePause} />
      </TimerSection>
    </>
  );
};

const TimerSection = styled.div<{
  bgColor: string;
}>`
  background-color: ${({ bgColor }) => bgColor};
  user-select: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: "100%";
  flex: 1;
  border-radius: 1rem;
  color: var(--pf-dark-text);
  overflow: hidden;
  display: flex;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.18);

  h2 {
    color: var(--pf-dark-text);
    text-align: center;
    font-weight: 900;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-family: var(--pf-font);
    font-size: clamp(4.6rem, 22vw, 12rem);
    line-height: 0.95;
  }
`;

const Subtitle = styled.h4`
  margin: 0;
  align-self: stretch;
  justify-content: center;
  display: flex;
  font-size: clamp(2.25rem, 12vw, 4.75rem);
  font-weight: 900;
  text-align: center;
  padding: clamp(1rem, 4dvh, 2rem) 0 0;
  text-transform: uppercase;
`;
