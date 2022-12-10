import { FC, PropsWithChildren } from 'react'
import { useForm } from '../../hooks';
import { FormContext } from './';


export const FormProvider: FC<PropsWithChildren> = ({ children }) => {

    
  const { form, onChange, onSubmit } = useForm();

   return (
       <FormContext.Provider value={{
         form,

         onChange,
         onSubmit

       }}>
          { children }
       </FormContext.Provider>
   )
};