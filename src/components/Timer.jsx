// Librerias
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

// Hooks
import useInterval from "../hooks/useInterval";
import { useContext } from "react";
import SoundsContext from "../context/SoundsContext";
import CyclesTabatasContex from "../context/CyclesTabatasContext";
import TimerContext from "../context/TimerContext";

// Estilos

const TimerSection = styled.section`
  background-color: ${({ bgColor }) => bgColor};
  user-select: none;
  margin: 0;
  border-top: #313131 solid;
  border-bottom: #313131 solid;
`;

const Subtitle = styled.h4`
  margin: 0;
  font-size: 2rem;
  text-align: center;
  background-color: #ffffff1f;
  padding: 0.5rem;
  text-transform: uppercase;
`;

// Componente
export default function Timer({
  secondsValue,
  minutesValue,
  actualTimer,
  bgColor,
  timerActualName,
}) {
  const {
    startBeepSound,
    stopBeepSound,
    stopSound,
    finalBeepSound,
    threeSound,
    twoSound,
    oneSound,
    workSound,
    restSound,
  } = useContext(SoundsContext);

  const { tabatas, cycles, setCycles, setTabatas, cyclesValue } =
    useContext(CyclesTabatasContex);

  const {
    handleTimer: finishTimer,
    activateTimer,
    timer,
    changeSeconds,
    changeMinutes,
  } = useContext(TimerContext);

  const { minutes, seconds } = timer;

  //Animaciones
  const workTimerStyle = useSpring({
    from: {
      color: "rgb(255, 255, 255)",
      textAlign: "center",
      fontWeight: "bold",
    },
    to: {
      fontSize: actualTimer ? "90px" : "25px",
      margin: actualTimer ? "8rem 0" : "0.5rem 0",
    },
    config: {
      tension: 1000,
      mass: 3,
      friction: 50,
    },
  });

  // useHooks
  useInterval(
    () => {
      if (timerActualName === "work") {
        if (minutes === 0 && secondsValue < 1) {
          stopBeepSound.play();
          return finishTimer();
        }
      }

      if (seconds > 0) changeSeconds(seconds - 1);

      if (minutes === 0) {
        if (seconds === 4) {
          finalBeepSound.play();
          threeSound.play();
        }
        if (seconds === 3) {
          finalBeepSound.play();
          twoSound.play();
        }
        if (seconds === 2) {
          finalBeepSound.play();
          oneSound.play();
        }
        if (seconds === 0) {
          if (timerActualName === "prepare") {
            activateTimer("prepare", false);
            activateTimer("work");
            startBeepSound.play();
            workSound.play();
          }

          if (timerActualName === "work") {
            if (cycles === 1) {
              if (tabatas === 1) {
                stopBeepSound.play();
                stopSound.play();
                return finishTimer();
              } else {
                setCycles(parseFloat(cyclesValue));
                setTabatas(tabatas - 1);
                activateTimer("work", false);
                activateTimer("recovery");
              }
            } else {
              activateTimer("work", false);
              activateTimer("rest"); 
            }
            restSound.play();
            startBeepSound.play();
          }

          if (timerActualName === "rest") {
            if (cycles > 1) setCycles(cycles - 1);
            activateTimer("rest", false);
            activateTimer("work", true);
            workSound.play();
          }

          if (timerActualName === "recovery") {
            activateTimer("recovery", false);
            activateTimer("work");
            startBeepSound.play();
            workSound.play();
          }
        }
      } else {
        changeMinutes(minutes - 1);
        changeSeconds(59);
      }
    },
    actualTimer ? 1000 : null
  );

  useEffect(() => {
    changeSeconds(parseFloat(secondsValue));
    changeMinutes(parseFloat(minutesValue));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsValue, minutesValue, actualTimer]);

  // Render
  return (
    <>
      {actualTimer && (
        <TimerSection bgColor={bgColor}>
          <Subtitle>{timerActualName}</Subtitle>
          <animated.h2 style={workTimerStyle}>
            {minutes < 10 ? `0${minutes}` : minutes} :{" "}
            {seconds < 10 ? `0${seconds}` : seconds}
          </animated.h2>
        </TimerSection>
      )}
    </>
  );
}
