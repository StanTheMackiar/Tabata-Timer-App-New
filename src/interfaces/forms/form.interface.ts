import { TimerFormString, TimerTypes } from "../timer.interface";

export type TimerField = keyof Pick<
  TimerFormString,
  "prepareM" | "prepareS" | "workM" | "workS" | "restM" | "restS"
>;

export type CountField = keyof Pick<TimerFormString, "cycles" | "tabatas">;

export type FormEditor =
  | {
      kind: "timer";
      title: TimerTypes;
      minutes: TimerField;
      seconds: TimerField;
    }
  | { kind: "count"; title: CountField; field: CountField };

export type FormTimerEditor = Extract<FormEditor, { kind: "timer" }>;
