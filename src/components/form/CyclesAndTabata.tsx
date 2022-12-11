import { ChangeEvent, FC, useContext } from 'react';

import styled from "styled-components";
import { InputTypes, TimerFormString } from '../../interfaces';
import { TimerContext } from '../../context/timer/TimerContex';
import { useLocation } from 'react-router-dom';

interface Props {
  value?: TimerFormString,
  disabled?: boolean,

  onChange?: ( event: ChangeEvent<HTMLInputElement>, inputType: InputTypes ) => void,
}

  const initialValue = {
    cycles: 0,
    tabatas: 0,
  }

  export const CyclesAndTabata: FC<Props> = ({ onChange, value = initialValue, disabled = false }) => {

    const { state } = useContext(TimerContext)
    const { cycles, tabatas } = state.timer

    const location = useLocation();
    const isTimerActive = location.pathname === '/start' || location.pathname === '/start/'


  return (
    <Container isTimerActive={isTimerActive}>
      <Label htmlFor="cycles">CYCLES</Label>
      <Input
        id="cycles"
        type="number"
        value={ isTimerActive ? cycles : value.cycles }
        name='cycles'
        onChange={onChange ? (event) => onChange(event, 'cycles') : () => {''}}
        disabled={disabled}
        min="1"
        max="99"
      />
      <Label htmlFor="tabatas">TABATAS</Label>
      <Input
        id="tabatas"
        type="number"
        value={ isTimerActive ? tabatas : value.tabatas }
        name='tabatas'
        onChange={onChange ? (event) => onChange(event, 'tabatas') : () => {''}}
        disabled={disabled}
        min="1"
        max="99"
      />
    </Container>
  );
}



const Container = styled.section<{ isTimerActive: boolean }>`
  display: flex;
  flex: ${({isTimerActive}) => isTimerActive ? 2 : 1 };
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(92, 42, 139);
  padding: 0.5rem;
  transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  border-top: thin #313131 solid;
  border-bottom: thin #313131 solid;
`;

const Input = styled.input`
  max-width: 4rem;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  background-color: #ffffff22;
  border: none;
  font-family: "Poppins", sans-serif;
  border-radius: 0.2rem;
  color: white;
  outline: none;
`;
const Label = styled.label`
  text-align: center;
  margin-left: 0.5rem;
  display: inline-block;
  font-weight: bold;
`;