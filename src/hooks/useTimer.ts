import { DateTime } from "luxon";
import { useEffect, useRef } from "react";
import { Props as useTimerProps } from "../components";
import { useSoundContext } from "../context/sound/useSoundContext";
import { useTimerContext } from "../context/timer/useTimerContex";
import { TimerType } from "../enums";
import { timers } from "../utils";
import { useInterval } from "./useInterval";
import { useStopButton } from "./useStopButton";

const secondsFromTimer = (minutes: number, seconds: number) =>
  minutes * 60 + seconds;

export const useTimer = ({ form }: useTimerProps) => {
  const { finalBeepSound, workSound, restSound, pauseSound, resumeSound } =
    useSoundContext();

  const {
    changeMinutes,
    changeSeconds,
    runTimer,
    state,
    togglePause,
    setPause,
  } = useTimerContext();

  const stopButton = useStopButton();
  const endAtRef = useRef<DateTime | null>(null);
  const completedRef = useRef(false);
  const pausedRef = useRef(false);
  const pauseRemainingRef = useRef(0);
  const beepedRef = useRef<Set<number>>(new Set());

  const bgColor = timers.getBGColor(state.activeTimer);

  const { minutes, seconds, cycles, tabatas } = state.timer;

  useEffect(function initializePrepareTimer() {
    if (state.activeTimer) return;

    runTimer({
      timerName: TimerType.PREPARE,
      minutes: form.prepareM,
      seconds: form.prepareS,
      cycles: form.initialCycles,
      tabatas: form.initialTabatas,
    });
    setPause(false);
  }, []);

  useEffect(
    function armCurrentTimerEndTime() {
      if (!state.activeTimer) {
        endAtRef.current = null;
        return;
      }

      endAtRef.current = DateTime.now().plus({
        seconds: secondsFromTimer(minutes, seconds),
      });
      completedRef.current = false;
      pausedRef.current = false;
      beepedRef.current = new Set();
    },
    [state.activeTimer],
  );

  useEffect(
    function syncPauseStateWithTimerClock() {
      if (!state.activeTimer || !endAtRef.current) return;

      if (state.isPaused && !pausedRef.current) {
        pauseRemainingRef.current = getRemainingSeconds();
        pausedRef.current = true;
        return;
      }

      if (!state.isPaused && pausedRef.current) {
        endAtRef.current = DateTime.now().plus({
          seconds: pauseRemainingRef.current,
        });
        pausedRef.current = false;
      }
    },
    [state.activeTimer, state.isPaused],
  );

  const getRemainingSeconds = () => {
    if (!endAtRef.current) return secondsFromTimer(minutes, seconds);
    return Math.max(
      0,
      Math.ceil(endAtRef.current.diff(DateTime.now(), "seconds").seconds),
    );
  };

  const playCountdown = (remainingSeconds: number) => {
    if (
      minutes !== 0 ||
      ![3, 2, 1, 0].includes(remainingSeconds) ||
      beepedRef.current.has(remainingSeconds)
    ) {
      return;
    }

    beepedRef.current.add(remainingSeconds);
    finalBeepSound.play();
  };

  const finishCurrentTimer = () => {
    if (completedRef.current) return;
    completedRef.current = true;

    if (state.activeTimer === TimerType.PREPARE) {
      workSound.play();
      runTimer({
        timerName: TimerType.WORK,
        minutes: form.workM,
        seconds: form.workS,
      });
      return;
    }

    if (state.activeTimer === TimerType.WORK) {
      restSound.play();
      runTimer({
        timerName: TimerType.REST,
        minutes: form.restM,
        seconds: form.restS,
      });
      return;
    }

    const nextCycles = cycles > 1 ? cycles - 1 : form.initialCycles;
    const nextTabatas = cycles > 1 ? tabatas : tabatas - 1;

    if (nextTabatas < 1) {
      stopButton.stopTimer({ complete: true });
      return;
    }

    workSound.play();
    runTimer({
      timerName: TimerType.WORK,
      minutes: form.workM,
      seconds: form.workS,
      cycles: nextCycles,
      tabatas: nextTabatas,
    });
  };

  const toggleTimerPause = () => {
    if (state.isPaused) {
      resumeSound.play();
    } else {
      pauseSound.play();
    }
    togglePause();
  };

  useInterval(
    () => {
      const remainingSeconds = getRemainingSeconds();
      changeMinutes(Math.floor(remainingSeconds / 60));
      changeSeconds(remainingSeconds % 60);
      playCountdown(remainingSeconds);

      if (remainingSeconds === 0) {
        finishCurrentTimer();
      }
    },
    state.activeTimer && !state.isPaused ? 250 : null,
  );

  return {
    bgColor,
    activeTimer: state.activeTimer,
    minutes,
    togglePause: toggleTimerPause,
    seconds,
    isPaused: state.isPaused,
  };
};
