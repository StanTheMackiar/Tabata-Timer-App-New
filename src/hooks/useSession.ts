import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { useSoundContext } from "../context/sound/useSoundContext";
import { useTimerContext } from "../context/timer/useTimerContext";
import { TimerType } from "../enums";
import { useAppNavigate } from "../routes/navigation.helper";
import { AppRoute } from "../routes/routes.enum";
import { timers } from "../utils";
import {
  getCyclePips,
  getElapsedSeconds,
  getNextLabel,
  getNextPhase,
  getPhaseCue,
  getPhaseSeconds,
} from "../utils/session";
import { getTotalSeconds } from "../utils/presets";
import { toClock, toShortTime } from "../utils/time";

const COUNTDOWN_BEEPS = [3, 2, 1, 0];

/**
 * Motor de la sesión en curso.
 *
 * El tiempo restante no se descuenta acumulando ticks sino comparando con un
 * instante de fin absoluto, así que el reloj no deriva aunque el navegador
 * retrase un fotograma.
 *
 * Ese restante se lleva en dos resoluciones. La fraccionaria se recalcula en
 * cada fotograma y sólo alimenta lo que se mueve —el anillo y la barra de
 * sesión—, para que avancen de forma continua en vez de a saltos de un
 * segundo. La entera se envía al reducer únicamente cuando cambia de segundo,
 * que es lo que necesitan la cifra del reloj, los pitidos y el cambio de fase;
 * así el contexto no se actualiza sesenta veces por segundo.
 */
export const useSession = () => {
  const { play } = useSoundContext();
  const {
    completeSession,
    enterPhase,
    setPause,
    state,
    tick,
    togglePause,
  } = useTimerContext();

  const navigate = useAppNavigate();

  /** Instante de fin en milisegundos, para no crear un DateTime por fotograma. */
  const endAtRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const pausedRef = useRef(false);
  const pauseRemainingRef = useRef(0);
  const beepedRef = useRef<Set<number>>(new Set());
  const lastWholeSecondRef = useRef<number | null>(null);

  const [remainingExact, setRemainingExact] = useState(0);

  const { preset, session, isPaused } = state;

  const getRemainingExact = () => {
    if (endAtRef.current === null) return session?.remaining ?? 0;
    return Math.max(0, (endAtRef.current - Date.now()) / 1000);
  };

  useEffect(
    function armPhaseEndTime() {
      if (!session) {
        endAtRef.current = null;
        return;
      }

      // Desde el restante y no desde la duración: si se vuelve a /run con una
      // sesión ya en marcha, la fase debe seguir donde estaba en vez de
      // empezar otra vez. En una fase recién iniciada ambos coinciden.
      endAtRef.current = DateTime.now()
        .plus({ seconds: session.remaining })
        .toMillis();

      completedRef.current = false;
      pausedRef.current = false;
      beepedRef.current = new Set();
      lastWholeSecondRef.current = null;
      setRemainingExact(session.remaining);
    },
    [session?.phase, session?.cycle, session?.tabata],
  );

  useEffect(
    function syncPauseWithClock() {
      if (!session || endAtRef.current === null) return;

      if (isPaused && !pausedRef.current) {
        pauseRemainingRef.current = getRemainingExact();
        pausedRef.current = true;
        return;
      }

      if (!isPaused && pausedRef.current) {
        endAtRef.current = DateTime.now()
          .plus({ seconds: pauseRemainingRef.current })
          .toMillis();
        pausedRef.current = false;
      }
    },
    [isPaused, session],
  );

  const playCountdown = (remaining: number) => {
    if (
      !session ||
      session.duration > 60 ||
      !COUNTDOWN_BEEPS.includes(remaining) ||
      beepedRef.current.has(remaining)
    ) {
      return;
    }

    beepedRef.current.add(remaining);
    play("finalBeep");
  };

  const finishPhase = () => {
    if (!preset || !session || completedRef.current) return;
    completedRef.current = true;

    const workDone =
      session.workDone + (session.phase === TimerType.WORK ? preset.work : 0);

    const next = getNextPhase(preset, session);

    if (!next) {
      play("complete");
      completeSession();
      navigate(AppRoute.SUMMARY);
      return;
    }

    play(getPhaseCue(next.phase));
    enterPhase({
      ...next,
      duration: getPhaseSeconds(preset, next.phase),
      workDone,
    });
  };

  useEffect(
    function runClock() {
      if (!session || isPaused) return;

      let frame = requestAnimationFrame(function step() {
        const exact = getRemainingExact();
        setRemainingExact(exact);

        const whole = Math.ceil(exact);
        if (whole !== lastWholeSecondRef.current) {
          lastWholeSecondRef.current = whole;
          tick(whole);
          playCountdown(whole);
        }

        if (exact <= 0) {
          finishPhase();
          return;
        }

        frame = requestAnimationFrame(step);
      });

      return () => cancelAnimationFrame(frame);
    },
    [session?.phase, session?.cycle, session?.tabata, isPaused],
  );

  const toggleSessionPause = () => {
    play(isPaused ? "resume" : "pause");
    togglePause();
  };

  useEffect(function startUnpaused() {
    setPause(false);
  }, []);

  if (!preset || !session) return null;

  // El estado fraccionario arranca a cero antes del primer fotograma.
  const remaining = remainingExact > 0 ? remainingExact : session.remaining;

  const elapsed = getElapsedSeconds(preset, session, remaining);
  const total = getTotalSeconds(preset);

  return {
    cycleLabel: `${session.cycle} / ${preset.cycles}`,
    elapsedLabel: toShortTime(elapsed),
    isPaused,
    nextLabel: getNextLabel(preset, session),
    phase: session.phase,
    phaseColor: timers.getPhaseColor(session.phase),
    phaseLabel: timers.getPhaseLabel(session.phase),
    pips: getCyclePips(preset, session),
    remainingLabel: toShortTime(Math.max(0, total - elapsed)),
    /** Fracción consumida de la fase actual, para el anillo grueso. */
    phaseProgress: session.duration
      ? Math.min(1, Math.max(0, 1 - remaining / session.duration))
      : 0,
    sessionProgress: total ? Math.min(1, elapsed / total) : 0,
    tabataLabel: `${session.tabata} / ${preset.tabatas}`,
    timeLabel: toClock(session.remaining),
    togglePause: toggleSessionPause,
  };
};

export type SessionView = NonNullable<ReturnType<typeof useSession>>;
