import { TimerType } from "../enums";
import { TimerFormString } from "../interfaces";


  export const getInputValue = ( inputType: 'minutes' | 'seconds', form: TimerFormString, timerName: TimerType ): string => {

    const selectInputValue = {
        [TimerType.PREPARE]: inputType === 'seconds' ? form.prepareS : form.prepareM,
        [TimerType.WORK]: inputType === 'seconds' ? form.workS : form.workM,
        [TimerType.REST]: inputType === 'seconds' ? form.restS : form.restM,
      }
  
      return selectInputValue[timerName]
  }
