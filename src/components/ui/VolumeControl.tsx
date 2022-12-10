import React, { CSSProperties, useContext, useEffect, useState } from "react";

import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { MdRecordVoiceOver, MdVoiceOverOff } from "react-icons/md";
import styled from "styled-components";
import { Howler } from "howler";

import { SoundContext } from '../../context/sound';

const initialVolume = localStorage.getItem("volume") || '1'

const initialIsMuted: boolean = JSON.parse(localStorage.getItem("isMuted") as string) || false;


export const VolumeControl = () => {
    const {
        prepareSound,
        stopSound,
        threeSound,
        twoSound,
        oneSound,
        workSound,
        restSound,
    } = useContext(SoundContext)

  const [volume, setVolume] = useState(Number(initialVolume));
  const [isMuted, setIsMuted] = useState(initialIsMuted);

  const onChange = (e) => {
    setVolume(Number(e.target.value))
    Howler.volume(volume);
  }

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

  return (
    <ContainerFlex>
      <Box>
        {volume === 0 ? (
          <HiVolumeOff
            style={{ padding: "0.2rem" }}
            size={"2rem"}
          />
        ) : (
          <HiVolumeUp
            style={{ padding: "0.2rem" }} 
            size={"2rem"}
          />
        )}
        <InputRange
          type="range"
          min="0.0"
          max="1.0"
          step="0.01"
          value={ volume }
          onChange={ onChange }
        />
        <Text>{Math.floor(volume * 100)}%</Text>
      </Box>
      <Box>
        {!isMuted ? (
          <MdRecordVoiceOver
            style={voiceStyle}
            onClick={() => {
              setIsMuted(true);
              localStorage.setItem("isMuted", JSON.stringify(true));
            }}
          />
        ) : (
          <MdVoiceOverOff
            style={voiceStyle}
            onClick={() => {
              setIsMuted(false);
              localStorage.setItem("isMuted", JSON.stringify(false));
            }}
          />
        )}
      </Box>
    </ContainerFlex>
  );
}

const voiceStyle: CSSProperties = {
  margin: "0 2rem",
  cursor: "pointer",
  width: "1.5em",
  height: "1.5em",
};

const ContainerFlex = styled.section`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: #3b3b3b;
  border-top: thin #313131 solid;
  border-bottom: thin #313131 solid;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
`;
const InputRange = styled.input`
  width: 10rem;
  &:hover {
    cursor: pointer;
  }
`;
const Text = styled.p`
  color: white;
  font-size: 12px;
  margin: 0.5rem;
`;