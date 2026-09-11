import { FC } from "react";
import { PiPencilSimple } from "react-icons/pi";
import styled from "styled-components";
import { TimerPreset } from "../../interfaces";

interface Props {
  activeIndex: number;
  onRename: VoidFunction;
  onSelect: (index: number) => void;
  presets: TimerPreset[];
}

/** Los presets se llaman como el entreno, no T1–T4. */
export const PresetChips: FC<Props> = ({
  activeIndex,
  onRename,
  onSelect,
  presets,
}) => (
  <Container>
    <Kicker>Presets</Kicker>

    <Chips>
      {presets.map((preset, index) => (
        <Chip
          key={preset.name + index}
          type="button"
          $isActive={index === activeIndex}
          onClick={() => onSelect(index)}
        >
          <Name $isActive={index === activeIndex}>{preset.name}</Name>
          <Summary>
            {preset.work}/{preset.rest} · {preset.cycles}×{preset.tabatas}
          </Summary>
        </Chip>
      ))}
    </Chips>

    <RenameButton
      type="button"
      onClick={onRename}
    >
      <PiPencilSimple size={13} />
      Rename {presets[activeIndex]?.name}
    </RenameButton>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Kicker = styled.div`
  font-size: clamp(10px, 1.1vw, 12px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pf-muted);
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button<{ $isActive: boolean }>`
  flex: 1 1 auto;
  min-width: clamp(72px, 9vw, 110px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  padding: 9px 11px;
  border: 1px solid
    ${({ $isActive }) => ($isActive ? "var(--pf-accent)" : "var(--pf-line)")};
  border-radius: 8px;
  background: ${({ $isActive }) =>
    $isActive ? "var(--pf-accent-surface)" : "transparent"};
  color: var(--pf-white);
  text-align: left;
  transition: border-color 0.18s ease, background 0.18s ease;

  &:hover {
    border-color: var(--pf-accent);
  }

  &:active {
    border-color: var(--pf-accent);
    background: rgba(145, 132, 217, 0.14);
  }
`;

const Name = styled.span<{ $isActive: boolean }>`
  font-size: clamp(12px, 1.3vw, 14px);
  font-weight: 500;
  line-height: 1;
  color: ${({ $isActive }) =>
    $isActive ? "var(--pf-accent-text)" : "var(--pf-white)"};
`;

const Summary = styled.span`
  font-size: clamp(10px, 1.05vw, 11.5px);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: rgba(233, 233, 237, 0.5);
`;

const RenameButton = styled.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 2px;
  border: 0;
  background: transparent;
  color: var(--pf-accent);
  font-size: clamp(10.5px, 1.1vw, 12px);
  font-weight: 500;
  line-height: 1;

  &:hover,
  &:active {
    color: var(--pf-accent-soft);
  }
`;
