import { FC } from "react";
import { PiX } from "react-icons/pi";
import styled from "styled-components";
import { usePresetsContext } from "../../context/presets/usePresetsContext";
import { EditorTarget } from "../../interfaces";
import { timers } from "../../utils";
import { COLORS } from "../../utils/colors";
import { IconButton, PrimaryAction } from "../ui";
import { TimerPicker } from "./TimerPicker";

interface Props {
  onClose: VoidFunction;
  target: EditorTarget;
}

/** Atajos a las duraciones que se usan de verdad, para no pulsar 40 veces. */
const QUICK_PICKS = [5, 10, 20, 30, 40, 50, 60];

const NAME_SUGGESTIONS = ["Classic", "Sprint", "Burnout", "Warm-up", "Core"];

export const EditorSheet: FC<Props> = ({ onClose, target }) => {
  const { preset, renameActive, setField, stepField } = usePresetsContext();

  const isTimer = target.kind === "timer";
  const accent = isTimer ? timers.getPhaseColor(target.phase) : COLORS.accent;
  const title = isTimer ? timers.getPhaseLabel(target.phase) : "Rename preset";
  const seconds = isTimer ? preset[target.phase] : 0;

  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(event) => event.stopPropagation()}>
        <Head>
          <Title $color={accent}>{title}</Title>
          <IconButton
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            <PiX />
          </IconButton>
        </Head>

        {target.kind === "name" ? (
          <Column>
            <NameInput
              value={preset.name}
              placeholder="Preset name"
              aria-label="Preset name"
              onChange={(event) => renameActive(event.target.value)}
            />
            <Chips>
              {NAME_SUGGESTIONS.map((name) => (
                <Chip
                  key={name}
                  type="button"
                  onClick={() => renameActive(name)}
                >
                  {name}
                </Chip>
              ))}
            </Chips>
          </Column>
        ) : (
          <Column>
            <Pickers>
              <TimerPicker
                label="Min"
                step={60}
                value={Math.floor(seconds / 60)}
                onStep={(delta) => stepField(target.phase, delta)}
              />
              <TimerPicker
                label="Sec"
                step={1}
                value={seconds % 60}
                onStep={(delta) => stepField(target.phase, delta)}
              />
            </Pickers>

            <Chips $centered>
              {QUICK_PICKS.map((value) => (
                <Chip
                  key={value}
                  type="button"
                  $activeColor={seconds === value ? accent : undefined}
                  onClick={() => setField(target.phase, value)}
                >
                  {value}s
                </Chip>
              ))}
            </Chips>
          </Column>
        )}

        <DoneButton
          type="button"
          onClick={onClose}
        >
          Done
        </DoneButton>
      </Sheet>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: end center;
  background: rgba(22, 24, 38, 0.72);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  animation: pf-fade 0.16s ease-out;
`;

const Sheet = styled.div`
  width: 100%;
  max-width: min(100%, 520px);
  padding: clamp(18px, 2.6vw, 26px);
  padding-bottom: calc(clamp(18px, 2.6vw, 26px) + var(--pf-safe-bottom));
  border-radius: 20px 20px 0 0;
  background: var(--pf-panel);
  box-shadow: 0 0 0 1px var(--pf-outline), 0 -20px 60px rgba(0, 0, 0, 0.55);
  animation: pf-rise 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: clamp(14px, 2vw, 20px);
`;

const Title = styled.span<{ $color: string }>`
  font-size: clamp(17px, 2vw, 24px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2vw, 20px);
`;

const Pickers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 1.4vw, 16px);
`;

const Chips = styled.div<{ $centered?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: ${({ $centered }) => ($centered ? "center" : "flex-start")};
`;

const Chip = styled.button<{ $activeColor?: string }>`
  padding: 8px 14px;
  border: 1px solid ${({ $activeColor }) => $activeColor ?? "var(--pf-line)"};
  border-radius: 6px;
  background: ${({ $activeColor }) =>
    $activeColor ? "rgba(233, 233, 237, 0.06)" : "transparent"};
  color: ${({ $activeColor }) => $activeColor ?? "rgba(233, 233, 237, 0.8)"};
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  transition: border-color 0.16s ease;

  &:hover,
  &:active {
    border-color: var(--pf-accent);
  }
`;

const NameInput = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid var(--pf-line);
  border-radius: 8px;
  background: var(--pf-bg);
  color: var(--pf-white);
  font-size: 18px;
  font-weight: 500;
  caret-color: var(--pf-accent);
`;

const DoneButton = styled(PrimaryAction)`
  width: 100%;
  margin-top: clamp(16px, 2.2vw, 22px);
  min-height: 52px;
  font-size: 16px;
`;
