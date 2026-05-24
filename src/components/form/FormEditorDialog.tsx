import { FC } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useFormContext } from "../../context/form/useFormContext";
import { FormEditor } from "../../interfaces/forms/form.interface";
import {
  ArrowButton,
  CloseButton,
  Colon,
  Dialog,
  DialogTitle,
  Overlay,
  Picker,
  PickerRow,
  Value,
} from "./styles/FormStyles";

interface Props {
  setEditor: (editor: FormEditor | null) => void;
  editor: FormEditor;
}

export const FormEditorDialog: FC<Props> = ({ editor, setEditor }) => {
  const { form, stepField } = useFormContext();

  return (
    <Overlay onClick={() => setEditor(null)}>
      <Dialog onClick={(event) => event.stopPropagation()}>
        <DialogTitle>{editor.title}</DialogTitle>

        {editor.kind === "timer" ? (
          <PickerRow>
            <Picker>
              <ArrowButton
                type="button"
                onClick={() => stepField(editor.minutes, 1, "minutes")}
              >
                <RiArrowUpSLine />
              </ArrowButton>

              <Value>{form[editor.minutes]}</Value>

              <ArrowButton
                type="button"
                onClick={() => stepField(editor.minutes, -1, "minutes")}
              >
                <RiArrowDownSLine />
              </ArrowButton>
            </Picker>

            <Colon>:</Colon>

            <Picker>
              <ArrowButton
                type="button"
                onClick={() => stepField(editor.seconds, 1, "seconds")}
              >
                <RiArrowUpSLine />
              </ArrowButton>

              <Value>{form[editor.seconds]}</Value>

              <ArrowButton
                type="button"
                onClick={() => stepField(editor.seconds, -1, "seconds")}
              >
                <RiArrowDownSLine />
              </ArrowButton>
            </Picker>
          </PickerRow>
        ) : (
          <PickerRow>
            <Picker>
              <ArrowButton
                type="button"
                onClick={() => stepField(editor.field, 1, editor.field)}
              >
                <RiArrowUpSLine />
              </ArrowButton>

              <Value>{form[editor.field]}</Value>

              <ArrowButton
                type="button"
                onClick={() => stepField(editor.field, -1, editor.field)}
              >
                <RiArrowDownSLine />
              </ArrowButton>
            </Picker>
          </PickerRow>
        )}

        <CloseButton type="button" onClick={() => setEditor(null)}>
          OK
        </CloseButton>
      </Dialog>
    </Overlay>
  );
};
