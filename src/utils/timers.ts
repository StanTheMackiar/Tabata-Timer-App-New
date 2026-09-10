import { TimerType } from "../enums";
import { COLORS } from "./colors";

const PHASE_COLOR: Record<TimerType, string> = {
  [TimerType.PREPARE]: COLORS.prepare,
  [TimerType.WORK]: COLORS.work,
  [TimerType.REST]: COLORS.rest,
};

const PHASE_GLOW: Record<TimerType, string> = {
  [TimerType.PREPARE]: COLORS.prepareGlow,
  [TimerType.WORK]: COLORS.workGlow,
  [TimerType.REST]: COLORS.restGlow,
};

const PHASE_LABEL: Record<TimerType, string> = {
  [TimerType.PREPARE]: "Prepare",
  [TimerType.WORK]: "Work",
  [TimerType.REST]: "Rest",
};

/** Se muestra bajo el nombre de cada intervalo en la home. */
const PHASE_HINT: Record<TimerType, string> = {
  [TimerType.PREPARE]: "Get to your mat",
  [TimerType.WORK]: "Max effort interval",
  [TimerType.REST]: "Recover between cycles",
};

export const getPhaseColor = (phase: TimerType | null) =>
  phase ? PHASE_COLOR[phase] : COLORS.accent;

export const getPhaseGlow = (phase: TimerType | null) =>
  phase ? PHASE_GLOW[phase] : COLORS.accentGlow;

export const getPhaseLabel = (phase: TimerType) => PHASE_LABEL[phase];

export const getPhaseHint = (phase: TimerType) => PHASE_HINT[phase];

export const PHASE_ORDER: TimerType[] = [
  TimerType.PREPARE,
  TimerType.WORK,
  TimerType.REST,
];
