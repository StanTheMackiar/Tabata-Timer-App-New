import { ChangeEvent, SubmitEventHandler } from "react";
import { InputTypes, TimerFormString } from "../timer.interface";

export interface FormProviderProps {
  form: TimerFormString;
  activePreset: number;
  presets: TimerFormString[];

  onChange: (
    event: ChangeEvent<HTMLInputElement>,
    inputType: InputTypes,
  ) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  setActivePreset: (index: number) => void;
  stepField: (
    field: keyof TimerFormString,
    delta: number,
    inputType: InputTypes,
  ) => void;
  updateField: (field: keyof TimerFormString, value: string) => void;
}
