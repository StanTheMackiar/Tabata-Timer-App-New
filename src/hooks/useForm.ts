import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSoundContext } from "../context/sound/useSoundContext";
import { InputTypes, TimerFormString } from "../interfaces";
import { FormProviderProps } from "../interfaces/providers/form-provider.interface";
import { validation } from "../utils";

export const initialForm: TimerFormString = {
  prepareM: "00",
  prepareS: "05",
  workM: "00",
  workS: "20",
  restM: "00",
  restS: "10",
  cycles: "04",
  tabatas: "03",
};

const PRESETS_KEY = "tabata-presets";
const ACTIVE_PRESET_KEY = "tabata-active-preset";

const createInitialPresets = (): TimerFormString[] => [
  initialForm,
  { ...initialForm, workS: "30" },
  { ...initialForm, workS: "40" },
];

const readPresets = (): TimerFormString[] => {
  const stored = JSON.parse(localStorage.getItem(PRESETS_KEY) || "null") as
    | TimerFormString[]
    | null;

  const presets = Array.isArray(stored) ? stored : createInitialPresets();

  return createInitialPresets().map((fallback, index) => ({
    ...fallback,
    ...presets[index],
  }));
};

export const useForm = (): FormProviderProps => {
  const [presets, setPresets] =
    useState<TimerFormString[]>(createInitialPresets);
  const [activePreset, setActivePresetState] = useState(0);
  const form = presets[activePreset] || initialForm;
  const { prepareSound, loadSounds } = useSoundContext();

  const navigate = useNavigate();

  useEffect(() => {
    setPresets(readPresets());
    setActivePreset(Number(localStorage.getItem(ACTIVE_PRESET_KEY) || 0));
    loadSounds();
  }, []);

  useEffect(() => {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
  }, [presets]);

  useEffect(() => {
    localStorage.setItem(ACTIVE_PRESET_KEY, String(activePreset));
  }, [activePreset]);

  const onChange = (
    { target }: ChangeEvent<HTMLInputElement>,
    inputType: InputTypes,
  ) => {
    const validatedValue = validation.validateForm(target.value, inputType);
    updateField(target.name as keyof TimerFormString, validatedValue);
  };

  const updateField = (field: keyof TimerFormString, value: string) => {
    setPresets((prev) =>
      prev.map((preset, index) =>
        index === activePreset ? { ...preset, [field]: value } : preset,
      ),
    );
  };

  const stepField = (
    field: keyof TimerFormString,
    delta: number,
    inputType: InputTypes,
  ) => {
    const nextValue = Number(form[field]) + delta;
    updateField(field, validation.validateForm(String(nextValue), inputType));
  };

  const setActivePreset = (index: number) => {
    setActivePresetState(Math.min(2, Math.max(0, index)));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loadSounds();
    prepareSound.play();

    navigate(`/start?preset=${activePreset}`);
  };

  return {
    form,
    activePreset,
    presets,

    onChange,
    onSubmit,
    setActivePreset,
    stepField,
    updateField,
  };
};
