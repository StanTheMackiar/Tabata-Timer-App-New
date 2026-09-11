import { FC } from "react";
import { PiPause, PiPlayFill } from "react-icons/pi";
import styled from "styled-components";
import { GhostAction, PrimaryAction } from "../ui";

interface Props {
  onResume: VoidFunction;
  onStop: VoidFunction;
  phaseLabel: string;
  timeLabel: string;
}

/** El reloj sigue visible detrás del desenfoque: la sesión no desaparece. */
export const PausedOverlay: FC<Props> = ({
  onResume,
  onStop,
  phaseLabel,
  timeLabel,
}) => (
  <Overlay>
    <Content>
      <PiPause
        size={38}
        color="var(--pf-accent)"
      />
      <Title>Paused</Title>
      <Detail>
        {phaseLabel} · {timeLabel} remaining
      </Detail>

      <Actions>
        <ResumeButton
          type="button"
          onClick={onResume}
        >
          <PiPlayFill color="var(--pf-accent)" />
          Resume
        </ResumeButton>

        <EndButton
          type="button"
          $danger
          onClick={onStop}
        >
          End session
        </EndButton>
      </Actions>
    </Content>
  </Overlay>
);

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 25;
  display: grid;
  place-items: center;
  background: rgba(22, 24, 38, 0.82);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  animation: pf-fade 0.18s ease-out;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(14px, 2vw, 22px);
  text-align: center;
  padding: clamp(16px, 3vw, 28px);
  animation: pf-rise 0.22s ease-out;
`;

const Title = styled.div`
  font-size: clamp(22px, 3vw, 38px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const Detail = styled.div`
  font-size: clamp(11px, 1.2vw, 14px);
  line-height: 1.5;
  color: rgba(233, 233, 237, 0.6);
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 6px;
`;

const ResumeButton = styled(PrimaryAction)`
  padding: 0 clamp(20px, 2.6vw, 30px);
  min-height: clamp(48px, 6vw, 60px);
  font-size: clamp(14px, 1.6vw, 19px);
`;

const EndButton = styled(GhostAction)`
  padding: 0 clamp(18px, 2.2vw, 26px);
  min-height: clamp(48px, 6vw, 60px);
  font-size: clamp(14px, 1.6vw, 19px);
`;
