import { createContext } from 'react';
import { Howl } from 'howler';


interface ContextProps {
    finalBeepSound: Howl
    oneSound: Howl
    prepareSound: Howl
    restSound: Howl
    startBeepSound: Howl
    stopBeepSound: Howl
    stopSound: Howl
    threeSound: Howl
    twoSound: Howl
    workSound: Howl
}


export const SoundContext = createContext({} as ContextProps);