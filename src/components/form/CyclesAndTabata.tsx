import { ChangeEvent, FC, useContext } from "react";

import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { TimerContext } from "../../context/timer/useTimerContex";
import { InputTypes, TimerFormString } from "../../interfaces";
import { AppRoute } from "../../routes/routes.enum";

interface Props {
  value?: TimerFormString;
  disabled?: boolean;

  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    inputType: InputTypes,
  ) => void;
}

const initialValue = {
  cycles: 0,
  tabatas: 0,
};

export const CyclesAndTabata: FC<Props> = ({
  onChange,
  value = initialValue,
  disabled = false,
}) => {
  const { state } = useContext(TimerContext);
  const { cycles, tabatas } = state.timer;

  const location = useLocation();
  const isTimerActive = location.pathname.startsWith(AppRoute.START);

  return (
    <Container isTimerActive={isTimerActive}>
      <Label htmlFor="cycles">CYCLES</Label>
      <Input
        id="cycles"
        type="number"
        value={isTimerActive ? cycles : value.cycles}
        name="cycles"
        onChange={
          onChange
            ? (event) => onChange(event, "cycles")
            : () => {
                "";
              }
        }
        disabled={disabled}
        min="1"
        max="99"
      />

      <Label htmlFor="tabatas">TABATAS</Label>
      <Input
        id="tabatas"
        type="number"
        value={isTimerActive ? tabatas : value.tabatas}
        name="tabatas"
        onChange={
          onChange
            ? (event) => onChange(event, "tabatas")
            : () => {
                "";
              }
        }
        disabled={disabled}
        min="1"
        max="99"
      />
    </Container>
  );
};

const Container = styled.section<{ isTimerActive: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;
  align-items: center;
  gap: clamp(0.45rem, 1.5vw, 10px);
  border-radius: 0.85rem;
  background-color: transparent;
  padding: 0;
  transition: all 0.3s ease-in-out;

  @media (min-width: 1050px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Input = styled.input`
  width: 100%;
  min-height: clamp(4.4rem, 14dvh, 6rem);
  text-align: center;
  font-size: clamp(2.4rem, 11vw, 4.5rem);
  font-weight: 900;
  background-color: var(--pf-panel-alt);
  border: none;
  border-radius: 0.85rem;
  color: var(--pf-white);
  outline: none;
`;

const Label = styled.label`
  text-align: center;
  display: inline-block;
  font-weight: 800;
  color: var(--pf-muted);

  @media (min-width: 1050px) {
    align-self: end;
  }
`;
