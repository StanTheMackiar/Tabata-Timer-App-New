import { useContext, FC } from 'react';

import styled from "styled-components";

import { SoundContext } from "../../context/sound"; 


interface Props {
  action?: ButtonAction
}

type ButtonAction = 'start' | 'stop'

export const StartStopButton: FC<Props> = ({ action = 'start' }) => {
  const { stopBeepSound, stopSound } = useContext(SoundContext);

  // const { timerState, handleTimer } = useContext(TimerContext);

  const stopTimer = () => {

      stopBeepSound.play();
      stopSound.play();
    // handleTimer();
  };

  return (
      <Button
        action='start'
        onClick={ action === 'stop' ? stopTimer : () => {} }
        type={ action === 'start' ? 'submit' : 'button' }
      >
        {action === 'start' ? "Start!" : "Stop"}
      </Button>
  );
}


const Button = styled.button<Props>`
  background-color: ${({ action }) => action === 'start' ? "rgb(33, 167, 155)" : "rgb(179, 14, 116)" };
  border: none;
  color: rgb(232, 240, 255);
  margin: 0;
  font-size: 35px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 1rem;
  user-select: none;
  position: relative;
  border-top: thin #313131 solid;
  &:hover {
    cursor: pointer;
    background-color: ${({ action }) => action === 'start' ? "rgb(22, 117, 121)" : "rgb(148, 20, 99)" };
    color: white;
    transition: all 0.3s ease;
  }
`;
