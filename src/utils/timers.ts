import { TimerType } from "../enums";
import { CurrentStateTimer, TimerFormNumber } from "../interfaces";
import { COLORS } from "./colors";

export const getBGColor = (timerName: TimerType): string => {
  const selectColor = {
    [TimerType.PREPARE]: COLORS.prepare,
    [TimerType.WORK]: COLORS.work,
    [TimerType.REST]: COLORS.rest,
  };
  return selectColor[timerName];
};

export const getTimerValue = (
  inputType: "minutes" | "seconds",
  form: TimerFormNumber,
  timerName: TimerType,
): number => {
  const selectInputValue = {
    [TimerType.PREPARE]:
      inputType === "seconds" ? form.prepareS : form.prepareM,
    [TimerType.WORK]: inputType === "seconds" ? form.workS : form.workM,
    [TimerType.REST]: inputType === "seconds" ? form.restS : form.restM,
  };

  return selectInputValue[timerName];
};

export const getCurrentTimerState = (
  timerState: CurrentStateTimer,
  timerName: TimerType,
): boolean => {
  const selectCurrentTimer = {
    [TimerType.PREPARE]: timerState[TimerType.PREPARE],
    [TimerType.WORK]: timerState[TimerType.WORK],
    [TimerType.REST]: timerState[TimerType.REST],
  };

  return selectCurrentTimer[timerName];
};
