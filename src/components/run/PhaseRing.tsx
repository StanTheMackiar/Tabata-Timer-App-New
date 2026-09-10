import { FC } from "react";
import styled from "styled-components";

interface Props {
  nextLabel: string;
  /** Fracción consumida del intervalo actual, de 0 a 1. */
  phaseProgress: number;
  color: string;
  /** Fracción consumida de la sesión completa, de 0 a 1. */
  sessionProgress: number;
  timeLabel: string;
}

const PHASE_RADIUS = 92;
const SESSION_RADIUS = 79;

const circumference = (radius: number) => 2 * Math.PI * radius;

/**
 * Anillo grueso = intervalo actual. Arco fino interior = sesión completa.
 * Se dibujan girados -90° para que ambos empiecen arriba.
 */
export const PhaseRing: FC<Props> = ({
  color,
  nextLabel,
  phaseProgress,
  sessionProgress,
  timeLabel,
}) => {
  const phaseLength = circumference(PHASE_RADIUS);
  const sessionLength = circumference(SESSION_RADIUS);

  return (
    <Container>
      <Halo $color={color} />

      <Svg viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={PHASE_RADIUS}
          fill="none"
          stroke="var(--pf-faint)"
          strokeWidth="4"
        />
        <circle
          cx="100"
          cy="100"
          r={PHASE_RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={phaseLength.toFixed(1)}
          strokeDashoffset={(phaseLength * (1 - phaseProgress)).toFixed(1)}
          style={{ filter: `drop-shadow(0 0 10px ${color})` }}
        />
        <circle
          cx="100"
          cy="100"
          r={SESSION_RADIUS}
          fill="none"
          stroke="rgba(233, 233, 237, 0.07)"
          strokeWidth="1.5"
          strokeDasharray={sessionLength.toFixed(1)}
          strokeDashoffset={(sessionLength * (1 - sessionProgress)).toFixed(1)}
        />
      </Svg>

      <Center>
        <Time>{timeLabel}</Time>
        <Next>Next · {nextLabel}</Next>
      </Center>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: min(100%, clamp(230px, 42vw, 430px));
  aspect-ratio: 1;
  display: grid;
  place-items: center;
`;

const Halo = styled.div<{ $color: string }>`
  position: absolute;
  inset: 8%;
  border-radius: 99px;
  background: ${({ $color }) => $color};
  filter: blur(38px);
  opacity: 0.2;
  animation: pf-breathe 3.4s ease-in-out infinite;
`;

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  overflow: visible;
`;

const Center = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(4px, 0.8vw, 10px);
`;

const Time = styled.div`
  font-size: clamp(64px, 15vw, 150px);
  font-weight: 500;
  line-height: 0.86;
  letter-spacing: -0.045em;
  font-variant-numeric: tabular-nums;
`;

const Next = styled.div`
  font-size: clamp(10px, 1.15vw, 13px);
  line-height: 1;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(233, 233, 237, 0.5);
`;
