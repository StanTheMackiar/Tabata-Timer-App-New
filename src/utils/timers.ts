import { CurrentStateTimer, TimerFormNumber, TimerTypes } from '../interfaces';


 export const getBGColor = ( timerName: TimerTypes ): string => {

    const selectColor = {
      'prepare': "rgb(32, 174, 199)",
      'work': "rgb(41, 52, 212)",
      'rest': "rgb(102, 40, 218)",
      'recovery': "rgb(144, 41, 212)", 
    }
    return selectColor[timerName]
  }

  export const getTimerValue = ( inputType: 'minutes' | 'seconds', form: TimerFormNumber, timerName: TimerTypes ): number => {

    const selectInputValue = {
        'prepare': inputType === 'seconds' ? form.prepareS : form.prepareM,
        'work': inputType === 'seconds' ? form.workS : form.workM,
        'rest': inputType === 'seconds' ? form.restS : form.restM,
        'recovery': inputType === 'seconds' ? form.recoveryS : form.recoveryM,
      }
  
      return selectInputValue[timerName]
  }


  export const getCurrentTimerState = ( timerState: CurrentStateTimer, timerName: TimerTypes): boolean => {

    const selectCurrentTimer = {
        'prepare': timerState.prepare,
        'work': timerState.work,
        'rest': timerState.rest,
        'recovery': timerState.recovery,
    }

    return selectCurrentTimer[timerName]

  }
