import { FC, useEffect } from "react";
import { PiArrowCounterClockwise, PiCheckCircleFill } from "react-icons/pi";
import styled from "styled-components";
import { GhostAction, PrimaryAction } from "../components";
import { usePresetsContext } from "../context/presets/usePresetsContext";
import { useTimerContext } from "../context/timer/useTimerContext";
import { useSessionControls } from "../hooks";
import { useAppNavigate } from "../routes/navigation.helper";
import { AppRoute } from "../routes/routes.enum";
import { COLORS } from "../utils/colors";
import { toShortTime } from "../utils/time";

/**
 * Pantalla de fin de sesión. Va sin cabecera y sobre fondo plano, a pantalla
 * completa: la sesión ha terminado y no hay nada más que ofrecer aquí.
 */
export const SummaryPage: FC = () => {
  const { state } = useTimerContext();
  const { preset } = usePresetsContext();
  const { dismissSummary, start } = useSessionControls();

  const navigate = useAppNavigate();
  const { summary } = state;

  useEffect(
    function leaveWhenThereIsNoSummary() {
      if (!summary) navigate(AppRoute.HOME);
    },
    [summary],
  );

  if (!summary) return null;

  const stats = [
    { label: "Work time", value: toShortTime(summary.workDone), color: COLORS.work },
    { label: "Total", value: toShortTime(summary.total), color: COLORS.white },
    { label: "Cycles", value: String(summary.cycles), color: COLORS.white },
    { label: "Tabatas", value: String(summary.tabatas), color: COLORS.white },
  ];

  return (
    <Screen>
      <Intro>
        <Kicker>
          <PiCheckCircleFill
            size={26}
            color={COLORS.work}
          />
          Session complete
        </Kicker>
        <Headline>{summary.tabatas} tabatas down. Nice work.</Headline>
      </Intro>

      <Stats>
        {stats.map((stat) => (
          <Stat key={stat.label}>
            <StatLabel>{stat.label}</StatLabel>
            <StatValue $color={stat.color}>{stat.value}</StatValue>
          </Stat>
        ))}
      </Stats>

      <Actions>
        <PrimaryAction
          type="button"
          onClick={() => start(preset)}
        >
          <PiArrowCounterClockwise color="var(--pf-accent)" />
          Again
        </PrimaryAction>

        <GhostAction
          type="button"
          onClick={dismissSummary}
        >
          Done
        </GhostAction>
      </Actions>
    </Screen>
  );
};

const Screen = styled.main`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(16px, 2.4vw, 28px);
  overflow: hidden;
  user-select: none;
  background: var(--pf-bg);
  animation: pf-fade 0.2s ease-out;

  padding: calc(clamp(24px, 4vw, 56px) + var(--pf-safe-top))
    calc(clamp(24px, 4vw, 56px) + var(--pf-safe-right))
    calc(clamp(24px, 4vw, 56px) + var(--pf-safe-bottom))
    calc(clamp(24px, 4vw, 56px) + var(--pf-safe-left));
`;

const Intro = styled.div`
  animation: pf-rise 0.26s ease-out;
`;

const Kicker = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: clamp(10px, 1.4vw, 16px);
  font-size: clamp(10px, 1.1vw, 12px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${COLORS.work};
`;

const Headline = styled.div`
  max-width: 16ch;
  font-size: clamp(34px, 5.4vw, 68px);
  font-weight: 500;
  line-height: 0.92;
  letter-spacing: -0.03em;
  text-wrap: pretty;
`;

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(8px, 1.2vw, 14px);
  animation: pf-rise 0.32s ease-out;
`;

const Stat = styled.div`
  flex: 1 1 120px;
  padding: clamp(12px, 1.6vw, 18px);
  border: 1px solid var(--pf-line);
  border-radius: var(--pf-radius);
  background: var(--pf-panel);
`;

const StatLabel = styled.div`
  margin-bottom: 9px;
  font-size: clamp(9.5px, 1vw, 11px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pf-muted);
`;

const StatValue = styled.div<{ $color: string }>`
  font-size: clamp(26px, 3.4vw, 44px);
  font-weight: 500;
  line-height: 0.85;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: ${({ $color }) => $color};
`;

const Actions = styled.div`
  display: flex;
  gap: clamp(8px, 1.2vw, 12px);
  animation: pf-rise 0.38s ease-out;

  > button {
    flex: 1;
  }
`;
