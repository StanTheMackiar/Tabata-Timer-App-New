import { SoundId } from "../../interfaces/audio/audio-engine.interface";

import finalBeep from "../../assets/sounds/beeps/321beep.mp3";
import pause from "../../assets/sounds/beeps/pause.mp3";
import resume from "../../assets/sounds/beeps/resume.mp3";
import complete from "../../assets/sounds/coach/complete.mp3";
import prepare from "../../assets/sounds/coach/prepare.mp3";
import rest from "../../assets/sounds/coach/rest.mp3";
import stop from "../../assets/sounds/coach/stop.mp3";
import work from "../../assets/sounds/coach/work.mp3";

/**
 * Vite reescribe cada import a su ruta con hash (/assets/prepare-a1b2c3.mp3),
 * que es lo que necesitan tanto Howler como el plugin nativo.
 */
export const SOUND_SOURCES: Record<SoundId, string> = {
  prepare,
  work,
  rest,
  stop,
  complete,
  finalBeep,
  pause,
  resume,
};

export const SOUND_IDS = Object.keys(SOUND_SOURCES) as SoundId[];

/** Voz del coach: se silencia aparte del volumen general. */
export const COACH_SOUND_IDS: SoundId[] = [
  "prepare",
  "work",
  "rest",
  "stop",
  "complete",
];
