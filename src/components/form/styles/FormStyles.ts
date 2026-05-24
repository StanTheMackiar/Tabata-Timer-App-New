import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex: 8;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const PresetBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
`;

const PresetButton = styled.button<{ active: boolean }>`
  width: 4.25rem;
  height: 3rem;
  border: 2px solid
    ${({ active }) => (active ? "var(--pf-green)" : "var(--pf-line)")};
  border-radius: 0.35rem;
  background: ${({ active }) =>
    active ? "var(--pf-green)" : "var(--pf-panel)"};
  color: ${({ active }) => (active ? "#111" : "var(--pf-white)")};
  font-size: 1.15rem;
  font-weight: 900;
`;

const TimersGrid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const TimerButton = styled.button<{ bgColor: string }>`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  min-height: 5.8rem;
  border: 0;
  border-radius: 0.35rem;
  background: ${({ bgColor }) => bgColor};
  color: #111;
  padding: 1rem 1.25rem;
  text-align: left;

  span {
    font-size: clamp(1.7rem, 8vw, 2.75rem);
    font-weight: 900;
    text-transform: capitalize;
  }

  strong {
    font-family: "Arial Black", Impact, sans-serif;
    font-size: clamp(1.8rem, 8vw, 2.8rem);
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const StatButton = styled.button`
  min-height: 7rem;
  border: 0;
  border-radius: 0.35rem;
  background: var(--pf-white);
  color: #141414;
  display: grid;
  place-items: center;
  padding: 0.5rem;

  strong {
    font-size: clamp(3rem, 16vw, 5rem);
    line-height: 0.9;
    font-weight: 900;
  }

  span {
    color: #303840;
    font-size: 1rem;
    font-weight: 800;
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
  border-radius: 0.5rem;
  background: var(--pf-panel);
  padding: 1.25rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
`;

const DialogTitle = styled.h2`
  color: var(--pf-green);
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
  border-radius: 0.35rem;
  background: #101010;
  color: var(--pf-white);
  font-size: 2rem;
  display: grid;
  place-items: center;
`;

const Value = styled.div`
  min-width: 5rem;
  color: var(--pf-white);
  font-family: "Arial Black", Impact, sans-serif;
  font-size: 3.5rem;
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
  border-radius: 0.35rem;
  background: var(--pf-green);
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
