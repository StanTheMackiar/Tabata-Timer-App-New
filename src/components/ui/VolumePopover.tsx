import { ChangeEvent, FC } from "react";
import { PiMicrophone, PiMicrophoneSlash } from "react-icons/pi";
import styled from "styled-components";
import { COLORS } from "../../utils/colors";

interface Props {
  isCoachMuted: boolean;
  onChangeVolume: (event: ChangeEvent<HTMLInputElement>) => void;
  onToggleCoach: VoidFunction;
  volume: number;
}

/** Sustituye a la barra de volumen fija: devuelve ~64px de alto al reloj. */
export const VolumePopover: FC<Props> = ({
  isCoachMuted,
  onChangeVolume,
  onToggleCoach,
  volume,
}) => (
  <Panel>
    <Row>
      <Label>Master volume</Label>
      <Value>{Math.round(volume * 100)}%</Value>
    </Row>

    <Slider
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      aria-label="Master volume"
      onChange={onChangeVolume}
    />

    <Divider />

    <CoachButton
      type="button"
      onClick={onToggleCoach}
    >
      {isCoachMuted ? (
        <PiMicrophoneSlash color="rgba(233, 233, 237, 0.45)" size={18} />
      ) : (
        <PiMicrophone color={COLORS.accent} size={18} />
      )}
      {isCoachMuted ? "Coach voice off" : "Coach voice on"}
    </CoachButton>
  </Panel>
);

const Panel = styled.div`
  position: absolute;
  top: calc(clamp(60px, 7vw, 80px) + var(--pf-safe-top));
  right: calc(clamp(16px, 3vw, 28px) + var(--pf-safe-right));
  z-index: 30;
  width: min(280px, 72vw);
  padding: 16px;
  border-radius: var(--pf-radius);
  background: var(--pf-panel);
  box-shadow: 0 0 0 1px var(--pf-outline), 0 16px 40px rgba(0, 0, 0, 0.6);
  animation: pf-pop 0.16s ease-out;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(233, 233, 237, 0.6);
`;

const Value = styled.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--pf-accent-soft);
`;

const Slider = styled.input`
  width: 100%;
  accent-color: var(--pf-accent);
`;

const Divider = styled.div`
  height: 1px;
  margin: 14px 0;
  background: linear-gradient(
    to right,
    transparent,
    var(--pf-line) 40px,
    var(--pf-line) calc(100% - 40px),
    transparent
  );
`;

const CoachButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border: 1px solid var(--pf-line);
  border-radius: 8px;
  background: transparent;
  color: var(--pf-white);
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  text-align: left;

  &:hover {
    background: rgba(145, 132, 217, 0.12);
    border-color: var(--pf-accent);
  }
`;
