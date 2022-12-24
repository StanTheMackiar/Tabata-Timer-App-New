import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TimerFormNumber } from "../interfaces";

export interface InitialValuesReturn {
   minutes: number;
   seconds: number;
   cycles: number;
   tabatas: number;
}

export const useInitialValues = () => {
    
   const [ params ] = useSearchParams()
   const [ form, setForm ] = useState<TimerFormNumber>({} as TimerFormNumber);
   const [ isLoaded, setIsLoaded ] = useState(false);
   

   useEffect(() => {
      const valuesInParams: TimerFormNumber = {
         prepareM          : Number(params.get('prepareM'))  || 0,
         prepareS          : Number(params.get('prepareS'))  || 5,
         workM             : Number(params.get('workM'))     || 0,
         workS             : Number(params.get('workS'))     || 20,
         restM             : Number(params.get('restM'))     || 0,
         restS             : Number(params.get('restS'))     || 10,
         recoveryM         : Number(params.get('recoveryM')) || 0,
         recoveryS         : Number(params.get('recoveryS')) || 15,
         initialCycles     : Number(params.get('cycles'))    || 2,
         initialTabatas    : Number(params.get('tabatas'))   || 4,
      }

      setForm(valuesInParams)
      setIsLoaded(true)
   }, []);

   return {
        form,
        isLoaded

   }

}