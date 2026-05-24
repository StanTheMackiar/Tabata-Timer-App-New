import { FC } from "react";
import styled from "styled-components";
import { CyclesAndTabata, StartStopButton, Timer } from "../components";
import { Layout } from "../components/layouts/Layout";
import { useTimerContext } from "../context/timer/useTimerContex";
import { useInitialValues } from "../hooks";
import { BREAKPOINTS } from "../utils/breakpoints";

export const StartPage: FC = () => {
  const { form, isLoaded } = useInitialValues();

  const { state } = useTimerContext();

  return (
    <Layout>
      <RunContent>
        {isLoaded && <Timer form={form} />}

        <CyclesAndTabata
          cycles={state.timer.cycles.toString()}
          tabatas={state.timer.tabatas.toString()}
        />
        <StartStopButton action="stop" />
      </RunContent>
    </Layout>
  );
};

const RunContent = styled.section`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.7rem, 2dvh, 1rem);
  padding: clamp(0.75rem, 2.5dvh, 1.25rem);

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    display: grid;
    grid-template-columns: minmax(32rem, 1fr) minmax(18rem, 0.34fr);
    align-items: stretch;
  }
`;
