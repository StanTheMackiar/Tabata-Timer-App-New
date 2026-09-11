import { TimerType } from "../enums";
import { SoundId } from "../interfaces/audio/audio-engine.interface";
import { TimerPreset } from "../interfaces";
import { TimerSession } from "../context/timer/timerReducer";
import { toShortTime } from "./time";

export const getPhaseSeconds = (preset: TimerPreset, phase: TimerType) =>
  preset[phase];

const PHASE_CUE: Record<TimerType, SoundId> = {
  [TimerType.PREPARE]: "prepare",
  [TimerType.WORK]: "work",
  [TimerType.REST]: "rest",
};

/** Aviso de voz que anuncia la entrada en cada fase. */
export const getPhaseCue = (phase: TimerType): SoundId => PHASE_CUE[phase];

/**
 * Siguiente fase de la sesión, o `null` si ya no queda ninguna.
 *
 * Un ciclo es trabajo + descanso; agotados los ciclos empieza el siguiente
 * tabata, y agotados los tabatas termina la sesión.
 */
export const getNextPhase = (
  preset: TimerPreset,
  session: TimerSession,
): Pick<TimerSession, "phase" | "cycle" | "tabata"> | null => {
  const { phase, cycle, tabata } = session;

  if (phase === TimerType.PREPARE) {
    return { phase: TimerType.WORK, cycle, tabata };
  }

  if (phase === TimerType.WORK) {
    return { phase: TimerType.REST, cycle, tabata };
  }

  if (cycle < preset.cycles) {
    return { phase: TimerType.WORK, cycle: cycle + 1, tabata };
  }

  if (tabata < preset.tabatas) {
    return { phase: TimerType.WORK, cycle: 1, tabata: tabata + 1 };
  }

  return null;
};

/** Segundos consumidos de la sesión completa, incluida la fase en curso. */
export const getElapsedSeconds = (
  preset: TimerPreset,
  session: TimerSession,
  remaining: number,
) => {
  const perCycle = preset.work + preset.rest;
  const cyclesDone = (session.tabata - 1) * preset.cycles + (session.cycle - 1);

  const beforeCurrentPhase =
    (session.phase === TimerType.PREPARE ? 0 : preset.prepare) +
    cyclesDone * perCycle +
    (session.phase === TimerType.REST ? preset.work : 0);

  return beforeCurrentPhase + (session.duration - remaining);
};

export const getNextLabel = (preset: TimerPreset, session: TimerSession) => {
  const next = getNextPhase(preset, session);
  if (!next) return "Finish";

  const label = next.phase === TimerType.WORK ? "Work" : "Rest";
  return `${label} ${toShortTime(getPhaseSeconds(preset, next.phase))}`;
};

export interface CyclePip {
  isActive: boolean;
  isDone: boolean;
}

/** Un punto por ciclo del tabata en curso; el activo se alarga. */
export const getCyclePips = (
  preset: TimerPreset,
  session: TimerSession,
): CyclePip[] =>
  Array.from({ length: preset.cycles }, (_, index) => {
    const cycle = index + 1;
    return { isActive: cycle === session.cycle, isDone: cycle < session.cycle };
  });
