import { useSpring } from "@react-spring/web";
import { DateTime } from "luxon";
import { useEffect, useRef } from "react";
import { Props as useTimerProps } from "../components";
import { useSoundContext } from "../context/sound/useSoundContext";
import { useTimerContext } from "../context/timer/useTimerContex";
import { timers } from "../utils";
import { useInterval } from "./useInterval";
import { useStopButton } from "./useStopButton";

const secondsFromTimer = (minutes: number, seconds: number) =>
  minutes * 60 + seconds;

export const useTimer = ({ currentTimerName, form }: useTimerProps) => {
  const {
    finalBeepSound,
    oneSound,
    startBeepSound,
    threeSound,
    twoSound,
    workSound,
    restSound,
  } = useSoundContext();

  const {
    changeMinutes,
    changeSeconds,
    changeCycles,
    changeTabatas,
    runTimer,
    stopAllTimers,
    state,
    togglePause,
    setPause,
  } = useTimerContext();

  const stopButton = useStopButton();
  const endAtRef = useRef<DateTime | null>(null);
  const activatedRef = useRef(false);
  const completedRef = useRef(false);
  const pausedRef = useRef(false);
  const pauseRemainingRef = useRef(0);
  const beepedRef = useRef<Set<number>>(new Set());

  const bgColor = timers.getBGColor(currentTimerName);
  const currentTimerState = timers.getCurrentTimerState(
    state.timerState,
    currentTimerName,
  );
  const initialMinutes = timers.getTimerValue(
    "minutes",
    form,
    currentTimerName,
  );
  const initialSeconds = timers.getTimerValue(
    "seconds",
    form,
    currentTimerName,
  );
  const { minutes, seconds, cycles, tabatas } = state.timer;

  useEffect(() => {
    if (currentTimerName !== "prepare") return;

    changeMinutes(form.prepareM);
    changeSeconds(form.prepareS);
    changeCycles(form.initialCycles);
    changeTabatas(form.initialTabatas);
    runTimer("prepare");
    setPause(false);
  }, []);

  useEffect(() => {
    if (!currentTimerState) {
      activatedRef.current = false;
      return;
    }

    if (!activatedRef.current) {
      endAtRef.current = DateTime.now().plus({
        seconds: secondsFromTimer(minutes, seconds),
      });
      completedRef.current = false;
      pausedRef.current = false;
      beepedRef.current = new Set();
      activatedRef.current = true;
    }
  }, [currentTimerState]);

  useEffect(() => {
    if (!currentTimerState || !endAtRef.current) return;

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
  }, [currentTimerState, state.isPaused]);

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
    if (remainingSeconds === 3) threeSound.play();
    if (remainingSeconds === 2) twoSound.play();
    if (remainingSeconds === 1) oneSound.play();
    finalBeepSound.play();
    if (remainingSeconds === 0) startBeepSound.play();
  };

  const finishCurrentTimer = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    stopAllTimers();

    if (currentTimerName === "prepare") {
      changeMinutes(form.workM);
      changeSeconds(form.workS);
      workSound.play();
      runTimer("work");
      return;
    }

    if (currentTimerName === "work") {
      changeMinutes(form.restM);
      changeSeconds(form.restS);
      restSound.play();
      runTimer("rest");
      return;
    }

    const nextCycles = cycles > 1 ? cycles - 1 : form.initialCycles;
    const nextTabatas = cycles > 1 ? tabatas : tabatas - 1;

    if (nextTabatas < 1) {
      stopButton.stopTimer();
      return;
    }

    changeCycles(nextCycles);
    changeTabatas(nextTabatas);
    changeMinutes(form.workM);
    changeSeconds(form.workS);
    workSound.play();
    runTimer("work");
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
    currentTimerState && !state.isPaused ? 250 : null,
  );

  const workTimerStyle = useSpring({
    color: "#111111",
    textAlign: "center",
    fontWeight: "900",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: currentTimerState ? "clamp(5rem, 22vw, 9rem)" : "2.25rem",
    margin: currentTimerState ? "1rem 0" : "0",
    config: {
      tension: 1000,
      mass: 3,
      friction: 50,
    },
  });

  return {
    bgColor,
    currentTimerState,
    minutes,
    togglePause,
    seconds,
    isPaused: state.isPaused,
    workTimerStyle,
    initialMinutes,
    initialSeconds,
  };
};
