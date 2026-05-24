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
  border-radius: 0.85rem;
  color: var(--pf-dark-text);
  min-height: ${({ action }) =>
    action === "start"
      ? "clamp(4rem, 12dvh, 5.6rem)"
      : "clamp(4rem, 12dvh, 5.2rem)"};
  font-family: var(--pf-font);
  font-size: 42px;
  font-weight: 800;
  text-transform: uppercase;
  user-select: none;
  position: relative;
  &:hover {
    cursor: pointer;
    background-color: var(--pf-accent);
    color: var(--pf-dark-text);
    transition: all 0.3s ease;
  }
`;
