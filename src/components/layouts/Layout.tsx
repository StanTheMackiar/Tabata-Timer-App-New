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

  /*
   * El fondo cubre la pantalla física de borde a borde, mientras que el
   * contenido se mantiene dentro del área segura. Con box-sizing: border-box
   * (global) el padding no desborda el 100dvh.
   *
   * El inset inferior no va aquí sino dentro de VolumeControl, para que su
   * color de panel llegue hasta el borde en vez de dejar una franja del fondo
   * bajo la barra de gestos.
   */
  padding: var(--pf-safe-top) var(--pf-safe-right) 0 var(--pf-safe-left);

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    padding-left: calc(var(--pf-safe-left) + clamp(0.75rem, 2vw, 1.25rem));
    padding-right: calc(var(--pf-safe-right) + clamp(0.75rem, 2vw, 1.25rem));
  }
`;

const Content = styled.section`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
