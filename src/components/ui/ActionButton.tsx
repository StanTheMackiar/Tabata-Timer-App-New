import styled, { css } from "styled-components";
import { COLORS } from "../../utils/colors";

const base = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: var(--pf-radius);
  font-weight: 500;
  line-height: 1;
`;

/** Acción principal: Start, Resume, Again. */
export const PrimaryAction = styled.button<{ $large?: boolean }>`
  ${base};
  min-height: ${({ $large }) =>
    $large ? "clamp(64px, 8vw, 84px)" : "clamp(56px, 7vw, 74px)"};
  gap: ${({ $large }) => ($large ? "14px" : "10px")};
  border: 1px solid var(--pf-accent);
  background: var(--pf-accent-surface);
  color: var(--pf-accent-text);
  font-size: ${({ $large }) =>
    $large ? "clamp(20px, 2.6vw, 30px)" : "clamp(15px, 1.9vw, 23px)"};
  letter-spacing: 0.02em;
  transition: box-shadow 0.25s ease, background 0.25s ease,
    transform 0.12s ease;

  &:hover {
    background: var(--pf-accent-hover);
    box-shadow: 0 0 34px rgba(145, 132, 217, 0.32);
  }

  &:active {
    background: var(--pf-accent-hover);
    transform: translateY(1px);
  }
`;

/**
 * Acción secundaria.
 *
 * Con `$danger` (Stop, End session) va roja de entrada y no sólo al pasar por
 * encima: en una pantalla táctil no hay hover que descubra el color, y detener
 * la sesión merece leerse como lo que es.
 */
export const GhostAction = styled.button<{ $danger?: boolean }>`
  ${base};
  min-height: clamp(56px, 7vw, 74px);
  gap: 8px;
  border: 1px solid
    ${({ $danger }) => ($danger ? COLORS.rest : "var(--pf-line)")};
  background: ${({ $danger }) =>
    $danger ? "rgba(232, 119, 106, 0.1)" : "transparent"};
  color: ${({ $danger }) => ($danger ? COLORS.rest : "rgba(233, 233, 237, 0.75)")};
  font-size: clamp(14px, 1.7vw, 20px);
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: ${({ $danger }) =>
      $danger ? COLORS.rest : "var(--pf-accent)"};
    color: ${({ $danger }) => ($danger ? COLORS.rest : "var(--pf-white)")};
    background: ${({ $danger }) =>
      $danger ? "rgba(232, 119, 106, 0.2)" : "transparent"};
  }

  &:active {
    border-color: ${({ $danger }) =>
      $danger ? COLORS.rest : "var(--pf-accent)"};
    color: ${({ $danger }) => ($danger ? COLORS.rest : "var(--pf-white)")};
    background: ${({ $danger }) =>
      $danger ? "rgba(232, 119, 106, 0.28)" : "transparent"};
  }
`;
