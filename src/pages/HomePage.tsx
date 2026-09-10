import { FC, useState } from "react";
import { PiPlayFill } from "react-icons/pi";
import styled from "styled-components";
import {
  CounterStepper,
  EditorSheet,
  IntervalList,
  PresetChips,
  PrimaryAction,
  TotalSession,
} from "../components";
import { Layout } from "../components/layouts/Layout";
import { usePresetsContext } from "../context/presets/usePresetsContext";
import { useSessionControls } from "../hooks";
import { EditorTarget } from "../interfaces";
import { BREAKPOINTS } from "../utils/breakpoints";

export const HomePage: FC = () => {
  const { activeIndex, preset, presets, selectPreset, stepField } =
    usePresetsContext();
  const { start } = useSessionControls();

  const [editor, setEditor] = useState<EditorTarget | null>(null);

  return (
    <Layout
      overlay={
        editor && (
          <EditorSheet
            target={editor}
            onClose={() => setEditor(null)}
          />
        )
      }
    >
      <Content>
        <Summary>
          <TotalSession preset={preset} />
          <PresetChips
            activeIndex={activeIndex}
            presets={presets}
            onSelect={selectPreset}
            onRename={() => setEditor({ kind: "name" })}
          />
        </Summary>

        <Setup>
          <IntervalList
            preset={preset}
            onEdit={(phase) => setEditor({ kind: "timer", phase })}
          />

          <Counters>
            <CounterStepper
              label="Cycles"
              value={preset.cycles}
              onStep={(delta) => stepField("cycles", delta)}
            />
            <CounterStepper
              label="Tabatas"
              value={preset.tabatas}
              onStep={(delta) => stepField("tabatas", delta)}
            />
          </Counters>

          <PrimaryAction
            type="button"
            $large
            onClick={() => start(preset)}
          >
            <PiPlayFill color="var(--pf-accent)" />
            Start
          </PrimaryAction>
        </Setup>
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2.2vw, 24px);
  padding: 0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px);
  overflow: hidden;

  /* En escritorio las dos columnas llenan la pantalla, sin hueco muerto abajo. */
  @media (min-width: ${BREAKPOINTS.desktop}px) {
    flex-flow: row wrap;
    align-content: stretch;
  }
`;

const Summary = styled.section`
  flex: 0 0 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.8vw, 18px);
  min-height: 0;

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    flex: 1 1 260px;
  }
`;

const Setup = styled.section`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.6vw, 16px);
  min-height: 0;

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    flex: 1 1 420px;
  }
`;

const Counters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(8px, 1.3vw, 12px);
`;
