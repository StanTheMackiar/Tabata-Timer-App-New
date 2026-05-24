import { Howler } from "howler";
import { ChangeEvent, useEffect, useState } from "react";
import { useSoundContext } from "../context/sound/useSoundContext";
import { LocalStorageKey } from "../enums";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/local-storage";

export const useVolume = () => {
  const { allSounds } = useSoundContext();

  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(e.target.value);
    setVolume(nextVolume);
    Howler.volume(nextVolume);
  };

  const changeIsMuted = (state: boolean) => {
    setIsMuted(state);
    setLocalStorageItem(LocalStorageKey.IS_MUTED, state);
  };

  useEffect(function hydrateVolumeFromLocalStorage() {
    setVolume(getLocalStorageItem<number>(LocalStorageKey.VOLUME, 0.5));
  }, []);

  useEffect(function hydrateMutedStateFromLocalStorage() {
    setIsMuted(getLocalStorageItem<boolean>(LocalStorageKey.IS_MUTED, false));
  }, []);

  useEffect(function syncHowlerVolume() {
    Howler.volume(volume);
  }, [volume]);

  useEffect(function persistVolumeInLocalStorage() {
    setLocalStorageItem(LocalStorageKey.VOLUME, volume);
  }, [volume]);

  useEffect(function syncMutedStateToSounds() {
    allSounds.forEach((sound) => sound.mute(isMuted));
  }, [allSounds, isMuted]);

  return {
    isMuted,
    volume,

    onChange,
    changeIsMuted,
  };
};
