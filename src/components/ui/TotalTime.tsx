
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
  flex: 2;
  flex-direction: column;
  align-items: center;
  background-color: #1cc771;
  user-select: none;
  margin: 0;
  border-top: thin #313131 solid;
  border-bottom: thin #313131 solid;
`;
const Subtitle = styled.h4`
  margin: 0;
  align-self: stretch;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  padding: 0.2rem;
  background-color: #ffffff1f;
`;
const Time = styled.h2`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 80px;
`;
