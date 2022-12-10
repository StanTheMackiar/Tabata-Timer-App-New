import { ChangeEvent, FC } from 'react';

import styled from "styled-components";
import { InputTypes, TimerForm } from '../../interfaces';

interface Props {
  value: TimerForm,

  onChange: ( event: ChangeEvent<HTMLInputElement>, inputType: InputTypes ) => void,
};

export const CyclesAndTabata: FC<Props> = ({ onChange, value }) => {



  return (
    <InputBox>
      <Label htmlFor="cycles">CYCLES</Label>
      <Input
        id="cycles"
        type="number"
        value={value.cycles}
        name='cycles'
        onChange={(event) => onChange(event, 'cycles')}
        // disabled={timerState.global && "disabled"}
        min="1"
        max="99"
      />
      <Label htmlFor="tabatas">TABATAS</Label>
      <Input
        id="tabatas"
        type="number"
        value={value.tabatas}
        name='tabatas'
        onChange={(event) => onChange(event, 'tabatas')}
        // disabled={timerState.global && "disabled"}
        min="1"
        max="99"
      />
    </InputBox>
  );
}



const InputBox = styled.section`
  display: flex;
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