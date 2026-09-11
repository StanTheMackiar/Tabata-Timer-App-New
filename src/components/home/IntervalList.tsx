import { FC } from "react";
import { PiCaretRight } from "react-icons/pi";
import styled from "styled-components";
import { TimerType } from "../../enums";
import { TimerPreset } from "../../interfaces";
import { timers } from "../../utils";
import { toClock } from "../../utils/time";

interface Props {
  onEdit: (phase: TimerType) => void;
  preset: TimerPreset;
}

export const IntervalList: FC<Props> = ({ onEdit, preset }) => (
  <Grid>
    {timers.PHASE_ORDER.map((phase) => (
      <Row
        key={phase}
        type="button"
        $color={timers.getPhaseColor(phase)}
        onClick={() => onEdit(phase)}
      >
        <Bar
          $color={timers.getPhaseColor(phase)}
          $glow={timers.getPhaseGlow(phase)}
        />

        <Text>
          <Label $color={timers.getPhaseColor(phase)}>
            {timers.getPhaseLabel(phase)}
          </Label>
          <Hint>{timers.getPhaseHint(phase)}</Hint>
        </Text>

        <ValueGroup>
          <Value>{toClock(preset[phase])}</Value>
          <PiCaretRight color="rgba(233, 233, 237, 0.35)" />
        </ValueGroup>
      </Row>
    ))}
  </Grid>
);

const Grid = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: clamp(8px, 1.3vw, 12px);
`;

const Row = styled.button<{ $color: string }>`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: clamp(14px, 2vw, 22px);
  min-height: 0;
  padding: clamp(14px, 2.2vw, 24px) clamp(16px, 2.4vw, 26px);
  border: 1px solid var(--pf-line);
  border-radius: 16px;
  background: var(--pf-panel);
  color: var(--pf-white);
  overflow: hidden;
  text-align: left;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover,
  &:active {
    border-color: ${({ $color }) => $color};
    transform: translateY(-1px);
  }
`;

const Bar = styled.span<{ $color: string; $glow: string }>`
  width: clamp(5px, 0.6vw, 6px);
  align-self: stretch;
  border-radius: 99px;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 18px ${({ $glow }) => $glow};
`;

const Text = styled.span`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const Label = styled.span<{ $color: string }>`
  font-size: clamp(19px, 2.6vw, 32px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
`;

const Hint = styled.span`
  font-size: clamp(11px, 1.15vw, 13px);
  line-height: 1;
  color: rgba(233, 233, 237, 0.5);
`;

const ValueGroup = styled.span`
  display: flex;
  align-items: center;
  gap: clamp(8px, 1.2vw, 14px);
  font-size: clamp(15px, 1.6vw, 20px);
`;

const Value = styled.span`
  font-size: clamp(40px, 6.4vw, 76px);
  font-weight: 500;
  line-height: 0.85;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
`;
