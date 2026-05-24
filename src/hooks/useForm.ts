import { ChangeEvent, SubmitEventHandler, useEffect, useState } from "react";
import { useSoundContext } from "../context/sound/useSoundContext";
import { LocalStorageKey } from "../enums";
import { InputTypes, TimerFormString } from "../interfaces";
import { FormProviderProps } from "../interfaces/providers/form-provider.interface";
import { useAppNavigate } from "../routes/navigation.helper";
import { AppRoute } from "../routes/routes.enum";
import { validation } from "../utils";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/local-storage";

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

export const PRESETS_QUANTITY = 4;

const createInitialPresets = (): TimerFormString[] => [
  initialForm,
  { ...initialForm, workS: "30" },
  { ...initialForm, workS: "40" },
  { ...initialForm, workS: "50", restS: "10" },
];

const getCircularValue = (
  currentValue: string,
  delta: number,
  inputType: InputTypes,
) => {
  const maxValue = inputType === "seconds" || inputType === "minutes" ? 59 : 99;
  const minValue = inputType === "minutes" ? 0 : 1;
  const range = maxValue - minValue + 1;
  const normalizedValue = Number(currentValue) || minValue;
  const nextValue = ((normalizedValue + delta - minValue + range) % range) + minValue;

  return String(nextValue).padStart(2, "0");
};

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

  useEffect(function hydratePresetsFromLocalStorage() {
    setPresets(readPresets());
    setActivePreset(
      getLocalStorageItem<number>(LocalStorageKey.ACTIVE_PRESET, 0),
    );
    loadSounds();
  }, []);

  useEffect(
    function persistPresetsInLocalStorage() {
      setLocalStorageItem(LocalStorageKey.PRESETS, presets);
    },
    [presets],
  );

  useEffect(
    function persistActivePresetInLocalStorage() {
      setLocalStorageItem(LocalStorageKey.ACTIVE_PRESET, activePreset);
    },
    [activePreset],
  );

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
    updateField(field, getCircularValue(form[field], delta, inputType));
  };

  const setActivePreset = (index: number) => {
    setActivePresetState(Math.min(PRESETS_QUANTITY - 1, Math.max(0, index)));
  };

  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
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
