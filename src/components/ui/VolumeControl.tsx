import { CSSProperties } from "react";

import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { MdRecordVoiceOver, MdVoiceOverOff } from "react-icons/md";
import styled from "styled-components";
import { useVolume } from "../../hooks";

export const VolumeControl = () => {
  const { onChange, changeIsCoachMuted, volume, isCoachMuted } = useVolume();

  return (
    <Container>
      <Box>
        {volume === 0 ? (
          <HiVolumeOff style={{ padding: "0.2rem" }} size={"2rem"} />
        ) : (
          <HiVolumeUp style={{ padding: "0.2rem" }} size={"2rem"} />
        )}
        <InputRange
          type="range"
          min="0.0"
          max="1.0"
          step="0.01"
          value={volume}
          onChange={onChange}
        />
        <Text>{Math.floor(volume * 100)}%</Text>
      </Box>
      <Box>
        {!isCoachMuted ? (
          <MdRecordVoiceOver
            style={voiceStyle}
            onClick={() => changeIsCoachMuted(true)}
          />
        ) : (
          <MdVoiceOverOff
            style={voiceStyle}
            onClick={() => changeIsCoachMuted(false)}
          />
        )}
      </Box>
    </Container>
  );
};

const voiceStyle: CSSProperties = {
  margin: "0 2rem",
  cursor: "pointer",
  width: "1.5em",
  height: "1.5em",
};

const Container = styled.section`
  display: flex;
  min-height: clamp(3.25rem, 8dvh, 4rem);
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: var(--pf-panel);
  border-top: 1px solid var(--pf-line);
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
`;
const InputRange = styled.input`
  width: min(38vw, 10rem);
  accent-color: var(--pf-accent);
  &:hover {
    cursor: pointer;
  }
`;
const Text = styled.p`
  color: var(--pf-white);
  font-size: 12px;
  margin: 0.5rem;
`;
