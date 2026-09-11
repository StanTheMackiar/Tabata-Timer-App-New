import { FC, PropsWithChildren, ReactNode, useState } from "react";
import styled from "styled-components";
import { useTimerContext } from "../../context/timer/useTimerContext";
import { useVolume } from "../../hooks";
import { timers } from "../../utils";
import { BREAKPOINTS } from "../../utils/breakpoints";
import { AppHeader, PhaseGlow, VolumePopover } from "../ui";

interface Props {
  /** Sólo la pantalla de sesión lo aporta; alimenta la píldora de la cabecera. */
  elapsedLabel?: string;
  /**
   * Capa que tapa la app entera, cabecera incluida: la hoja del editor y el
   * cartel de pausa. Va aquí y no entre los hijos para que no quede recortada
   * por el área de contenido.
   */
  overlay?: ReactNode;
}

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  elapsedLabel,
  overlay,
}) => {
  const { state } = useTimerContext();
  const { changeIsCoachMuted, isCoachMuted, onChange, volume } = useVolume();

  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  const phaseColor = timers.getPhaseColor(state.session?.phase ?? null);
  // Fuera de la sesión el resplandor es indigo; dentro, el de la fase.
  const glowColor = state.session
    ? timers.getPhaseGlow(state.session.phase)
    : timers.getPhaseGlow(null);

  const toggleCoach = () => changeIsCoachMuted(!isCoachMuted);

  return (
    <AppContainer onClick={() => isVolumeOpen && setIsVolumeOpen(false)}>
      <PhaseGlow color={glowColor} />

      <AppHeader
        elapsedLabel={elapsedLabel}
        isCoachMuted={isCoachMuted}
        phaseColor={phaseColor}
        volume={volume}
        onToggleCoach={toggleCoach}
        onToggleVolume={() => setIsVolumeOpen((open) => !open)}
      />

      {isVolumeOpen && (
        <div onClick={(event) => event.stopPropagation()}>
          <VolumePopover
            isCoachMuted={isCoachMuted}
            volume={volume}
            onChangeVolume={onChange}
            onToggleCoach={toggleCoach}
          />
        </div>
      )}

      <Content>{children}</Content>

      {overlay}
    </AppContainer>
  );
};

const AppContainer = styled.main`
  position: relative;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  user-select: none;
  background-color: var(--pf-bg);

  /*
   * El fondo cubre la pantalla física de borde a borde y el contenido se
   * mantiene dentro del área segura. Con box-sizing: border-box (global) el
   * padding no desborda el 100dvh.
   */
  padding: var(--pf-safe-top) var(--pf-safe-right) var(--pf-safe-bottom)
    var(--pf-safe-left);

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    padding-left: calc(var(--pf-safe-left) + clamp(0.75rem, 2vw, 1.25rem));
    padding-right: calc(var(--pf-safe-right) + clamp(0.75rem, 2vw, 1.25rem));
  }
`;

const Content = styled.section`
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
