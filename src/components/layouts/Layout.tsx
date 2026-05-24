import { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../utils/breakpoints";
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

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    width: 100dvw;
    padding: 0 clamp(0.75rem, 2vw, 1.25rem);
  }
`;

const Content = styled.section`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
