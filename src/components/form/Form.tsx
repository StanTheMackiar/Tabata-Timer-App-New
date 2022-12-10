
import { FC, useContext } from 'react';

import styled from 'styled-components';
import { CyclesAndTabata, InputTimer, StartStopButton } from '.'

import { FormContext } from '../../context/form';



export const Form: FC = () => {

  const { form, onSubmit, onChange } = useContext(FormContext)

   return (
      <StyledForm onSubmit={ onSubmit }>
        <InputTimer onChange={onChange} title='prepare' value={form} />
        <InputTimer onChange={onChange} title='work' value={form} />
        <InputTimer onChange={onChange} title='rest' value={form} />
        <InputTimer onChange={onChange} title='recovery' value={form} />
        <CyclesAndTabata onChange={onChange} value={form} />
        <StartStopButton />
      </StyledForm>
   )
}


const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: center;
`;