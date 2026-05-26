import { Howl } from "howler";
import { createContext, useContext } from "react";

interface ContextProps {
  finalBeepSound: Howl;
  pauseSound: Howl;
  prepareSound: Howl;
  resumeSound: Howl;
  restSound: Howl;
  stopSound: Howl;
  workSound: Howl;
  completeSound: Howl;
  isReady: boolean;
  loadSounds: () => Promise<void>;
  allSounds: Howl[];
  coachSounds: Howl[];
}

export const SoundContext = createContext({} as ContextProps);

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
};
