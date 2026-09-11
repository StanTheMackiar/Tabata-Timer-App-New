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

    /*
     * Área segura del dispositivo: notch, isla dinámica, barra de gestos.
     *
     * En iOS y en navegadores la fuente es env(), habilitada por el
     * viewport-fit=cover de index.html. En Android, Capacitor fuerza env() a 0
     * e inyecta --safe-area-inset-* con los valores reales, así que la variable
     * manda y env() queda como respaldo.
     */
    --pf-safe-top: var(--safe-area-inset-top, env(safe-area-inset-top, 0px));
    --pf-safe-right: var(--safe-area-inset-right, env(safe-area-inset-right, 0px));
    --pf-safe-bottom: var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px));
    --pf-safe-left: var(--safe-area-inset-left, env(safe-area-inset-left, 0px));
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
  /*
   * Dentro del contenedor nativo la app deja de comportarse como un
   * documento: ni selección de texto, ni menú al mantener pulsado, ni zoom
   * por doble toque. En navegador no se aplica nada de esto.
   */
  html[data-native="true"] {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    /* Corta el doble toque para hacer zoom sin afectar al desplazamiento. */
    touch-action: manipulation;
  }

  html[data-native="true"] input,
  html[data-native="true"] textarea {
    /* Los campos de texto sí deben poder seleccionarse y editarse. */
    -webkit-user-select: text;
    user-select: text;
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
