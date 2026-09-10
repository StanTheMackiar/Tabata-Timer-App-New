import { FC } from "react";
import { PiCaretDown, PiCaretUp } from "react-icons/pi";
import styled from "styled-components";

interface Props {
  label: string;
  onStep: (delta: number) => void;
  /** Cuánto vale un paso en segundos: 60 para minutos, 1 para segundos. */
  step: number;
  value: number;
}

export const TimerPicker: FC<Props> = ({ label, onStep, step, value }) => (
  <Column>
    <ArrowButton
      type="button"
      aria-label={`Increase ${label}`}
      onClick={() => onStep(step)}
    >
      <PiCaretUp />
    </ArrowButton>

    <Value>{String(value).padStart(2, "0")}</Value>
    <Label>{label}</Label>

    <ArrowButton
      type="button"
      aria-label={`Decrease ${label}`}
      onClick={() => onStep(-step)}
    >
      <PiCaretDown />
    </ArrowButton>
  </Column>
);

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ArrowButton = styled.button`
  width: clamp(76px, 11vw, 104px);
  height: 48px;
  display: grid;
  place-items: center;
  border: 1px solid var(--pf-line);
  border-radius: 8px;
  background: transparent;
  color: var(--pf-white);
  font-size: 22px;
  transition: background 0.16s ease;

  &:hover {
    background: rgba(145, 132, 217, 0.14);
    border-color: var(--pf-accent);
  }

  &:active {
    background: rgba(145, 132, 217, 0.26);
  }
`;

const Value = styled.div`
  font-size: clamp(52px, 7vw, 76px);
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
`;

const Label = styled.div`
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(233, 233, 237, 0.5);
`;
