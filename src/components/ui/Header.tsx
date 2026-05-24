import styled from "styled-components";


export const Header = () => (
    <Container>
      <Title>Tabata Timer</Title>
    </Container>
);


const Container = styled.section`
  display: flex;
  min-height: 5.25rem;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  color: var(--pf-white);
  font-family: "Arial Black", Impact, sans-serif;
  font-size: clamp(2rem, 10vw, 3.75rem);
  letter-spacing: 0;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
`;
