import { DateTime } from "luxon";
import { useEffect, useRef } from "react";
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
import { useInterval } from "./useInterval";

const COUNTDOWN_BEEPS = [3, 2, 1, 0];

/**
 * Motor de la sesión en curso.
 *
 * El tiempo restante no se descuenta acumulando ticks sino comparando con un
 * instante de fin absoluto, así que el reloj no deriva aunque el navegador
 * retrase el intervalo.
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

  const endAtRef = useRef<DateTime | null>(null);
  const completedRef = useRef(false);
  const pausedRef = useRef(false);
  const pauseRemainingRef = useRef(0);
  const beepedRef = useRef<Set<number>>(new Set());

  const { preset, session, isPaused } = state;

  useEffect(
    function armPhaseEndTime() {
      if (!session) {
        endAtRef.current = null;
        return;
      }

      // Desde el restante y no desde la duración: si se vuelve a /run con una
      // sesión ya en marcha, la fase debe seguir donde estaba en vez de
      // empezar otra vez. En una fase recién iniciada ambos coinciden.
      endAtRef.current = DateTime.now().plus({ seconds: session.remaining });
      completedRef.current = false;
      pausedRef.current = false;
      beepedRef.current = new Set();
    },
    [session?.phase, session?.cycle, session?.tabata],
  );

  useEffect(
    function syncPauseWithClock() {
      if (!session || !endAtRef.current) return;

      if (isPaused && !pausedRef.current) {
        pauseRemainingRef.current = getRemainingSeconds();
        pausedRef.current = true;
        return;
      }

      if (!isPaused && pausedRef.current) {
        endAtRef.current = DateTime.now().plus({
          seconds: pauseRemainingRef.current,
        });
        pausedRef.current = false;
      }
    },
    [isPaused, session],
  );

  const getRemainingSeconds = () => {
    if (!endAtRef.current) return session?.duration ?? 0;

    return Math.max(
      0,
      Math.ceil(endAtRef.current.diff(DateTime.now(), "seconds").seconds),
    );
  };

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

  useInterval(
    () => {
      const remaining = getRemainingSeconds();
      tick(remaining);
      playCountdown(remaining);

      if (remaining === 0) finishPhase();
    },
    session && !isPaused ? 250 : null,
  );

  const toggleSessionPause = () => {
    play(isPaused ? "resume" : "pause");
    togglePause();
  };

  useEffect(function startUnpaused() {
    setPause(false);
  }, []);

  if (!preset || !session) return null;

  const elapsed = getElapsedSeconds(preset, session, session.remaining);
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
      ? Math.min(1, Math.max(0, 1 - session.remaining / session.duration))
      : 0,
    sessionProgress: total ? Math.min(1, elapsed / total) : 0,
    tabataLabel: `${session.tabata} / ${preset.tabatas}`,
    timeLabel: toClock(session.remaining),
    togglePause: toggleSessionPause,
  };
};

export type SessionView = NonNullable<ReturnType<typeof useSession>>;
