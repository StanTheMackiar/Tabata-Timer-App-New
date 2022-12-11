import { ChangeEvent, createContext, FormEvent } from 'react';
import { InputTypes, TimerFormString } from '../../interfaces';


interface ContextProps {
    form: TimerFormString;

    onChange: (event: ChangeEvent<HTMLInputElement>, inputType: InputTypes) => void,
    onSubmit: (event: FormEvent<HTMLFormElement>) => void,
    
}


export const  FormContext = createContext({} as ContextProps);