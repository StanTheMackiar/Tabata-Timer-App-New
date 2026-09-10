import { FC } from "react";
import { PiPause, PiPlayFill, PiStop } from "react-icons/pi";
import styled, { css } from "styled-components";
import { SessionView } from "../../hooks/useSession";
import { GhostAction, PrimaryAction } from "../ui";

interface Props {
  onStop: VoidFunction;
  session: SessionView;
}

export const RunPanel: FC<Props> = ({ onStop, session }) => (
  <Panel>
    <Cards>
      <StatCard>
        <CardLabel>Cycle</CardLabel>
        <CardValue>{session.cycleLabel}</CardValue>
      </StatCard>
      <StatCard>
        <CardLabel>Tabata</CardLabel>
        <CardValue>{session.tabataLabel}</CardValue>
      </StatCard>
    </Cards>

    <SessionCard>
      <CardHead>
        <CardLabel>Session</CardLabel>
        <Remaining>{session.remainingLabel} left</Remaining>
      </CardHead>
      <Track>
        <Fill
          $color={session.phaseColor}
          $progress={session.sessionProgress}
        />
      </Track>
    </SessionCard>

    <Controls>
      <PauseButton
        type="button"
        onClick={session.togglePause}
      >
        {session.isPaused ? (
          <PiPlayFill color="var(--pf-accent)" />
        ) : (
          <PiPause color="var(--pf-accent)" />
        )}
        {session.isPaused ? "Resume" : "Pause"}
      </PauseButton>

      <StopButton
        type="button"
        $danger
        onClick={onStop}
      >
        <PiStop />
        Stop
      </StopButton>
    </Controls>
  </Panel>
);

const Panel = styled.section`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.4vw, 14px);
  min-height: 0;
  justify-content: flex-end;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(8px, 1.2vw, 12px);
`;

const cardSurface = css`
  padding: clamp(10px, 1.4vw, 16px) clamp(12px, 1.6vw, 18px);
  border: 1px solid var(--pf-line);
  border-radius: var(--pf-radius);
  background: var(--pf-panel);
`;

/** Reparte el ancho con su pareja dentro de la fila. */
const StatCard = styled.div`
  ${cardSurface};
  flex: 1 1 110px;
`;

/** Ocupa el ancho completo y sólo el alto de su contenido. */
const SessionCard = styled.div`
  ${cardSurface};
  flex: none;
`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
`;

const CardLabel = styled.div`
  margin-bottom: 8px;
  font-size: clamp(9.5px, 1vw, 11px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pf-muted);

  ${CardHead} & {
    margin-bottom: 0;
  }
`;

const CardValue = styled.div`
  font-size: clamp(28px, 3.4vw, 44px);
  font-weight: 500;
  line-height: 0.85;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
`;

const Remaining = styled.span`
  font-size: clamp(11px, 1.15vw, 13px);
  font-weight: 500;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--pf-accent-soft);
`;

const Track = styled.div`
  height: 5px;
  border-radius: 99px;
  background: var(--pf-faint);
  overflow: hidden;
`;

const Fill = styled.div<{ $color: string; $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => `${($progress * 100).toFixed(1)}%`};
  border-radius: 99px;
  background: ${({ $color }) => $color};
  transition: width 0.3s linear;
`;

const Controls = styled.div`
  display: flex;
  gap: clamp(8px, 1.2vw, 12px);
`;

const PauseButton = styled(PrimaryAction)`
  flex: 2;
  font-size: clamp(15px, 1.8vw, 22px);
`;

const StopButton = styled(GhostAction)`
  flex: 1;
`;
