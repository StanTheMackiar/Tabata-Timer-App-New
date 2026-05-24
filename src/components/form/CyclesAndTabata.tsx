import { ChangeEvent, FC, useContext } from "react";

import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { TimerContext } from "../../context/timer/useTimerContex";
import { InputTypes, TimerFormString } from "../../interfaces";

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
  const isTimerActive =
    location.pathname === "/start" || location.pathname === "/start/";

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
  display: flex;
  flex: ${({ isTimerActive }) => (isTimerActive ? 2 : 1)};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(92, 42, 139);
  gap: 1rem;
  margin: 0 1rem 1rem;
  border-radius: 0.35rem;
  background-color: transparent;
  padding: 0;
  transition: all 0.3s ease-in-out;
`;

const Input = styled.input`
  width: min(28vw, 8rem);
  min-height: 6rem;
  text-align: center;
  font-size: clamp(2.75rem, 14vw, 5rem);
  font-weight: 900;
  background-color: var(--pf-white);
  border: none;
  border-radius: 0.35rem;
  color: #111;
  outline: none;
`;
const Label = styled.label`
  text-align: center;
  display: inline-block;
  font-weight: 800;
  color: var(--pf-white);
`;
