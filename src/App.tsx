import { BrowserRouter as Router } from "react-router-dom";

import { createGlobalStyle } from "styled-components";
import { FormProvider } from "./context/form/FormProvider";
import { SoundProvider } from "./context/sound/SoundProvider";
import { TimerProvider } from "./context/timer/TimerProvider";
import { Navigation } from "./routes/Navigation";
import { COLORS } from "./utils/colors";

const App = () => {
  return (
    <Router>
      <SoundProvider>
        <FormProvider>
          <TimerProvider>
            <GlobalStyle />
            <Navigation />
          </TimerProvider>
        </FormProvider>
      </SoundProvider>
    </Router>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  :root {
    --pf-bg: ${COLORS.bg};
    --pf-panel: ${COLORS.panel};
    --pf-panel-alt: ${COLORS.panelAlt};
    --pf-line: ${COLORS.line};
    --pf-white: ${COLORS.white};
    --pf-muted: ${COLORS.muted};
    --pf-accent: ${COLORS.accent};
    --pf-dark-text: ${COLORS.textDark};
    --pf-prepare: ${COLORS.prepare};
    --pf-work: ${COLORS.work};
    --pf-rest: ${COLORS.rest};
    --pf-font: Inter, Arial, Helvetica, sans-serif;
  }
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    min-width: 320px;
    overflow: hidden;
  }
  body {
    margin: 0;
    background-color: var(--pf-bg);
    color: var(--pf-white);
    font-family: var(--pf-font);
    min-height: 100dvh;
    -webkit-text-size-adjust: 100%;
  }
  button,
  input {
    font: inherit;
  }
  button {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }
  p {
    color: var(--pf-muted);
    font-size: 1rem;
    text-align: center;
  }
`;

export default App;
