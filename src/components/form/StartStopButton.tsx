import { FC } from "react";

import styled from "styled-components";
import { useStopButton } from "../../hooks/useStopButton";

interface Props {
  action?: ButtonAction;
}

type ButtonAction = "start" | "stop";

export const StartStopButton: FC<Props> = ({ action = "start" }) => {
  const stopButton = useStopButton();

  return (
    <Button
      action={action}
      onClick={action === "stop" ? stopButton.stopTimer : undefined}
      type={action === "start" ? "submit" : "button"}
    >
      {action === "start" ? "Start!" : "Stop"}
    </Button>
  );
};

const Button = styled.button<Props>`
  background-color: ${({ action }) =>
    action === "start" ? "var(--pf-white)" : "var(--pf-white)"};
  border: none;
  border-radius: 0.35rem;
  color: #111;
  min-height: ${({ action }) => (action === "start" ? "6rem" : "5.5rem")};
  font-family: "Arial Black", Impact, sans-serif;
  font-size: clamp(2.5rem, 14vw, 5rem);
  font-weight: 900;
  text-transform: uppercase;
  user-select: none;
  position: relative;
  &:hover {
    cursor: pointer;
    background-color: var(--pf-green);
    color: #111;
    transition: all 0.3s ease;
  }
`;
