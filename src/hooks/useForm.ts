import { useState, useContext, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { SoundContext } from "../context/sound";
import { TimerFormString, InputTypes } from "../interfaces";
import { validation } from "../utils";

const initialForm: TimerFormString = {
    prepareM  : '00',
    prepareS  : '05',
    workM     : '00',
    workS     : '20',
    restM     : '00',
    restS     : '10',
    recoveryM : '00',
    recoveryS : '15',
    cycles    : '02',
    tabatas   : '04',
 }

export const useForm = () => {

   const [form, setForm] = useState<TimerFormString>(initialForm);
   const { startBeepSound, prepareSound } = useContext(SoundContext);

   let firstRender = useRef(true)
   const navigate = useNavigate();

   useEffect(() => {
      const newForm = JSON.parse(localStorage.getItem('form') as string) || initialForm;
      setForm(newForm)
   }, []);

   useEffect(() => {
      if ( firstRender.current ) {
         firstRender.current = false;
         return;
      }

      localStorage.setItem('form', JSON.stringify( form ))
   }, [form]);


 
   const onChange = ( { target }: ChangeEvent<HTMLInputElement>, inputType: InputTypes ) => {

      const validatedValue = validation.validateForm( target.value, inputType )

      setForm( prev => ({
         ...prev,
         [ target.name ]: validatedValue
      }))
   }

   const onSubmit = ( event: FormEvent<HTMLFormElement> ) => {
      event.preventDefault();
      prepareSound.play();
      
      navigate(`/start/?prepareM=${form.prepareM}&prepareS=${form.prepareS}&workM=${form.workM}&workS=${form.workS}&restM=${form.restM}&restS=${form.restS}&recoveryM=${form.recoveryM}&recoveryS=${form.recoveryS}&cycles=${form.cycles}&tabatas=${form.tabatas}`)

   }

    return {
        form,
        
        onChange,
        onSubmit,
    }
}