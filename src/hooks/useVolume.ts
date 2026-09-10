import { ChangeEvent, useEffect, useState } from "react";
import { useSoundContext } from "../context/sound/useSoundContext";
import { LocalStorageKey } from "../enums";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/local-storage";

export const useVolume = () => {
  const { setCoachMuted, setVolume: setEngineVolume } = useSoundContext();

  const [volume, setVolume] = useState(0.5);
  const [isCoachMuted, setIsCoachMuted] = useState(false);

  // El motor lo actualiza el efecto syncEngineVolume; aquí basta con el estado.
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setVolume(Number(e.target.value));

  const changeIsCoachMuted = (state: boolean) => {
    setIsCoachMuted(state);
    setLocalStorageItem(LocalStorageKey.COACH_MUTED, state);
  };

  useEffect(function hydrateVolumeFromLocalStorage() {
    setVolume(getLocalStorageItem<number>(LocalStorageKey.VOLUME, 0.5));
  }, []);

  useEffect(function hydrateCoachMutedStateFromLocalStorage() {
    setIsCoachMuted(
      getLocalStorageItem<boolean>(LocalStorageKey.COACH_MUTED, false),
    );
  }, []);

  useEffect(function syncEngineVolume() {
    setEngineVolume(volume);
  }, [setEngineVolume, volume]);

  useEffect(function persistVolumeInLocalStorage() {
    setLocalStorageItem(LocalStorageKey.VOLUME, volume);
  }, [volume]);

  useEffect(function syncCoachMutedStateToSounds() {
    setCoachMuted(isCoachMuted);
  }, [isCoachMuted, setCoachMuted]);

  return {
    isCoachMuted,
    volume,

    onChange,
    changeIsCoachMuted,
  };
};
