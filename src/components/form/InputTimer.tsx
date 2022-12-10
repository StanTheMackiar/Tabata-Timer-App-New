import { ChangeEvent} from "react";
import styled from "styled-components";
import { FC } from 'react';
import { InputTypes, TimerForm, TimerTypes } from "../../interfaces";

interface Props {
  value: TimerForm,
  title: TimerTypes,
  
  onChange: ( event: ChangeEvent<HTMLInputElement>, inputType: InputTypes ) => void,
};

export const InputTimer: FC<Props> = ({ value, title, onChange }) =>  {

  const bgColor = {
    'prepare': "rgb(32, 174, 199)",
    'work': "rgb(41, 52, 212)",
    'rest': "rgb(102, 40, 218)",
    'recovery': "rgb(144, 41, 212)",
  }

  const seconds = {
    'prepare': value.prepareS,
    'work': value.workS,
    'rest': value.restS,
    'recovery': value.recoveryS,
  }

  const minutes = {
    'prepare': value.prepareM,
    'work': value.workM,
    'rest': value.restM,
    'recovery': value.recoveryM,
  }

  return (

        <Container bgColor={ bgColor[title] }>
          <Subtitle>{title}</Subtitle>
            <Input
              type="number"
              min="0"
              max="99"
              name={`${title}M`}
              value={ minutes[title] }
              onChange={(event) => onChange(event, 'minutes')}
            />
            <Span>:</Span>
            <Input
              type="number"
              min="1"
              max="59"
              name={`${title}S`}
              value={ seconds[title] }
              onChange={(event) => onChange(event, 'seconds')}
            />
        </Container>
  );
}


const Container = styled.div<{ bgColor: string }>`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  margin: 0;
  padding: 0rem 1rem;
  transition: all 0.3s ease-in-out;
  border-top: thin #313131 solid;
  border-bottom: thin #313131 solid;
`;

const Input = styled.input`
  font-size: 30px;
  color: rgb(255, 255, 255);
  background-color: #ffffff22;
  font-weight: bold;
  max-width: 5rem;
  border: none;
  border-radius: 0.2rem;
  outline: none;
  text-align: center;
  font-family: "Poppins", sans-serif;
`;

const Span = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin: 0 0.5rem;
`;

const Subtitle = styled.h4`
  text-align: center;
  text-transform: uppercase;
  font-size: 1.2rem;
  margin: 1.2rem 0;
  width: 100%;
  text-align: left;
`;
