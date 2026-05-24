import { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import { Header, VolumeControl } from "../ui";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppContainer>
      <Header />
      <Content>{children}</Content>
      <VolumeControl />
    </AppContainer>
  );
};

const AppContainer = styled.main`
  width: 100dvw;
  height: 100dvh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  user-select: none;
  background-color: var(--pf-bg);
  overflow: hidden;

  @media (min-width: 1050px) {
    width: min(100dvw, 1180px);
    padding: 0 1.25rem;
  }
`;

const Content = styled.section`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
