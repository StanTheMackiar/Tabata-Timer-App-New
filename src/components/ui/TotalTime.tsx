import styled from "styled-components";
import { useTotalTime } from "../../hooks/useTotalTime";

export const TotalTime = () => {
  const { totalMinutes, totalSeconds } = useTotalTime();

  return (
    <>
      <Container>
        <Subtitle>TOTAL TIME</Subtitle>
        <Time>
          {totalMinutes}:{totalSeconds}
        </Time>
      </Container>
    </>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--pf-panel);
  user-select: none;
  min-height: clamp(4.75rem, 15dvh, 9rem);
  border: 1px solid var(--pf-line);
  border-radius: 0.7rem;
  padding: clamp(0.6rem, 2dvh, 1rem);

  @media (min-width: 1050px) {
    min-height: 100%;
    border-radius: 1rem;
  }
`;
const Subtitle = styled.h4`
  margin: 0;
  color: var(--pf-muted);
  font-size: clamp(0.75rem, 1.25rem, 18px);
  font-weight: 800;
  letter-spacing: 0;
`;

const Time = styled.h2`
  color: var(--pf-white);
  font-family: var(--pf-font);
  font-size: 80px;
  font-weight: 900;
  line-height: 1;

  @media (min-width: 1050px) {
    font-size: clamp(80px, 13vw, 100px);
  }
`;
