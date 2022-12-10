import { FC } from "react";
import styled from "styled-components";
import { Form, Header, VolumeControl } from '../components';
import { TotalTime } from "../components/ui/TotalTime";

export const Home: FC = () => {


  return (
    
    <AppContainer>
        <Header />
        <TotalTime />
        <Form />
        <VolumeControl />
    </AppContainer>
  );
};

const AppContainer = styled.main`
  border-width: 2px;
  max-width: 40rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  user-select: none;
  background-color: #ffffff16;
  border: thin #1d1c1c solid;
`;
