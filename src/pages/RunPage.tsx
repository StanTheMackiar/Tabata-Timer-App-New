import { FC } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { CyclePips, PausedOverlay, PhaseRing, RunPanel } from "../components";
import { Layout } from "../components/layouts/Layout";
import { useTimerContext } from "../context/timer/useTimerContext";
import { useSession, useSessionControls } from "../hooks";
import { AppRoute } from "../routes/routes.enum";
import { BREAKPOINTS } from "../utils/breakpoints";

export const RunPage: FC = () => {
  const session = useSession();
  const { state } = useTimerContext();
  const { stop } = useSessionControls();

  /*
   * Sin sesión en marcha no hay nada que enseñar aquí: se entró por URL, o se
   * volvió atrás desde el resumen. En el segundo caso el destino es el
   * resumen, no el inicio. La sustitución evita que atrás y adelante reboten
   * entre las dos pantallas.
   */
  if (!session) {
    return (
      <Navigate
        to={state.summary ? AppRoute.SUMMARY : AppRoute.HOME}
        replace
      />
    );
  }

  return (
    <Layout
      elapsedLabel={session.elapsedLabel}
      overlay={
        session.isPaused && (
          <PausedOverlay
            phaseLabel={session.phaseLabel}
            timeLabel={session.timeLabel}
            onResume={session.togglePause}
            onStop={stop}
          />
        )
      }
    >
      <Content>
        <Stage>
          <Phase>
            <PhaseDot $color={session.phaseColor} />
            <PhaseLabel $color={session.phaseColor}>
              {session.phaseLabel}
            </PhaseLabel>
          </Phase>

          <PhaseRing
            color={session.phaseColor}
            nextLabel={session.nextLabel}
            phaseProgress={session.phaseProgress}
            sessionProgress={session.sessionProgress}
            timeLabel={session.timeLabel}
          />

          <CyclePips
            color={session.phaseColor}
            pips={session.pips}
          />
        </Stage>

        <RunPanel
          session={session}
          onStop={stop}
        />
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2.2vw, 24px);
  padding: 0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px);
  overflow: hidden;

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    flex-flow: row wrap;
  }
`;

const Stage = styled.section`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 1.6vw, 20px);
  min-height: 0;

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    flex: 1 1 420px;
  }
`;

const Phase = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: none;
`;

const PhaseDot = styled.span<{ $color: string }>`
  width: clamp(9px, 1.05vw, 13px);
  height: clamp(9px, 1.05vw, 13px);
  border-radius: 99px;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 16px ${({ $color }) => $color};
`;

const PhaseLabel = styled.span<{ $color: string }>`
  font-size: clamp(26px, 3.4vw, 44px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
`;
