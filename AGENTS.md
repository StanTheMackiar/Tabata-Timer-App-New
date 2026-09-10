# AGENTS.md — Índice del proyecto

Tabata Timer: PWA de temporizador por intervalos (preparación / trabajo / descanso) construida con React 19 + TypeScript + Vite, styled-components y Howler.

**Mapa completo de símbolos con coordenadas `archivo:línea`: [COORDINATES.md](COORDINATES.md).** Consúltalo antes de buscar a ciegas.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `yarn dev` | Servidor de desarrollo Vite (PWA activa en dev) |
| `yarn build` | `tsc` (typecheck) + `vite build` |
| `yarn preview` | Sirve el build de producción |
| `yarn lint` / `yarn lint:fix` | ESLint sobre `src/` |

Requiere Node >= 20. El gestor de paquetes es **yarn** (`yarn.lock`). No hay tests configurados: verifica con `yarn build` y `yarn lint`.

## Mapa de directorios

| Ruta | Contenido |
| --- | --- |
| `src/pages/` | `HomePage` (configuración) y `StartPage` (ejecución) |
| `src/routes/` | Enum de rutas, `Navigation`, helper `useAppNavigate` |
| `src/context/` | Tres providers: `sound/`, `form/`, `timer/` (este último con reducer) |
| `src/hooks/` | Lógica de negocio: `useForm`, `useTimer`, `useVolume`, `useTotalTime`, `useInterval`, `useInitialValues`, `useStopButton` |
| `src/components/form/` | Formulario, diálogo de edición, botón start/stop y `styles/FormStyles.ts` |
| `src/components/ui/` | `Timer`, `PauseTimer`, `TotalTime`, `VolumeControl`, `Header` |
| `src/components/layouts/` | `Layout` (contenedor de página) |
| `src/interfaces/`, `src/enums/` | Tipos compartidos y enums (`TimerType`, `LocalStorageKey`, `AppRoute`) |
| `src/utils/` | `colors`, `breakpoints`, `local-storage`, `timers`, `validation`, `input` |
| `src/assets/sounds/` | `beeps/` (pitidos) y `coach/` (voz, silenciable aparte) |
| `types/asset.d.ts` | Declaración de módulo para `*.mp3` |
| `dist/`, `dev-dist/` | Salidas de build y del service worker; no editar |

## Arquitectura en 60 segundos

1. `App.tsx` anida `SoundProvider > FormProvider > TimerProvider` bajo el `Router` e inyecta las variables CSS `--pf-*` desde `utils/colors.ts`.
2. **HomePage** muestra 4 presets (T1–T4) persistidos en localStorage. Toda la lógica vive en `useForm`; los componentes sólo dibujan.
3. Al enviar, `useForm.onSubmit` precarga los sonidos (gesto de usuario necesario para el audio), reproduce el aviso y navega a `/start?preset=N`.
4. **StartPage** hidrata los valores con `useInitialValues` (query param → localStorage → `initialForm`) y monta `Timer`.
5. `useTimer` es el motor: guarda un instante de fin absoluto con Luxon (`endAtRef`) y hace tick cada 250 ms, en vez de restar segundos acumulativamente. Al llegar a 0, `finishCurrentTimer` avanza la máquina de estados PREPARE → WORK → REST → WORK … decrementando ciclos y tabatas; cuando se agotan, `useStopButton` reproduce el sonido de finalización y vuelve a `/`.

## Convenciones

- **Estado en hooks, no en componentes.** Un provider fino (`FormProvider`) delega en su hook (`useForm`). Los componentes consumen el contexto y renderizan.
- **`useEffect` con función nombrada** para documentar la intención: `useEffect(function hydratePresetsFromLocalStorage() {...}, [])`. Mantén el patrón.
- **Dos formas del formulario**: `TimerFormString` (edición, valores con padding `"05"`) y `TimerFormNumber` (ejecución, con `initialCycles`/`initialTabatas`). No las mezcles.
- **Colores sólo desde `utils/colors.ts`**; en CSS usa las variables `--pf-*`. Los breakpoints salen de `utils/breakpoints.ts` (`desktop: 950`).
- **localStorage siempre vía** `getLocalStorageItem` / `setLocalStorageItem` con una clave de `LocalStorageKey`.
- **Navegación vía** `useAppNavigate` + `AppRoute`; nada de strings de ruta sueltos.
- **styled-components** al final del archivo del componente, salvo el formulario, que centraliza los suyos en `FormStyles.ts`.
- Barrels (`index.ts`) en `components/`, `hooks/`, `utils/`, `enums/`, `interfaces/`, `pages/`: al añadir un archivo, expórtalo allí.
- Los mensajes de commit siguen Conventional Commits (`refactor:`, `feat:`, `fix:`).

## Puntos delicados

- **Audio**: los `Howl` se crean una vez en `SoundProvider`; `loadSounds()` debe invocarse tras una interacción del usuario o los navegadores móviles bloquean la reproducción. Los `coachSounds` se silencian por separado del volumen global.
- **El archivo del contexto de timer se llama `useTimerContex.ts`** (falta la `t`). Está así en todos los imports; no lo renombres sin actualizarlos.
- `StrictMode` está deshabilitado en `src/main.tsx:5` — el doble montaje rompería los efectos del cronómetro.
- `src/utils/input.ts` (`getInputValue`) y `ITimers` no tienen usos actuales.
- La PWA usa `registerType: "autoUpdate"` con devOptions activadas: en desarrollo puede servirse contenido cacheado por el service worker.
