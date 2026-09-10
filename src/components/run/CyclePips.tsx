import { FC } from "react";
import styled from "styled-components";
import { CyclePip } from "../../utils/session";

interface Props {
  color: string;
  pips: CyclePip[];
}

/** Un punto por ciclo del tabata en curso; el activo se alarga. */
export const CyclePips: FC<Props> = ({ color, pips }) => (
  <Row>
    {pips.map((pip, index) => (
      <Pip
        key={index}
        $color={pip.isActive || pip.isDone ? color : "rgba(233, 233, 237, 0.2)"}
        $isActive={pip.isActive}
      />
    ))}
  </Row>
);

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.8vw, 9px);
  flex: none;
`;

const Pip = styled.span<{ $color: string; $isActive: boolean }>`
  width: ${({ $isActive }) => ($isActive ? "26px" : "12px")};
  height: clamp(4px, 0.5vw, 6px);
  border-radius: 99px;
  background: ${({ $color }) => $color};
  transition: background 0.3s ease, width 0.3s ease;
`;
