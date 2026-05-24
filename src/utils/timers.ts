import { TimerType } from "../enums";
import { TimerFormNumber } from "../interfaces";
import { COLORS } from "./colors";

export const getBGColor = (timerName: TimerType | null): string => {
  const selectColor = {
    [TimerType.PREPARE]: COLORS.prepare,
    [TimerType.WORK]: COLORS.work,
    [TimerType.REST]: COLORS.rest,
  };
  return timerName ? selectColor[timerName] : COLORS.prepare;
};

export const getTimerValue = (
  inputType: "minutes" | "seconds",
  form: TimerFormNumber,
  timerName: TimerType | null,
): number => {
  const selectInputValue = {
    [TimerType.PREPARE]:
      inputType === "seconds" ? form.prepareS : form.prepareM,
    [TimerType.WORK]: inputType === "seconds" ? form.workS : form.workM,
    [TimerType.REST]: inputType === "seconds" ? form.restS : form.restM,
  };

  return timerName ? selectInputValue[timerName] : 0;
};
