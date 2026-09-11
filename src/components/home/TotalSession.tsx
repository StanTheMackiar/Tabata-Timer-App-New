import { FC } from "react";
import styled from "styled-components";
import { TimerPreset } from "../../interfaces";
import { getTotalSeconds } from "../../utils/presets";
import { toClock } from "../../utils/time";

interface Props {
  preset: TimerPreset;
}

export const TotalSession: FC<Props> = ({ preset }) => {
  const breakdown = [
    `${preset.cycles} cycles × ${preset.tabatas} tabatas`,
    preset.prepare ? `${preset.prepare}s prep` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Container>
      <div>
        <Kicker>Total session</Kicker>
        <Total>{toClock(getTotalSeconds(preset))}</Total>
      </div>
      <Breakdown>{breakdown}</Breakdown>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: clamp(10px, 1.4vw, 14px);
  border-bottom: 1px solid var(--pf-line);
`;

const Kicker = styled.div`
  margin-bottom: 8px;
  font-size: clamp(10px, 1.1vw, 12px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pf-muted);
`;

const Total = styled.div`
  font-size: clamp(38px, 5.6vw, 64px);
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
`;

const Breakdown = styled.div`
  font-size: clamp(10px, 1.1vw, 12px);
  line-height: 1.5;
  text-align: right;
  color: rgba(233, 233, 237, 0.5);
`;
