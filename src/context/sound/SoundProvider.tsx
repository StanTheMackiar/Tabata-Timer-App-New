import React, { FC, PropsWithChildren } from "react";
import { Howl } from "howler";

import { SoundContext } from './SoundContext';

import startBeep from "../../assets/sounds/startbeep.mp3";
import stopBeep from "../../assets/sounds/stopbeep.mp3";
import finalBeep from "../../assets/sounds/321beep.mp3";
import three from "../../assets/sounds/3.mp3";
import two from "../../assets/sounds/2.mp3";
import one from "../../assets/sounds/1.mp3";
import work from "../../assets/sounds/work.mp3";
import rest from "../../assets/sounds/rest.mp3";
import prepare from "../../assets/sounds/prepare.mp3";
import stop from "../../assets/sounds/stop.mp3";

export const SoundProvider:FC<PropsWithChildren> = ({ children }) => {

  const sounds = {
    startBeepSound: new Howl({ src: startBeep, preload: true }),
    stopBeepSound: new Howl({ src: stopBeep, preload: true }),
    prepareSound: new Howl({ src: prepare, preload: true }),
    stopSound: new Howl({ src: stop, preload: true }),
    finalBeepSound: new Howl({ src: finalBeep, preload: true }),
    threeSound: new Howl({ src: three, preload: true }),
    twoSound: new Howl({ src: two, preload: true }),
    oneSound: new Howl({ src: one, preload: true }),
    workSound: new Howl({ src: work, preload: true }),
    restSound: new Howl({ src: rest, preload: true }),
  }


  const data = {
    ...sounds
  };

  return (
    <SoundContext.Provider value={data}>
      {children}
    </SoundContext.Provider>
  );
};

