import { FC } from "react";
import styled from "styled-components";

interface Props {
  color: string;
}

/**
 * Resplandor difuso tras la interfaz. Es lo que sustituye al color de fase
 * inundando la pantalla: tiñe el fondo sin competir con la cifra del reloj.
 */
export const PhaseGlow: FC<Props> = ({ color }) => <Glow $color={color} />;

const Glow = styled.div<{ $color: string }>`
  position: absolute;
  inset: -20% -10% auto;
  height: 62%;
  pointer-events: none;
  background: radial-gradient(
    60% 100% at 50% 0%,
    ${({ $color }) => $color},
    transparent 70%
  );
  filter: blur(60px);
  opacity: 0.5;
  transition: background 0.6s ease;
`;
