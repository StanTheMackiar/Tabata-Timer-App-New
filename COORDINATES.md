# Coordenadas del código — Tabata Timer

Mapa `archivo:línea` de cada símbolo del proyecto. Generado el 2026-09-10 sobre el commit `e3ec15f`.
Índice de alto nivel y convenciones: ver [AGENTS.md](AGENTS.md).

## Entrada y arranque

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| Montaje de React | `src/main.tsx:5` | `createRoot` sobre `#root`, sin `StrictMode` (comentado) |
| `App` | `src/App.tsx:10` | Árbol de providers: `Router > SoundProvider > FormProvider > TimerProvider > Navigation` |
| `GlobalStyle` | `src/App.tsx:25` | `createGlobalStyle`; define las variables CSS `--pf-*` desde `COLORS` |
| HTML raíz | `index.html:1` | Meta PWA, fuente Inter vía `@import`, `<div id="root">` |

## Rutas

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `AppRoute` | `src/routes/routes.enum.ts:1` | `HOME = "/"`, `START = "/start"` |
| `Navigation` | `src/routes/Navigation.tsx:5` | `/` → `HomePage`, `/start` → `StartPage`, `/*` → redirect a `HOME` |
| `RouteParams` | `src/routes/navigation.helper.ts:4` | `Record<string, number \| string>` |
| `buildRoute` | `src/routes/navigation.helper.ts:6` | Serializa params a query string |
| `useAppNavigate` | `src/routes/navigation.helper.ts:17` | Wrapper de `useNavigate` tipado por `AppRoute` |

## Páginas

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `HomePage` | `src/pages/HomePage.tsx:8` | `Layout > TotalTime + Form` |
| `HomeContent` (styled) | `src/pages/HomePage.tsx:19` | Grid a partir de `BREAKPOINTS.desktop` |
| `StartPage` | `src/pages/StartPage.tsx:9` | `Timer` (sólo si `isLoaded`) + `CyclesAndTabata` + `StartStopButton action="stop"` |
| `RunContent` (styled) | `src/pages/StartPage.tsx:29` | |
| Barrel de páginas | `src/pages/index.ts:4` | |

## Contextos (estado global)

### Sonido

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `SoundProvider` | `src/context/sound/SoundProvider.tsx:21` | Instancia 8 `Howl` en `useMemo` |
| Mapa de sonidos | `src/context/sound/SoundProvider.tsx:22` | `prepare, stop, finalBeep, pause, work, complete, rest, resume` |
| `coachSounds` | `src/context/sound/SoundProvider.tsx:38` | Subconjunto silenciable por el usuario |
| `loadSounds` | `src/context/sound/SoundProvider.tsx:49` | Precarga con `Promise.all`; resuelve también en `loaderror` |
| Efecto de precarga | `src/context/sound/SoundProvider.tsx:67` | `unload()` en cleanup |
| `ContextProps` (sonido) | `src/context/sound/useSoundContext.tsx:4` | |
| `SoundContext` | `src/context/sound/useSoundContext.tsx:19` | |
| `useSoundContext` | `src/context/sound/useSoundContext.tsx:21` | |

### Formulario

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `FormProvider` | `src/context/form/FormProvider.tsx:5` | Delega toda la lógica en `useForm` |
| `FormContext` | `src/context/form/useFormContext.ts:4` | |
| `useFormContext` | `src/context/form/useFormContext.ts:8` | |

### Temporizador

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `TimerProvider` | `src/context/timer/TimerProvider.tsx:5` | Envuelve el reducer en acciones nombradas |
| `runTimer` | `src/context/timer/TimerProvider.tsx:8` | |
| `stopAllTimers` | `src/context/timer/TimerProvider.tsx:15` | |
| `TimerActionTypes` | `src/context/timer/timerReducer.ts:5` | 8 acciones |
| `TimerState` | `src/context/timer/timerReducer.ts:16` | `activeTimer`, `timer{minutes,seconds,tabatas,cycles}`, `isPaused` |
| `TimerActionType` (unión) | `src/context/timer/timerReducer.ts:27` | |
| `TIMER_INITIAL_STATE` | `src/context/timer/timerReducer.ts:40` | |
| `timerReducer` | `src/context/timer/timerReducer.ts:51` | `RUN_TIMER` en :56, `STOP_SESSION` en :70 |
| `useTimerReducer` | `src/context/timer/timerReducer.ts:127` | |
| `RunTimerParams` | `src/context/timer/useTimerContex.ts:5` | |
| `RunTimerFun` | `src/context/timer/useTimerContex.ts:12` | |
| `TimerContext` | `src/context/timer/useTimerContex.ts:27` | |
| `useTimerContext` | `src/context/timer/useTimerContex.ts:29` | Ojo: el archivo se llama `useTimerContex.ts` (sin la `t` final) |

## Hooks

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `initialForm` | `src/hooks/useForm.ts:14` | Preset por defecto: prep 00:05, work 00:20, rest 00:10, 4 ciclos, 3 tabatas |
| `PRESETS_QUANTITY` | `src/hooks/useForm.ts:25` | `4` — usado por `Form.tsx:39` y `setActivePreset` |
| `createInitialPresets` | `src/hooks/useForm.ts:27` | T1–T4 con `workS` 20/30/40/50 |
| `getCircularValue` | `src/hooks/useForm.ts:34` | Incremento circular; max 59 (min/seg) o 99, min 0 (minutos) o 1 |
| `readPresets` | `src/hooks/useForm.ts:48` | Fusiona lo guardado con los presets base |
| `useForm` | `src/hooks/useForm.ts:62` | **Núcleo del formulario** |
| ↳ hidratación desde localStorage | `src/hooks/useForm.ts:71` | |
| ↳ persistencia de presets | `src/hooks/useForm.ts:79` | |
| ↳ `onChange` / `updateField` / `stepField` | `src/hooks/useForm.ts:93` / `:101` / `:109` | |
| ↳ `onSubmit` | `src/hooks/useForm.ts:121` | Carga sonidos, reproduce `prepare`, navega a `/start?preset=N` |
| `useTimer` | `src/hooks/useTimer.ts:14` | **Motor del cronómetro** |
| ↳ `secondsFromTimer` | `src/hooks/useTimer.ts:11` | |
| ↳ refs de control | `src/hooks/useTimer.ts:28` | `endAtRef`, `completedRef`, `pausedRef`, `pauseRemainingRef`, `beepedRef` |
| ↳ arranque en PREPARE | `src/hooks/useTimer.ts:38` | |
| ↳ `armCurrentTimerEndTime` | `src/hooks/useTimer.ts:51` | Fija el instante de fin con Luxon (reloj absoluto, no acumulativo) |
| ↳ `syncPauseStateWithTimerClock` | `src/hooks/useTimer.ts:68` | Recalcula `endAt` al reanudar |
| ↳ `getRemainingSeconds` | `src/hooks/useTimer.ts:88` | |
| ↳ `playCountdown` | `src/hooks/useTimer.ts:96` | Pita en 3, 2, 1, 0 y sólo si `minutes === 0` |
| ↳ `finishCurrentTimer` | `src/hooks/useTimer.ts:109` | Máquina de estados PREPARE→WORK→REST→WORK…; fin en :136 |
| ↳ `toggleTimerPause` | `src/hooks/useTimer.ts:151` | |
| ↳ tick del intervalo | `src/hooks/useTimer.ts:160` | 250 ms mientras haya timer activo y no esté pausado |
| `useInterval` | `src/hooks/useInterval.ts:3` | Patrón clásico de Dan Abramov con `savedCallback` |
| `useInitialValues` | `src/hooks/useInitialValues.ts:15` | Lee `?preset=` o `ACTIVE_PRESET` y devuelve `TimerFormNumber` |
| ↳ `InitialValuesReturn` | `src/hooks/useInitialValues.ts:8` | |
| ↳ `getPresetFromStorage` | `src/hooks/useInitialValues.ts:47` | |
| `useStopButton` | `src/hooks/useStopButton.ts:7` | `Howler.stop()`, sonido stop/complete, reset y vuelta a `HOME` |
| `useTotalTime` | `src/hooks/useTotalTime.ts:5` | `prepare + (work + rest) * cycles * tabatas` |
| `useVolume` | `src/hooks/useVolume.ts:7` | Volumen global Howler + mute de voz del coach, persistidos |
| Barrel de hooks | `src/hooks/index.ts:3` | |

## Componentes

### Formulario

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `timerEditors` | `src/components/form/Form.tsx:20` | Config declarativa de los 3 botones de tiempo |
| `Form` | `src/components/form/Form.tsx:31` | Barra de presets (:38), grid de timers (:51), diálogo (:81) |
| `FormEditorDialog` | `src/components/form/FormEditorDialog.tsx:22` | Modal con selector de flechas |
| ↳ `Props` | `src/components/form/FormEditorDialog.tsx:17` | |
| `CyclesAndTabata` | `src/components/form/CyclesAndTabata.tsx:13` | Reutilizado en Home (editable) y Start (sólo lectura) |
| ↳ `Props` | `src/components/form/CyclesAndTabata.tsx:6` | |
| ↳ `StatsRow` / `StatButton` | `src/components/form/CyclesAndTabata.tsx:42` / `:52` | |
| `StartStopButton` | `src/components/form/StartStopButton.tsx:13` | |
| ↳ `ButtonAction` | `src/components/form/StartStopButton.tsx:11` | `"start" \| "stop"` |
| ↳ `Button` (styled) | `src/components/form/StartStopButton.tsx:27` | |
| Barrel de form | `src/components/form/index.ts:1` | |

### UI

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `Timer` | `src/components/ui/Timer.tsx:13` | Consume `useTimer`; formatea `MM:SS` en :17 |
| ↳ `Props` (`{ form: TimerFormNumber }`) | `src/components/ui/Timer.tsx:9` | Reutilizado como `useTimerProps` en `useTimer.ts:3` |
| ↳ `TimerSection` (styled) | `src/components/ui/Timer.tsx:32` | Fondo según `bgColor` del tipo de timer |
| `PauseTimer` | `src/components/ui/PauseTimer.tsx:10` | |
| `TotalTime` | `src/components/ui/TotalTime.tsx:5` | |
| `VolumeControl` | `src/components/ui/VolumeControl.tsx:8` | Slider + toggle de voz (`voiceStyle` en :46) |
| `Header` | `src/components/ui/Header.tsx:3` | |
| Barrel de UI | `src/components/ui/index.ts:4` | |

### Layout y estilos

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `Layout` | `src/components/layouts/Layout.tsx:6` | |
| ↳ `AppContainer` / `Content` | `src/components/layouts/Layout.tsx:16` / `:33` | |
| `StyledForm` | `src/components/form/styles/FormStyles.ts:4` | Grid 2 columnas en desktop |
| `PresetBar` | `src/components/form/styles/FormStyles.ts:18` | |
| `PresetButton` | `src/components/form/styles/FormStyles.ts:29` | Prop `active` |
| `TimersGrid` | `src/components/form/styles/FormStyles.ts:42` | |
| `TimerButton` | `src/components/form/styles/FormStyles.ts:54` | Prop `bgColor` |
| `StatsRow` / `StatButton` | `src/components/form/styles/FormStyles.ts:84` / `:94` | |
| `Overlay` / `Dialog` / `DialogTitle` | `src/components/form/styles/FormStyles.ts:123` / `:133` / `:142` | |
| `PickerRow` / `Picker` / `ArrowButton` | `src/components/form/styles/FormStyles.ts:149` / `:157` / `:163` | |
| `Value` / `Colon` / `CloseButton` | `src/components/form/styles/FormStyles.ts:175` / `:184` / `:190` | |
| Bloque de exports | `src/components/form/styles/FormStyles.ts:200` | |

## Tipos e interfaces

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `TimerFormString` | `src/interfaces/timer.interface.ts:1` | Forma del formulario (strings con padding `"05"`) |
| `TimerFormNumber` | `src/interfaces/timer.interface.ts:12` | Forma de ejecución; usa `initialCycles` / `initialTabatas` |
| `InputTypes` | `src/interfaces/timer.interface.ts:23` | |
| `ITimers` | `src/interfaces/timer.interface.ts:25` | Sin usos actuales |
| `FormProviderProps` | `src/interfaces/providers/form-provider.interface.ts:4` | Contrato del `FormContext` |
| `TimerField` | `src/interfaces/forms/form.interface.ts:4` | |
| `CountField` | `src/interfaces/forms/form.interface.ts:9` | |
| `FormEditor` | `src/interfaces/forms/form.interface.ts:11` | Unión discriminada `timer \| count` |
| `FormTimerEditor` | `src/interfaces/forms/form.interface.ts:20` | |
| `declare module "*.mp3"` | `types/asset.d.ts:1` | |

## Enums, utilidades y constantes

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `TimerType` | `src/enums/timer-type.enum.ts:1` | `prepare \| work \| rest` |
| `LocalStorageKey` | `src/enums/local-storage-key.enum.ts:1` | `ACTIVE_PRESET`, `COACH_MUTED`, `PRESETS`, `VOLUME` |
| `COLORS` | `src/utils/colors.ts:1` | Fuente única de color; se expone como `--pf-*` en `App.tsx:25` |
| `BREAKPOINTS` | `src/utils/breakpoints.ts:1` | `desktop: 950` |
| `getLocalStorageItem` | `src/utils/local-storage.ts:3` | Parseo tolerante con fallback |
| `setLocalStorageItem` | `src/utils/local-storage.ts:17` | |
| `getBGColor` | `src/utils/timers.ts:5` | |
| `getTimerValue` | `src/utils/timers.ts:14` | |
| `getInputValue` | `src/utils/input.ts:5` | Sin usos actuales |
| `validateForm` | `src/utils/validation.ts:4` | Clamp 0–99, 0–59 en segundos, mínimo `01` fuera de minutos |
| Barrel de utils | `src/utils/index.ts:3` | Reexporta como namespaces: `validation`, `timers`, `inputs` |

## Configuración

| Archivo | Coordenada clave | Notas |
| --- | --- | --- |
| `package.json:10` | scripts | `dev`, `build`, `preview`, `lint`, `lint:fix` |
| `package.json:6` | engines | Node >= 20 |
| `vite.config.ts:9` | `VitePWA` | `registerType: "autoUpdate"`, devOptions activadas |
| `vite.config.ts:18` | manifest PWA | standalone, portrait, iconos 64/192/512 |
| `tsconfig.json` | `strict: true`, `jsx: react-jsx`, `include: ["src","types"]` | |
| `.eslintrc.cjs` | eslint + react + @typescript-eslint recomendados | |

## Activos de sonido

| Archivo | Uso |
| --- | --- |
| `src/assets/sounds/beeps/321beep.mp3` | Cuenta atrás 3-2-1-0 (`useTimer.ts:106`) |
| `src/assets/sounds/beeps/pause.mp3` | Pausa (`useTimer.ts:155`) |
| `src/assets/sounds/beeps/resume.mp3` | Reanudar (`useTimer.ts:153`) |
| `src/assets/sounds/coach/prepare.mp3` | Al enviar el formulario (`useForm.ts:124`) |
| `src/assets/sounds/coach/work.mp3` | Inicio de trabajo (`useTimer.ts:114`, `:141`) |
| `src/assets/sounds/coach/rest.mp3` | Inicio de descanso (`useTimer.ts:125`) |
| `src/assets/sounds/coach/stop.mp3` | Parada manual (`useStopButton.ts:16`) |
| `src/assets/sounds/coach/complete.mp3` | Sesión completada (`useStopButton.ts:15`) |
