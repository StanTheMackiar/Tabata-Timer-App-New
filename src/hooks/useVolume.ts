import { useContext, useState, ChangeEvent, useEffect } from "react";
import { SoundContext } from "../context";



export const useVolume = () => {
    const {
        prepareSound,
        stopSound,
        threeSound,
        twoSound,
        oneSound,
        workSound,
        restSound,
    } = useContext(SoundContext)

  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
    Howler.volume(volume);
  }

  const changeIsMuted = ( state: boolean ) => {
    setIsMuted(state);
    localStorage.setItem("isMuted", JSON.stringify(state));
  } 

  useEffect(()=> {
    const initialVolume = localStorage.getItem("volume") || '0.5'
    setVolume(Number(initialVolume))
  }, [])

useEffect(() => {
  const initialIsMuted: boolean = JSON.parse(localStorage.getItem("isMuted") as string) || false;
  setIsMuted(initialIsMuted)
}, []);


  useEffect(()=> {
    Howler.volume(volume)
  }, [volume])

  useEffect(()=> {
    localStorage.setItem("volume", volume.toString());
  }, [volume])

  useEffect(() => {
    prepareSound.mute(isMuted ? true : false)
    stopSound.mute(isMuted ? true : false)
    threeSound.mute(isMuted ? true : false)
    twoSound.mute(isMuted ? true : false)
    oneSound.mute(isMuted ? true : false)
    workSound.mute(isMuted ? true : false)
    restSound.mute(isMuted ? true : false)
  }, [isMuted]);

  return {
    isMuted,
    volume, 

    onChange,
    changeIsMuted,
  }
}