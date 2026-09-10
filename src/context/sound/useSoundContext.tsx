import { createContext, useContext } from "react";
import { SoundId } from "../../interfaces/audio/audio-engine.interface";

interface ContextProps {
  play: (id: SoundId) => void;
  stopAllSounds: () => void;
  setVolume: (volume: number) => void;
  setCoachMuted: (muted: boolean) => void;
  loadSounds: () => Promise<void>;
  isReady: boolean;
}

export const SoundContext = createContext({} as ContextProps);

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
};
