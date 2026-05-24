import { FC } from "react";

import styled from "styled-components";
import { useStopButton } from "../../hooks/useStopButton";
import { BREAKPOINTS } from "../../utils/breakpoints";

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
  font-size: clamp(2.2rem, 9vw, 3.2rem);
  font-weight: 800;
  text-transform: uppercase;
  user-select: none;
  position: relative;
  overflow: hidden;
  white-space: nowrap;

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    font-size: clamp(2rem, 3.8vw, 2.8rem);
  }

  &:hover {
    cursor: pointer;
    background-color: var(--pf-accent);
    color: var(--pf-dark-text);
    transition: all 0.3s ease;
  }
`;
