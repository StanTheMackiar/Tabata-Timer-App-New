import { Howler } from "howler";
import { ChangeEvent, useEffect, useState } from "react";
import { useSoundContext } from "../context/sound/useSoundContext";

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
    localStorage.setItem("isMuted", JSON.stringify(state));
  };

  useEffect(() => {
    const initialVolume = localStorage.getItem("volume") || "0.5";
    setVolume(Number(initialVolume));
  }, []);

  useEffect(() => {
    const initialIsMuted: boolean =
      JSON.parse(localStorage.getItem("isMuted") as string) || false;
    setIsMuted(initialIsMuted);
  }, []);

  useEffect(() => {
    Howler.volume(volume);
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
  }, [volume]);

  useEffect(() => {
    allSounds.forEach((sound) => sound.mute(isMuted));
  }, [allSounds, isMuted]);

  return {
    isMuted,
    volume,

    onChange,
    changeIsMuted,
  };
};
