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
import startBeep from "../../assets/sounds/beeps/startbeep.mp3";
import stopBeep from "../../assets/sounds/beeps/stopbeep.mp3";
import one from "../../assets/sounds/coach/1.mp3";
import two from "../../assets/sounds/coach/2.mp3";
import three from "../../assets/sounds/coach/3.mp3";
import prepare from "../../assets/sounds/coach/prepare.mp3";
import rest from "../../assets/sounds/coach/rest.mp3";
import stop from "../../assets/sounds/coach/stop.mp3";
import work from "../../assets/sounds/coach/work.mp3";
import { SoundContext } from "./useSoundContext";

export const SoundProvider: FC<PropsWithChildren> = ({ children }) => {
  const sounds = useMemo(
    () => ({
      startBeepSound: new Howl({ src: startBeep, preload: true, html5: false }),
      stopBeepSound: new Howl({ src: stopBeep, preload: true, html5: false }),
      prepareSound: new Howl({ src: prepare, preload: true, html5: false }),
      stopSound: new Howl({ src: stop, preload: true, html5: false }),
      finalBeepSound: new Howl({ src: finalBeep, preload: true, html5: false }),
      pauseSound: new Howl({ src: pause, preload: true, html5: false }),
      threeSound: new Howl({ src: three, preload: true, html5: false }),
      twoSound: new Howl({ src: two, preload: true, html5: false }),
      oneSound: new Howl({ src: one, preload: true, html5: false }),
      workSound: new Howl({ src: work, preload: true, html5: false }),
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
      sounds.threeSound,
      sounds.twoSound,
      sounds.oneSound,
      sounds.workSound,
      sounds.restSound,
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

  useEffect(function preloadSoundsOnAppLoad() {
    loadSounds();
    return () => allSounds.forEach((sound) => sound.unload());
  }, [allSounds, loadSounds]);

  const data = {
    ...sounds,
    allSounds,
    coachSounds,
    isReady,
    loadSounds,
  };

  return <SoundContext value={data}>{children}</SoundContext>;
};
