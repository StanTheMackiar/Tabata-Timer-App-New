import { TimerType } from "../enums";
import { CountField, PhaseField, TimerPreset } from "../interfaces";

export const PRESETS_QUANTITY = 4;

/** Un tabata sin preparación seguiría siendo válido; un trabajo de 0s, no. */
const MIN_VALUE: Record<PhaseField | CountField, number> = {
  [TimerType.PREPARE]: 0,
  [TimerType.WORK]: 1,
  [TimerType.REST]: 1,
  cycles: 1,
  tabatas: 1,
};

const MAX_VALUE: Record<PhaseField | CountField, number> = {
  [TimerType.PREPARE]: 599,
  [TimerType.WORK]: 599,
  [TimerType.REST]: 599,
  cycles: 20,
  tabatas: 20,
};

export const createInitialPresets = (): TimerPreset[] => [
  { name: "Classic", prepare: 5, work: 20, rest: 10, cycles: 4, tabatas: 3 },
  { name: "Thirty", prepare: 5, work: 30, rest: 10, cycles: 4, tabatas: 3 },
  { name: "Forty", prepare: 5, work: 40, rest: 10, cycles: 4, tabatas: 3 },
  { name: "Fifty", prepare: 5, work: 50, rest: 10, cycles: 4, tabatas: 3 },
];

/** Al pasarse de un extremo se vuelve al contrario, para pulsaciones largas. */
export const stepValue = (
  current: number,
  delta: number,
  field: PhaseField | CountField,
) => {
  const min = MIN_VALUE[field];
  const max = MAX_VALUE[field];
  const next = current + delta;

  if (next > max) return min;
  if (next < min) return max;
  return next;
};

export const clampValue = (value: number, field: PhaseField | CountField) =>
  Math.min(MAX_VALUE[field], Math.max(MIN_VALUE[field], Math.round(value)));

/** Un preset sin preparación arranca directamente en trabajo. */
export const getInitialPhase = (preset: TimerPreset) =>
  preset.prepare > 0 ? TimerType.PREPARE : TimerType.WORK;

export const getTotalSeconds = (preset: TimerPreset) =>
  preset.prepare + (preset.work + preset.rest) * preset.cycles * preset.tabatas;

/**
 * Presets guardados antes del rediseño, cuando cada intervalo eran dos campos
 * de texto (`prepareM` / `prepareS`) y los presets no tenían nombre.
 */
interface LegacyPreset {
  prepareM: string;
  prepareS: string;
  workM: string;
  workS: string;
  restM: string;
  restS: string;
  cycles: string;
  tabatas: string;
}

const isLegacyPreset = (value: unknown): value is LegacyPreset =>
  typeof value === "object" && value !== null && "prepareS" in value;

const fromLegacy = (legacy: LegacyPreset, fallback: TimerPreset): TimerPreset => {
  const seconds = (minutes: string, secs: string) =>
    Number(minutes || 0) * 60 + Number(secs || 0);

  return {
    name: fallback.name,
    prepare: clampValue(seconds(legacy.prepareM, legacy.prepareS), TimerType.PREPARE),
    work: clampValue(seconds(legacy.workM, legacy.workS), TimerType.WORK),
    rest: clampValue(seconds(legacy.restM, legacy.restS), TimerType.REST),
    cycles: clampValue(Number(legacy.cycles), "cycles"),
    tabatas: clampValue(Number(legacy.tabatas), "tabatas"),
  };
};

/**
 * Normaliza lo que haya en localStorage: presets del formato nuevo, del
 * antiguo, o basura. Siempre devuelve PRESETS_QUANTITY presets válidos.
 */
export const parseStoredPresets = (stored: unknown): TimerPreset[] => {
  const defaults = createInitialPresets();
  if (!Array.isArray(stored)) return defaults;

  return defaults.map((fallback, index) => {
    const candidate = stored[index];
    if (isLegacyPreset(candidate)) return fromLegacy(candidate, fallback);
    if (typeof candidate !== "object" || candidate === null) return fallback;

    const preset = candidate as Partial<TimerPreset>;
    return {
      name: typeof preset.name === "string" && preset.name ? preset.name : fallback.name,
      prepare: clampValue(Number(preset.prepare ?? fallback.prepare), TimerType.PREPARE),
      work: clampValue(Number(preset.work ?? fallback.work), TimerType.WORK),
      rest: clampValue(Number(preset.rest ?? fallback.rest), TimerType.REST),
      cycles: clampValue(Number(preset.cycles ?? fallback.cycles), "cycles"),
      tabatas: clampValue(Number(preset.tabatas ?? fallback.tabatas), "tabatas"),
    };
  });
};
