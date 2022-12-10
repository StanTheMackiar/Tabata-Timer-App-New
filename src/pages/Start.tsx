import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TimerForm } from '../interfaces'



export const Start:FC = () => {

   const [ params ] = useSearchParams()
   const [ input, setInput ] = useState<TimerForm>();

   useEffect(() => {
      const valuesInParams: TimerForm = {
         prepareM : params.get('prepareM')  || '00',
         prepareS : params.get('prepareS')  || '05',
         workM    : params.get('workM')     || '00',
         workS    : params.get('workS')     || '20',
         restM    : params.get('restM')     || '00',
         restS    : params.get('restS')     || '10',
         recoveryM: params.get('recoveryM') || '00',
         recoveryS: params.get('recoveryS') || '15',
         cycles   : params.get('cycles')    || '02',
         tabatas  : params.get('tabatas')   || '04',
      }

      setInput(valuesInParams)
   }, []);

   return (
      <>
         <h1>Start</h1>
      </>
   )
}