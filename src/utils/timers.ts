import { CurrentStateTimer, TimerFormNumber, TimerTypes } from "../interfaces";
import { COLORS } from "./colors";

export const getBGColor = (timerName: TimerTypes): string => {
  const selectColor = {
    prepare: COLORS.prepare,
    work: COLORS.work,
    rest: COLORS.rest,
  };
  return selectColor[timerName];
};

export const getTimerValue = (
  inputType: "minutes" | "seconds",
  form: TimerFormNumber,
  timerName: TimerTypes,
): number => {
  const selectInputValue = {
    prepare: inputType === "seconds" ? form.prepareS : form.prepareM,
    work: inputType === "seconds" ? form.workS : form.workM,
    rest: inputType === "seconds" ? form.restS : form.restM,
  };

  return selectInputValue[timerName];
};

export const getCurrentTimerState = (
  timerState: CurrentStateTimer,
  timerName: TimerTypes,
): boolean => {
  const selectCurrentTimer = {
    prepare: timerState.prepare,
    work: timerState.work,
    rest: timerState.rest,
  };

  return selectCurrentTimer[timerName];
};
