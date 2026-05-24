import { FC, useState } from "react";
import { CyclesAndTabata, StartStopButton } from ".";
import { useFormContext } from "../../context/form/useFormContext";
import { TimerType } from "../../enums";
import { PRESETS_QUANTITY } from "../../hooks";
import {
  FormEditor,
  FormTimerEditor,
} from "../../interfaces/forms/form.interface";
import { timers } from "../../utils";
import { FormEditorDialog } from "./FormEditorDialog";
import {
  PresetBar,
  PresetButton,
  StyledForm,
  TimerButton,
  TimersGrid,
} from "./styles/FormStyles";

const timerEditors: FormTimerEditor[] = [
  {
    kind: "timer",
    title: TimerType.PREPARE,
    minutes: "prepareM",
    seconds: "prepareS",
  },
  { kind: "timer", title: TimerType.WORK, minutes: "workM", seconds: "workS" },
  { kind: "timer", title: TimerType.REST, minutes: "restM", seconds: "restS" },
];

export const Form: FC = () => {
  const { activePreset, form, onSubmit, setActivePreset } = useFormContext();

  const [editor, setEditor] = useState<FormEditor | null>(null);

  return (
    <StyledForm onSubmit={onSubmit}>
      <PresetBar>
        {Array.from({ length: PRESETS_QUANTITY }).map((_, index) => (
          <PresetButton
            key={index}
            active={activePreset === index}
            type="button"
            onClick={() => setActivePreset(index)}
          >
            T{index + 1}
          </PresetButton>
        ))}
      </PresetBar>

      <TimersGrid>
        {timerEditors.map((item) => (
          <TimerButton
            key={item.title}
            type="button"
            bgColor={timers.getBGColor(item.title)}
            onClick={() => setEditor(item)}
          >
            <span>{item.title}</span>

            <strong>
              {form[item.minutes]}:{form[item.seconds]}
            </strong>
          </TimerButton>
        ))}
      </TimersGrid>

      <CyclesAndTabata
        cycles={form.cycles}
        tabatas={form.tabatas}
        onClickCycles={() =>
          setEditor({ kind: "count", title: "cycles", field: "cycles" })
        }
        onClickTabatas={() =>
          setEditor({ kind: "count", title: "tabatas", field: "tabatas" })
        }
      />

      <StartStopButton />

      {editor && <FormEditorDialog editor={editor} setEditor={setEditor} />}
    </StyledForm>
  );
};
