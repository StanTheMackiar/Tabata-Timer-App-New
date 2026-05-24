import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LocalStorageKey } from "../enums";
import { TimerFormNumber, TimerFormString } from "../interfaces";
import { getLocalStorageItem } from "../utils/local-storage";
import { initialForm } from "./useForm";

export interface InitialValuesReturn {
  minutes: number;
  seconds: number;
  cycles: number;
  tabatas: number;
}

export const useInitialValues = () => {
  const [params] = useSearchParams();
  const [form, setForm] = useState<TimerFormNumber>({} as TimerFormNumber);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(function hydrateTimerValuesFromPreset() {
    const presetIndex = Number(
      params.get("preset") ||
        getLocalStorageItem<number>(LocalStorageKey.ACTIVE_PRESET, 0),
    );
    const selectedPreset = getPresetFromStorage(presetIndex);
    const valuesInParams: TimerFormNumber = {
      prepareM: Number(selectedPreset.prepareM) || 0,
      prepareS: Number(selectedPreset.prepareS) || 5,
      workM: Number(selectedPreset.workM) || 0,
      workS: Number(selectedPreset.workS) || 20,
      restM: Number(selectedPreset.restM) || 0,
      restS: Number(selectedPreset.restS) || 10,
      initialCycles: Number(selectedPreset.cycles) || 4,
      initialTabatas: Number(selectedPreset.tabatas) || 3,
    };

    setForm(valuesInParams);
    setIsLoaded(true);
  }, [params]);

  return {
    form,
    isLoaded,
  };
};

const getPresetFromStorage = (index: number): TimerFormString => {
  const presets = getLocalStorageItem<TimerFormString[]>(
    LocalStorageKey.PRESETS,
    [],
  );
  return { ...initialForm, ...(presets[index] || initialForm) };
};
