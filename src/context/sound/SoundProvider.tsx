import { Howl } from "howler";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import finalBeep from "../../assets/sounds/beeps/321beep.mp3";
import pause from "../../assets/sounds/beeps/pause.mp3";
import resume from "../../assets/sounds/beeps/resume.mp3";
import complete from "../../assets/sounds/coach/complete.mp3";
import prepare from "../../assets/sounds/coach/prepare.mp3";
import rest from "../../assets/sounds/coach/rest.mp3";
import stop from "../../assets/sounds/coach/stop.mp3";
import work from "../../assets/sounds/coach/work.mp3";
import { SoundContext } from "./useSoundContext";

export const SoundProvider: FC<PropsWithChildren> = ({ children }) => {
  const sounds = useMemo(
    () => ({
      prepareSound: new Howl({ src: prepare, preload: true, html5: false }),
      stopSound: new Howl({ src: stop, preload: true, html5: false }),
      finalBeepSound: new Howl({ src: finalBeep, preload: true, html5: false }),
      pauseSound: new Howl({ src: pause, preload: true, html5: false }),
      workSound: new Howl({ src: work, preload: true, html5: false }),
      completeSound: new Howl({ src: complete, preload: true, html5: false }),
      restSound: new Howl({ src: rest, preload: true, html5: false }),
      resumeSound: new Howl({ src: resume, preload: true, html5: false }),
    }),
    [],
  );

  const [isReady, setIsReady] = useState(false);
  const allSounds = useMemo(() => Object.values(sounds), [sounds]);
  const coachSounds = useMemo(
    () => [
      sounds.prepareSound,
      sounds.stopSound,
      sounds.workSound,
      sounds.restSound,
      sounds.completeSound,
    ],
    [sounds],
  );

  const loadSounds = useCallback(async () => {
    await Promise.all(
      allSounds.map(
        (sound) =>
          new Promise<void>((resolve) => {
            if (sound.state() === "loaded") {
              resolve();
              return;
            }
            sound.once("load", () => resolve());
            sound.once("loaderror", () => resolve());
            sound.load();
          }),
      ),
    );
    setIsReady(true);
  }, [allSounds]);

  useEffect(
    function preloadSoundsOnAppLoad() {
      loadSounds();
      return () => allSounds.forEach((sound) => sound.unload());
    },
    [allSounds, loadSounds],
  );

  const data = {
    ...sounds,
    allSounds,
    coachSounds,
    isReady,
    loadSounds,
  };

  return <SoundContext value={data}>{children}</SoundContext>;
};
