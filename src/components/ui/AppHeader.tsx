import { FC } from "react";
import { PiMicrophone, PiMicrophoneSlash, PiSpeakerHigh, PiSpeakerX } from "react-icons/pi";
import styled from "styled-components";
import { useTimerContext } from "../../context/timer/useTimerContext";
import { COLORS } from "../../utils/colors";
import { IconButton } from "./IconButton";

interface Props {
  elapsedLabel?: string;
  isCoachMuted: boolean;
  onToggleCoach: VoidFunction;
  onToggleVolume: VoidFunction;
  phaseColor: string;
  volume: number;
}

export const AppHeader: FC<Props> = ({
  elapsedLabel,
  isCoachMuted,
  onToggleCoach,
  onToggleVolume,
  phaseColor,
  volume,
}) => {
  const { state } = useTimerContext();
  const isRunning = Boolean(state.session);

  return (
    <Header>
      <Brand>
        <BrandMark
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10.2"
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="1.6"
            strokeDasharray="42 22"
            strokeLinecap="round"
            transform="rotate(-90 12 12)"
          />
          <path
            d="M8 8.4h8M12 8.4V16"
            stroke={COLORS.white}
            strokeWidth="1.7"
            strokeLinecap="round"
            fill="none"
          />
        </BrandMark>
        <BrandName>Workbata</BrandName>
      </Brand>

      {isRunning && elapsedLabel && (
        <ElapsedPill>
          <PulseDot $color={phaseColor} />
          {elapsedLabel} elapsed
        </ElapsedPill>
      )}

      <IconButton
        type="button"
        title="Coach voice"
        aria-pressed={!isCoachMuted}
        $color={isCoachMuted ? "rgba(233, 233, 237, 0.45)" : COLORS.accent}
        onClick={onToggleCoach}
      >
        {isCoachMuted ? <PiMicrophoneSlash /> : <PiMicrophone />}
      </IconButton>

      <IconButton
        type="button"
        title="Volume"
        onClick={onToggleVolume}
      >
        {volume === 0 ? <PiSpeakerX /> : <PiSpeakerHigh />}
      </IconButton>
    </Header>
  );
};

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  flex: none;
  padding: clamp(14px, 2.6vw, 22px) clamp(16px, 3vw, 28px);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-right: auto;
  min-width: 0;
`;

const BrandMark = styled.svg`
  width: clamp(18px, 2.2vw, 24px);
  height: clamp(18px, 2.2vw, 24px);
  display: block;
  flex: none;
`;

const BrandName = styled.span`
  font-size: clamp(13px, 1.5vw, 17px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const ElapsedPill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 11px;
  border: 1px solid var(--pf-line);
  border-radius: 99px;
  font-size: clamp(10px, 1.1vw, 12px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(233, 233, 237, 0.72);
  white-space: nowrap;
`;

const PulseDot = styled.span<{ $color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 99px;
  background: ${({ $color }) => $color};
  animation: pf-blink 2s ease-in-out infinite;
`;
