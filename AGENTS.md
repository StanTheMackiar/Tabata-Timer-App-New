# AGENTS.md — Índice del proyecto

Tabata Timer: PWA de temporizador por intervalos (preparación / trabajo / descanso) construida con React 19 + TypeScript + Vite, styled-components y Howler, empaquetada además como app nativa Android e iOS con Capacitor.

**Mapa completo de símbolos con coordenadas `archivo:línea`: [COORDINATES.md](COORDINATES.md).** Consúltalo antes de buscar a ciegas.
Para la visión funcional y técnica en prosa: [README.md](README.md).

## Comandos

| Comando | Qué hace |
| --- | --- |
| `yarn dev` | Vite en el puerto fijo 5173 |
| `yarn dev:cap` | `adb reverse` + Vite en `0.0.0.0`, para el emulador Android |
| `yarn build` | `tsc` (typecheck) + `vite build` |
| `yarn lint` / `yarn lint:fix` | ESLint sobre `src/` |
| `yarn cap:sync` | Build web + `cap sync` |
| `yarn android:dev` / `yarn ios:dev` | Ejecuta con live reload |
| `yarn android:open` / `yarn ios:open` | Abre Android Studio / Xcode |

Requiere Node >= 20 y **yarn**. El build de Android necesita **JDK 21**: Gradle 8.14 no arranca sobre Java 25 (`export JAVA_HOME=$(/usr/libexec/java_home -v 21)`). No hay tests: verifica con `yarn build` y `yarn lint`.

## Mapa de directorios

| Ruta | Contenido |
| --- | --- |
| `src/pages/` | `HomePage` (configurar), `RunPage` (sesión), `SummaryPage` (resumen final) |
| `src/routes/` | Enum de rutas, `Navigation`, helper `useAppNavigate` |
| `src/context/presets/` | Presets con nombre, persistencia y migración |
| `src/context/timer/` | Reducer y acciones de la sesión |
| `src/context/sound/` | Motor de audio; `engines/` contiene el web y el nativo |
| `src/components/ui/` | Armazón: cabecera, popover de volumen, resplandor, botones |
| `src/components/home/` | Total, presets, intervalos, contadores |
| `src/components/run/` | Anillo, pips, panel de sesión, cartel de pausa |
| `src/components/editor/` | Hoja inferior de edición y selector de tiempo |
| `src/hooks/` | `usePresets`, `useSession`, `useSessionControls`, `useVolume`, `useInterval` |
| `src/utils/` | `colors`, `presets`, `session`, `time`, `timers`, `local-storage`, `breakpoints` |
| `scripts/` | Puerto compartido del dev server y arranque con `adb reverse` |
| `android/`, `ios/` | Proyectos nativos versionados |

## Arquitectura en 60 segundos

1. `App.tsx` anida `SoundProvider > PresetsProvider > TimerProvider` bajo el `Router` e inyecta los tokens `--pf-*` de la paleta Nocturne.
2. **HomePage** muestra cuatro presets con nombre. Tocar un intervalo abre la hoja inferior; ciclos y tabatas se ajustan con ± sin salir de la pantalla.
3. Al pulsar Start, `useSessionControls` precarga los sonidos (el gesto es lo que desbloquea el audio en móvil), arranca la sesión en el reducer y navega a `/run`.
4. `useSession` es el motor: guarda un instante de fin absoluto con Luxon y hace tick cada 250 ms, así que el reloj no deriva. Al llegar a 0, `getNextPhase` decide la siguiente fase contando ciclos y tabatas hacia arriba.
5. Agotados los tabatas, el reducer guarda un `summary` y la app navega a `/summary`, que muestra trabajo acumulado, total, ciclos y tabatas.

## Convenciones

- **Estado en hooks, no en componentes.** Un provider fino (`PresetsProvider`) delega en su hook (`usePresets`).
- **`useEffect` con función nombrada** para documentar la intención: `useEffect(function hydratePresetsFromLocalStorage() {...}, [])`.
- **Los intervalos se guardan en segundos totales**, no en minutos + segundos. El editor deriva ambos campos al vuelo; es lo que permite `01:00` sin casos especiales.
- **Props de styled-components con prefijo `$`** (`$color`, `$isActive`) para que no lleguen al DOM.
- **Colores sólo desde `utils/colors.ts`**; en CSS usa las variables `--pf-*`. Un único breakpoint: `BREAKPOINTS.desktop` (950).
- **localStorage siempre vía** `getLocalStorageItem` / `setLocalStorageItem` con una clave de `LocalStorageKey`.
- **Navegación vía** `useAppNavigate` + `AppRoute`.
- **Iconos desde `react-icons/pi`** (Phosphor). Nada de CDNs: no resolverían offline ni dentro del WebView.
- Barrels (`index.ts`) en cada carpeta de componentes, `hooks/`, `utils/`, `enums/`, `interfaces/`, `pages/`.
- Commits en Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`).

## Puntos delicados

- **Audio**: el motor se elige en `createAudioEngine` según la plataforma. `loadSounds()` debe colgar de una interacción del usuario. En nativo, los cambios de volumen antes de terminar la precarga se ignoran y se reaplican al final.
- **El service worker cachea el bundle dentro del WebView**: tras un `cap copy` la app nativa puede seguir mostrando la versión anterior hasta un `adb shell pm clear`.
- **Las capas superpuestas** (hoja del editor, cartel de pausa) se pasan como prop `overlay` al `Layout`, no como hijos: si van dentro del contenido quedan recortadas y no cubren la cabecera.
- `StrictMode` está deshabilitado en `src/main.tsx`: el doble montaje duplicaría los efectos que arman el reloj.
- **Presets guardados antes del rediseño** se migran al leerlos (`parseStoredPresets`); no cambies su forma sin actualizar esa función.
- La PWA usa `registerType: "autoUpdate"` con devOptions activadas.
