import { TimerType } from "../enums";

/**
 * Un preset guardado. Los tres intervalos se almacenan en segundos totales
 * (no en minutos + segundos por separado), que es lo que permite valores como
 * 01:00 sin casos especiales y simplifica los cálculos de sesión.
 */
export interface TimerPreset {
  name: string;
  prepare: number;
  work: number;
  rest: number;
  cycles: number;
  tabatas: number;
}

/** Campos de `TimerPreset` que representan una duración editable. */
export type PhaseField = TimerType;

/** Campos de `TimerPreset` que representan un contador. */
export type CountField = "cycles" | "tabatas";

/** Qué está editando la hoja inferior, o `null` si está cerrada. */
export type EditorTarget =
  | { kind: "timer"; phase: PhaseField }
  | { kind: "name" };
