import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { createAudioEngine } from "./engines";
import { SoundContext } from "./useSoundContext";

export const SoundProvider: FC<PropsWithChildren> = ({ children }) => {
  // El motor se elige una sola vez: nativo en Android e iOS, Howler en web.
  const engine = useMemo(() => createAudioEngine(), []);

  const [isReady, setIsReady] = useState(false);

  const loadSounds = useCallback(async () => {
    await engine.load();
    setIsReady(true);
  }, [engine]);

  useEffect(
    function preloadSoundsOnAppLoad() {
      loadSounds();
      return () => engine.unload();
    },
    [engine, loadSounds],
  );

  const data = {
    isReady,
    loadSounds,

    play: engine.play,
    setCoachMuted: engine.setCoachMuted,
    setVolume: engine.setVolume,
    stopAllSounds: engine.stopAll,
  };

  return <SoundContext value={data}>{children}</SoundContext>;
};
