
import styled from "styled-components";
import { useTotalTime } from '../../hooks/useTotalTime';


export const TotalTime = () => {

  const { totalMinutes, totalSeconds } = useTotalTime();

  return (
    <>
        <Container>
          <Subtitle>TOTAL TIME</Subtitle>
          <Time>
            {totalMinutes} : {totalSeconds}
          </Time>
        </Container>
    </>
  );
}


const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--pf-panel);
  user-select: none;
  margin: 0 1rem;
  border: 1px solid var(--pf-line);
  border-radius: 0.35rem;
  padding: 0.75rem;
`;
const Subtitle = styled.h4`
  margin: 0;
  color: var(--pf-muted);
  font-size: 0.8rem;
  letter-spacing: 0;
`;
const Time = styled.h2`
  color: var(--pf-white);
  font-family: "Arial Black", Impact, sans-serif;
  font-size: clamp(3.25rem, 17vw, 6rem);
  line-height: 1;
`;
