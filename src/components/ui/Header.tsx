import styled from "styled-components";

export const Header = () => (
  <Container>
    <Title>Tabata Timer</Title>
  </Container>
);

const Container = styled.section`
  display: flex;
  min-height: clamp(3.75rem, 8dvh, 5.25rem);
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--pf-line);
`;

const Title = styled.h1`
  color: var(--pf-accent);
  font-family: var(--pf-font);
  font-size: clamp(1.6rem, 10vw, 2.5rem);
  font-weight: 900;
  letter-spacing: 0;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
`;
