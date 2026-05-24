import { FC } from "react";
import { ImPause2, ImPlay3 } from "react-icons/im";
import styled from "styled-components";

interface Props {
  togglePause: () => void;
  isPaused: boolean;
}

export const PauseTimer: FC<Props> = ({ isPaused, togglePause }) => {
  return (
    <Container>
      {isPaused ? (
        <ImPlay3 style={{ cursor: "pointer" }} onClick={togglePause} />
      ) : (
        <ImPause2 style={{ cursor: "pointer" }} onClick={togglePause} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  outline: none;
  border: none;
  color: var(--pf-dark-text);
  font-size: 4rem;
`;
