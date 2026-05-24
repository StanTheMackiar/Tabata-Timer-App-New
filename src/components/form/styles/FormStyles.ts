import styled from "styled-components";
import { BREAKPOINTS } from "../../../utils/breakpoints";

const StyledForm = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  gap: clamp(0.65rem, 2dvh, 1rem);

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    display: grid;
    grid-template-columns: minmax(0, 0.76fr) minmax(11.5rem, 0.24fr);
    grid-template-rows: auto 1fr auto;
  }
`;

const PresetBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    grid-column: 1 / -1;
    justify-content: center;
  }
`;

const PresetButton = styled.button<{ active: boolean }>`
  width: clamp(3.5rem, 6vw, 4.25rem);
  height: clamp(2.6rem, 6dvh, 3rem);
  border: 1px solid
    ${({ active }) => (active ? "var(--pf-accent)" : "var(--pf-line)")};
  border-radius: 0.7rem;
  background: ${({ active }) =>
    active ? "var(--pf-accent)" : "var(--pf-panel)"};
  color: ${({ active }) => (active ? "#111" : "var(--pf-white)")};
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  font-weight: 900;
`;

const TimersGrid = styled.div`
  display: grid;
  flex: 1;
  min-height: 0;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: clamp(0.6rem, 1.8dvh, 0.9rem);

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    grid-row: 2 / 4;
  }
`;

const TimerButton = styled.button<{ bgColor: string }>`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  min-height: 0;
  border: 0;
  border-radius: 0.85rem;
  background: ${({ bgColor }) => bgColor};
  color: var(--pf-dark-text);
  padding: clamp(0.75rem, 2dvh, 1.2rem);
  text-align: left;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15);
  font-size: 24px;

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    font-size: clamp(2rem, 3.4vw, 3rem);
  }

  span {
    font-weight: 600;
    text-transform: capitalize;
  }

  strong {
    font-family: var(--pf-font);
    font-weight: 800;
    white-space: nowrap;
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(0.6rem, 1.8dvh, 1rem);

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    grid-template-columns: 1fr;
  }
`;

const StatButton = styled.button`
  min-height: clamp(3.6rem, 12dvh, 6.5rem);
  border: 0;
  border-radius: 0.85rem;
  background: var(--pf-panel-alt);
  color: var(--pf-white);
  display: grid;
  place-items: center;
  padding: 0.5rem;

  overflow: hidden;

  strong {
    font-size: clamp(2.4rem, 6vw, 4rem);
    line-height: 0.9;
    font-weight: 800;
  }

  span {
    color: var(--pf-muted);
    font-size: clamp(0.8rem, 2vw, 1rem);
    font-weight: 800;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.72);
`;

const Dialog = styled.div`
  width: min(92vw, 24rem);
  border: 1px solid var(--pf-line);
  border-radius: 0.85rem;
  background: var(--pf-panel);
  padding: 1.25rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
`;

const DialogTitle = styled.h2`
  color: var(--pf-accent);
  font-size: 1.2rem;
  text-align: center;
  text-transform: uppercase;
`;

const PickerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Picker = styled.div`
  display: grid;
  justify-items: center;
  gap: 0.4rem;
`;

const ArrowButton = styled.button`
  width: 4rem;
  height: 3rem;
  border: 1px solid var(--pf-line);
  border-radius: 0.7rem;
  background: #101010;
  color: var(--pf-white);
  font-size: 2rem;
  display: grid;
  place-items: center;
`;

const Value = styled.div`
  min-width: 5rem;
  color: var(--pf-white);
  font-family: var(--pf-font);
  font-size: 3.5rem;
  font-weight: 900;
  text-align: center;
`;

const Colon = styled.div`
  color: var(--pf-white);
  font-size: 3rem;
  font-weight: 900;
`;

const CloseButton = styled.button`
  width: 100%;
  height: 3.25rem;
  border: 0;
  border-radius: 0.7rem;
  background: var(--pf-accent);
  color: #111;
  font-weight: 900;
`;

export {
  ArrowButton,
  CloseButton,
  Colon,
  Dialog,
  DialogTitle,
  Overlay,
  Picker,
  PickerRow,
  PresetBar,
  PresetButton,
  StatButton,
  StatsRow,
  StyledForm,
  TimerButton,
  TimersGrid,
  Value,
};
