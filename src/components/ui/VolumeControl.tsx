import { CSSProperties } from "react";

import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { MdRecordVoiceOver, MdVoiceOverOff } from "react-icons/md";
import styled from "styled-components";
import { useVolume } from "../../hooks";



export const VolumeControl = () => {

  const { onChange, changeIsMuted, volume, isMuted } = useVolume()

 

  return (
    <Container>
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
            onClick={() => changeIsMuted(true)}
          />
        ) : (
          <MdVoiceOverOff
            style={voiceStyle}
            onClick={() => changeIsMuted(false)}
          />
        )}
      </Box>
    </Container>
  );
}

const voiceStyle: CSSProperties = {
  margin: "0 2rem",
  cursor: "pointer",
  width: "1.5em",
  height: "1.5em",
};

const Container = styled.section`
  display: flex;
  height: 50px;
  flex: 1;
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