import { TimerFormString, TimerTypes } from "../interfaces"


  export const getInputValue = ( inputType: 'minutes' | 'seconds', form: TimerFormString, timerName: TimerTypes ): string => {

    const selectInputValue = {
        'prepare': inputType === 'seconds' ? form.prepareS : form.prepareM,
        'work': inputType === 'seconds' ? form.workS : form.workM,
        'rest': inputType === 'seconds' ? form.restS : form.restM,
        'recovery': inputType === 'seconds' ? form.recoveryS : form.recoveryM,
      }
  
      return selectInputValue[timerName]
  }