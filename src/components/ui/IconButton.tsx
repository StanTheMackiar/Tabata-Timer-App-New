import styled from "styled-components";

/** Botón cuadrado de la cabecera y de los diálogos. */
export const IconButton = styled.button<{ $color?: string }>`
  width: clamp(38px, 4.4vw, 44px);
  height: clamp(38px, 4.4vw, 44px);
  flex: none;
  display: grid;
  place-items: center;
  border: 1px solid var(--pf-line);
  border-radius: 8px;
  background: transparent;
  color: ${({ $color }) => $color ?? "var(--pf-white)"};
  font-size: clamp(16px, 1.8vw, 20px);
  transition: background 0.18s ease, border-color 0.18s ease;

  &:hover {
    background: rgba(145, 132, 217, 0.12);
    border-color: var(--pf-accent);
  }
`;
