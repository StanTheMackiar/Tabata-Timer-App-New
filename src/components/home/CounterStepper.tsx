import { FC } from "react";
import { PiMinus, PiPlus } from "react-icons/pi";
import styled from "styled-components";

interface Props {
  label: string;
  onStep: (delta: number) => void;
  value: number;
}

/**
 * Ciclos y tabatas se ajustan aquí mismo, sin abrir el diálogo. Los botones
 * miden 44px: el mínimo cómodo para el pulgar a mitad de entreno.
 */
export const CounterStepper: FC<Props> = ({ label, onStep, value }) => (
  <Container>
    <StepButton
      type="button"
      aria-label={`Decrease ${label}`}
      onClick={() => onStep(-1)}
    >
      <PiMinus />
    </StepButton>

    <Text>
      <Value>{String(value).padStart(2, "0")}</Value>
      <Label>{label}</Label>
    </Text>

    <StepButton
      type="button"
      aria-label={`Increase ${label}`}
      onClick={() => onStep(1)}
    >
      <PiPlus />
    </StepButton>
  </Container>
);

const Container = styled.div`
  flex: 1 1 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: clamp(8px, 1.1vw, 12px) clamp(10px, 1.3vw, 14px);
  border: 1px solid var(--pf-line);
  border-radius: var(--pf-radius);
  background: var(--pf-panel);
`;

const StepButton = styled.button`
  width: 44px;
  height: 44px;
  flex: none;
  display: grid;
  place-items: center;
  border: 1px solid var(--pf-line);
  border-radius: 8px;
  background: transparent;
  color: var(--pf-white);
  font-size: 18px;
  transition: background 0.16s ease;

  &:hover {
    background: rgba(145, 132, 217, 0.14);
    border-color: var(--pf-accent);
  }

  &:active {
    background: rgba(145, 132, 217, 0.24);
  }
`;

const Text = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  min-width: 0;
`;

const Value = styled.span`
  font-size: clamp(26px, 3.2vw, 40px);
  font-weight: 500;
  line-height: 0.85;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
`;

const Label = styled.span`
  font-size: clamp(9.5px, 1vw, 11px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pf-muted);
`;
