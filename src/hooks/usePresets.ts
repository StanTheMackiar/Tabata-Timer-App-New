import { useEffect, useState } from "react";
import { LocalStorageKey } from "../enums";
import { CountField, PhaseField, TimerPreset } from "../interfaces";
import {
  PRESETS_QUANTITY,
  clampValue,
  createInitialPresets,
  parseStoredPresets,
  stepValue,
} from "../utils/presets";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/local-storage";

export type EditableField = PhaseField | CountField;

export const usePresets = () => {
  const [presets, setPresets] = useState<TimerPreset[]>(createInitialPresets);
  const [activeIndex, setActiveIndex] = useState(0);

  const preset = presets[activeIndex] ?? presets[0];

  useEffect(function hydratePresetsFromLocalStorage() {
    setPresets(
      parseStoredPresets(
        getLocalStorageItem<unknown>(LocalStorageKey.PRESETS, null),
      ),
    );
    setActiveIndex(
      clampIndex(getLocalStorageItem<number>(LocalStorageKey.ACTIVE_PRESET, 0)),
    );
  }, []);

  useEffect(
    function persistPresetsInLocalStorage() {
      setLocalStorageItem(LocalStorageKey.PRESETS, presets);
    },
    [presets],
  );

  useEffect(
    function persistActivePresetInLocalStorage() {
      setLocalStorageItem(LocalStorageKey.ACTIVE_PRESET, activeIndex);
    },
    [activeIndex],
  );

  const updateActive = (patch: Partial<TimerPreset>) =>
    setPresets((prev) =>
      prev.map((item, index) =>
        index === activeIndex ? { ...item, ...patch } : item,
      ),
    );

  /** Ajuste relativo, el de los botones ± y las flechas del editor. */
  const stepField = (field: EditableField, delta: number) =>
    updateActive({ [field]: stepValue(preset[field], delta, field) });

  /** Ajuste absoluto, el de los atajos 20s / 30s / 45s. */
  const setField = (field: EditableField, value: number) =>
    updateActive({ [field]: clampValue(value, field) });

  const renameActive = (name: string) =>
    updateActive({ name: name.trim() ? name : "Preset" });

  const selectPreset = (index: number) => setActiveIndex(clampIndex(index));

  return {
    activeIndex,
    preset,
    presets,

    renameActive,
    selectPreset,
    setField,
    stepField,
  };
};

const clampIndex = (index: number) =>
  Math.min(PRESETS_QUANTITY - 1, Math.max(0, Number(index) || 0));
