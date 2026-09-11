import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { PresetsProvider } from "./context/presets/PresetsProvider";
import { SoundProvider } from "./context/sound/SoundProvider";
import { TimerProvider } from "./context/timer/TimerProvider";
import { Navigation } from "./routes/Navigation";
import { COLORS } from "./utils/colors";

const App = () => {
  return (
    <Router>
      <SoundProvider>
        <PresetsProvider>
          <TimerProvider>
            <GlobalStyle />
            <Navigation />
          </TimerProvider>
        </PresetsProvider>
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
    --pf-line: ${COLORS.line};
    --pf-faint: ${COLORS.faint};
    --pf-white: ${COLORS.white};
    --pf-muted: ${COLORS.muted};
    --pf-outline: ${COLORS.outline};

    --pf-accent: ${COLORS.accent};
    --pf-accent-text: ${COLORS.accentText};
    --pf-accent-soft: ${COLORS.accentSoft};
    --pf-accent-hover: ${COLORS.accentHover};
    --pf-accent-surface: ${COLORS.accentSurface};

    --pf-prepare: ${COLORS.prepare};
    --pf-work: ${COLORS.work};
    --pf-rest: ${COLORS.rest};

    --pf-font: Inter, system-ui, -apple-system, sans-serif;
    --pf-radius: 14px;

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
    background-color: var(--pf-bg);
    color: var(--pf-white);
    font-family: var(--pf-font);
    font-size: 15px;
    min-height: 100dvh;
    -webkit-font-smoothing: antialiased;
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

  :focus-visible {
    outline: 2px solid var(--pf-accent);
    outline-offset: 2px;
  }

  /* Cada animación marca un cambio de estado; ninguna es decorativa. */
  @keyframes pf-breathe {
    0%, 100% { opacity: 0.34; }
    50% { opacity: 0.62; }
  }

  @keyframes pf-rise {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: none; }
  }

  @keyframes pf-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes pf-pop {
    from { opacity: 0; transform: scale(0.965); }
    to { opacity: 1; transform: none; }
  }

  @keyframes pf-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default App;
