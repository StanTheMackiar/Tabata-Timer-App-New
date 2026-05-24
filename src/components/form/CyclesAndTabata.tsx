import { FC } from "react";

import styled from "styled-components";
import { BREAKPOINTS } from "../../utils/breakpoints";

interface Props {
  cycles: string;
  tabatas: string;
  onClickCycles?: VoidFunction;
  onClickTabatas?: VoidFunction;
}

export const CyclesAndTabata: FC<Props> = ({
  cycles,
  tabatas,
  onClickCycles,
  onClickTabatas,
}) => {
  return (
    <StatsRow>
      <StatButton
        type="button"
        disabled={!onClickCycles}
        onClick={onClickCycles}
      >
        <strong>{cycles}</strong>
        <span>Cycles</span>
      </StatButton>

      <StatButton
        type="button"
        disabled={!onClickTabatas}
        onClick={onClickTabatas}
      >
        <strong>{tabatas}</strong>
        <span>Tabatas</span>
      </StatButton>
    </StatsRow>
  );
};

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(0.6rem, 1.8dvh, 1rem);

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    grid-template-columns: 1fr;
  }
`;

const StatButton = styled.button`
  min-height: clamp(2rem, 8dvh, 6.5rem);
  border: 0;
  border-radius: 0.85rem;
  background: var(--pf-panel-alt);
  color: var(--pf-white);
  display: grid;
  place-items: center;
  gap: 8px;
  padding: 0.5rem;

  strong {
    font-size: 36px;
    line-height: 0.9;
    font-weight: 800;
  }

  span {
    color: var(--pf-muted);
    font-size: 1rem;
    font-weight: 800;
  }

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    strong {
      font-size: 48px;
    }

    span {
      color: var(--pf-muted);
      font-size: 2rem;
    }
  }
`;
