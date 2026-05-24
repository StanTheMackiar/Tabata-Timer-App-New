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

  const hydrateVolumeFromLocalStorage = () => {
    setVolume(getLocalStorageItem<number>(LocalStorageKey.VOLUME, 0.5));
  };

  const hydrateMutedStateFromLocalStorage = () => {
    setIsMuted(getLocalStorageItem<boolean>(LocalStorageKey.IS_MUTED, false));
  };

  const syncHowlerVolume = () => {
    Howler.volume(volume);
  };

  const persistVolumeInLocalStorage = () => {
    setLocalStorageItem(LocalStorageKey.VOLUME, volume);
  };

  const syncMutedStateToSounds = () => {
    allSounds.forEach((sound) => sound.mute(isMuted));
  };

  useEffect(hydrateVolumeFromLocalStorage, []);
  useEffect(hydrateMutedStateFromLocalStorage, []);
  useEffect(syncHowlerVolume, [volume]);
  useEffect(persistVolumeInLocalStorage, [volume]);
  useEffect(syncMutedStateToSounds, [allSounds, isMuted]);

  return {
    isMuted,
    volume,

    onChange,
    changeIsMuted,
  };
};
