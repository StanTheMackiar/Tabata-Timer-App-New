import { Howler } from "howler";
import { ChangeEvent, useEffect, useState } from "react";
import { useSoundContext } from "../context/sound/useSoundContext";
import { LocalStorageKey } from "../enums";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/local-storage";

export const useVolume = () => {
  const { coachSounds } = useSoundContext();

  const [volume, setVolume] = useState(0.5);
  const [isCoachMuted, setIsCoachMuted] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(e.target.value);
    setVolume(nextVolume);
    Howler.volume(nextVolume);
  };

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

  useEffect(function syncHowlerVolume() {
    Howler.volume(volume);
  }, [volume]);

  useEffect(function persistVolumeInLocalStorage() {
    setLocalStorageItem(LocalStorageKey.VOLUME, volume);
  }, [volume]);

  useEffect(function syncCoachMutedStateToSounds() {
    coachSounds.forEach((sound) => sound.mute(isCoachMuted));
  }, [coachSounds, isCoachMuted]);

  return {
    isCoachMuted,
    volume,

    onChange,
    changeIsCoachMuted,
  };
};
