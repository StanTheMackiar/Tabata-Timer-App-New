export type SoundId =
  | "prepare"
  | "work"
  | "rest"
  | "stop"
  | "complete"
  | "finalBeep"
  | "pause"
  | "resume";

/**
 * Contrato común a los dos motores de audio.
 *
 * En web lo implementa Howler; en Android e iOS, el plugin nativo. La app
 * consume siempre esta interfaz, así que nada fuera de `context/sound` sabe
 * sobre qué plataforma está sonando.
 */
export interface AudioEngine {
  play(id: SoundId): void;

  /** Corta cualquier sonido en curso. */
  stopAll(): void;

  /** Volumen general, de 0 a 1. */
  setVolume(volume: number): void;

  /** Silencia sólo la voz del coach, sin tocar los pitidos. */
  setCoachMuted(muted: boolean): void;

  /**
   * Carga los sonidos en memoria. Debe invocarse tras una interacción del
   * usuario: los navegadores móviles bloquean la reproducción hasta entonces.
   */
  load(): Promise<void>;

  unload(): void;
}
