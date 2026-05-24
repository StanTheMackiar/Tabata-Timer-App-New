export interface TimerFormString {
  prepareM: string;
  prepareS: string;
  restM: string;
  restS: string;
  workM: string;
  workS: string;
  cycles: string;
  tabatas: string;
}

export interface TimerFormNumber {
  prepareM: number;
  prepareS: number;
  restM: number;
  restS: number;
  workM: number;
  workS: number;
  initialCycles: number;
  initialTabatas: number;
}

export type TimerTypes = "prepare" | "work" | "rest";
export type InputTypes = "minutes" | "seconds" | "cycles" | "tabatas";

export interface ITimers {
  prepare: number;
  work: number;
  rest: number;
}

export interface CurrentStateTimer {
  prepare: boolean;
  work: boolean;
  rest: boolean;
}
