import React from "react";
import styled from "styled-components";


export const Header = () => (
    <Container>
      <Title>Tabata Timer</Title>
    </Container>
);


const Container = styled.section`
  background-color: #f0ffff1d;
  display: flex;
  flex: 1;
  border-bottom: thin #313131 solid;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  color: rgb(58, 159, 241);
  font-size: 2rem;
  text-align: center;
  margin: 0.5rem;
`;