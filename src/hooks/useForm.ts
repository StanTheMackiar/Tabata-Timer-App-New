import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSoundContext } from "../context/sound/useSoundContext";
import { LocalStorageKey } from "../enums";
import { InputTypes, TimerFormString } from "../interfaces";
import { FormProviderProps } from "../interfaces/providers/form-provider.interface";
import { AppRoute } from "../routes/routes.enum";
import { useAppNavigate } from "../routes/navigation.helper";
import { validation } from "../utils";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/local-storage";

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

const createInitialPresets = (): TimerFormString[] => [
  initialForm,
  { ...initialForm, workS: "30" },
  { ...initialForm, workS: "40" },
];

const readPresets = (): TimerFormString[] => {
  const stored = getLocalStorageItem<TimerFormString[] | null>(
    LocalStorageKey.PRESETS,
    null,
  );

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

  const navigate = useAppNavigate();

  const hydratePresetsFromLocalStorage = () => {
    setPresets(readPresets());
    setActivePreset(
      getLocalStorageItem<number>(LocalStorageKey.ACTIVE_PRESET, 0),
    );
    loadSounds();
  };

  const persistPresetsInLocalStorage = () => {
    setLocalStorageItem(LocalStorageKey.PRESETS, presets);
  };

  const persistActivePresetInLocalStorage = () => {
    setLocalStorageItem(LocalStorageKey.ACTIVE_PRESET, activePreset);
  };

  useEffect(hydratePresetsFromLocalStorage, []);
  useEffect(persistPresetsInLocalStorage, [presets]);
  useEffect(persistActivePresetInLocalStorage, [activePreset]);

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

    navigate(AppRoute.START, { preset: activePreset });
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
