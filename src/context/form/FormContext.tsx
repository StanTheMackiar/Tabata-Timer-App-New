import { ChangeEvent, createContext, FormEvent } from 'react';
import { InputTypes, TimerForm } from '../../interfaces';


interface ContextProps {
    form: TimerForm;

    onChange: (event: ChangeEvent<HTMLInputElement>, inputType: InputTypes) => void,
    onSubmit: (event: FormEvent<HTMLFormElement>) => void,
    
}


export const  FormContext = createContext({} as ContextProps);