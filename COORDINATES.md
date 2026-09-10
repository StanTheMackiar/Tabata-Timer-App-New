# Coordenadas del código — Tabata Timer

Mapa `archivo:línea` de cada símbolo del proyecto. Regenerado tras el rediseño Nocturne.
Índice de alto nivel y convenciones: ver [AGENTS.md](AGENTS.md).

## Entrada, rutas y estilos globales

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| Montaje de React | `src/main.tsx:5` | `createRoot` sobre `#root`, sin `StrictMode` |
| `App` | `src/App.tsx:10` | Providers: `Router > SoundProvider > PresetsProvider > TimerProvider > Navigation` |
| `GlobalStyle` | `src/App.tsx:25` | Tokens `--pf-*`, área segura y los cinco keyframes `pf-*` |
| `AppRoute` | `src/routes/routes.enum.ts:1` | `HOME = "/"`, `RUN = "/run"`, `SUMMARY = "/summary"` |
| `Navigation` | `src/routes/Navigation.tsx:5` | Tres rutas más redirección comodín a `HOME` |
| `buildRoute` / `useAppNavigate` | `src/routes/navigation.helper.ts:6` / `:17` | |

## Páginas

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `HomePage` | `src/pages/HomePage.tsx:18` | Dos columnas en escritorio; abre la hoja del editor |
| `RunPage` | `src/pages/RunPage.tsx:11` | Anillo + panel; el cartel de pausa va como `overlay` del Layout |
| ↳ guarda de acceso directo | `src/pages/RunPage.tsx:22` | Sale a `HOME` si no hay sesión ni resumen |
| `SummaryPage` | `src/pages/SummaryPage.tsx:17` | Pantalla nueva; a pantalla completa, sin cabecera |

## Estado global

### Presets

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `PresetsProvider` | `src/context/presets/PresetsProvider.tsx:5` | |
| `PresetsContext` / `usePresetsContext` | `src/context/presets/usePresetsContext.ts:6` / `:8` | El tipo del contexto sale de `ReturnType<typeof usePresets>` |
| `usePresets` | `src/hooks/usePresets.ts:18` | **Núcleo de los presets** |
| ↳ hidratación y migración | `src/hooks/usePresets.ts:25` | |
| ↳ `stepField` / `setField` / `renameActive` | `src/hooks/usePresets.ts:56` / `:60` / `:63` | Relativo, absoluto y nombre |
| `EditableField` | `src/hooks/usePresets.ts:16` | |

### Temporizador

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `TimerProvider` | `src/context/timer/TimerProvider.tsx:10` | Envuelve el reducer en acciones nombradas |
| `TimerContext` / `useTimerContext` | `src/context/timer/useTimerContext.ts:17` / `:19` | |
| `TimerSession` | `src/context/timer/timerReducer.ts:6` | `cycle` y `tabata` son 1-based, como se muestran |
| `SessionSummary` | `src/context/timer/timerReducer.ts:18` | Alimenta la pantalla de resumen |
| `TimerState` | `src/context/timer/timerReducer.ts:25` | `preset`, `session`, `summary`, `isPaused` |
| `TimerActionTypes` | `src/context/timer/timerReducer.ts:32` | 7 acciones |
| `timerReducer` | `src/context/timer/timerReducer.ts:66` | `START_SESSION` en :68, `COMPLETE_SESSION` en :113 |
| `useTimerReducer` | `src/context/timer/timerReducer.ts:142` | |

### Sonido

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `SoundProvider` | `src/context/sound/SoundProvider.tsx:5` | Elige el motor una sola vez |
| `SoundContext` / `useSoundContext` | `src/context/sound/useSoundContext.tsx:13` / `:15` | |
| `SOUND_SOURCES` | `src/context/sound/sounds.ts:16` | Mapa id → URL con hash de Vite |
| `COACH_SOUND_IDS` | `src/context/sound/sounds.ts:30` | Voz silenciable aparte |
| `createAudioEngine` | `src/context/sound/engines/index.ts:67` | Nativo si Capacitor; web en caso contrario |
| `createNativeEngineWithWebFallback` | `src/context/sound/engines/index.ts:16` | Rehace volumen y mute al degradar |
| `createWebAudioEngine` | `src/context/sound/engines/webAudioEngine.ts:14` | Howler |
| `createNativeAudioEngine` | `src/context/sound/engines/nativeAudioEngine.ts:25` | |
| `toNativeAssetPath` | `src/context/sound/engines/nativeAudioEngine.ts:15` | `/assets/x.mp3` → `public/assets/x.mp3` |
| `AudioEngine` / `SoundId` | `src/interfaces/audio/audio-engine.interface.ts:18` / `:1` | |

## Hooks

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `useSession` | `src/hooks/useSession.ts:29` | **Motor de la sesión** |
| ↳ refs de control | `src/hooks/useSession.ts:47` | `endAt`, `completed`, `paused`, `pauseRemaining`, `beeped` |
| ↳ `armPhaseEndTime` | `src/hooks/useSession.ts:55` | Instante de fin absoluto con Luxon |
| ↳ `syncPauseWithClock` | `src/hooks/useSession.ts:73` | Reconstruye `endAt` al reanudar |
| ↳ `playCountdown` | `src/hooks/useSession.ts:104` | Pita en 3-2-1-0 si la fase dura ≤ 60s |
| ↳ `finishPhase` | `src/hooks/useSession.ts:118` | Avanza o completa la sesión |
| ↳ tick | `src/hooks/useSession.ts:144` | 250 ms mientras corra y no esté pausada |
| `SessionView` | `src/hooks/useSession.ts:178` | Lo que consume la pantalla de sesión |
| `useSessionControls` | `src/hooks/useSessionControls.ts:7` | `start`, `stop`, `dismissSummary` |
| `useVolume` | `src/hooks/useVolume.ts:6` | Volumen global y mute del coach, persistidos |
| `useInterval` | `src/hooks/useInterval.ts:3` | |

## Componentes

### Armazón

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `Layout` | `src/components/layouts/Layout.tsx:20` | Resplandor + cabecera + popover + contenido + `overlay` |
| ↳ `AppContainer` | `src/components/layouts/Layout.tsx:69` | Área segura en los cuatro lados |
| `AppHeader` | `src/components/ui/AppHeader.tsx:17` | Marca, píldora de tiempo, coach y volumen |
| `VolumePopover` | `src/components/ui/VolumePopover.tsx:14` | Sustituye a la barra fija |
| `PhaseGlow` | `src/components/ui/PhaseGlow.tsx:12` | Resplandor difuso del fondo |
| `IconButton` | `src/components/ui/IconButton.tsx:4` | |
| `PrimaryAction` / `GhostAction` | `src/components/ui/ActionButton.tsx:15` / `:40` | |

### Home

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `TotalSession` | `src/components/home/TotalSession.tsx:11` | Total + desglose |
| `PresetChips` | `src/components/home/PresetChips.tsx:14` | Presets con nombre + Rename |
| `IntervalList` | `src/components/home/IntervalList.tsx:14` | Las tres filas de intervalo |
| `CounterStepper` | `src/components/home/CounterStepper.tsx:15` | ± de ciclos y tabatas, objetivos de 44px |

### Sesión

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `PhaseRing` | `src/components/run/PhaseRing.tsx:23` | Anillo de fase + arco de sesión |
| ↳ radios | `src/components/run/PhaseRing.tsx:14` | 92 (fase) y 79 (sesión) sobre un viewBox de 200 |
| `CyclePips` | `src/components/run/CyclePips.tsx:11` | |
| `RunPanel` | `src/components/run/RunPanel.tsx:12` | Tarjetas, barra de sesión y controles |
| `PausedOverlay` | `src/components/run/PausedOverlay.tsx:14` | Desenfoque; el reloj queda legible detrás |

### Editor

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `EditorSheet` | `src/components/editor/EditorSheet.tsx:21` | Hoja inferior: duración o renombrado |
| `QUICK_PICKS` | `src/components/editor/EditorSheet.tsx:17` | 5, 10, 20, 30, 40, 50, 60 s |
| `NAME_SUGGESTIONS` | `src/components/editor/EditorSheet.tsx:19` | |
| `TimerPicker` | `src/components/editor/TimerPicker.tsx:13` | Una columna Min o Sec |

## Tipos, enums y utilidades

| Símbolo | Coordenada | Notas |
| --- | --- | --- |
| `TimerPreset` | `src/interfaces/timer.interface.ts:8` | Intervalos en segundos totales, con `name` |
| `PhaseField` / `CountField` | `src/interfaces/timer.interface.ts:18` / `:21` | |
| `EditorTarget` | `src/interfaces/timer.interface.ts:24` | Unión `timer \| name` |
| `TimerType` | `src/enums/timer-type.enum.ts:1` | Sus valores son las claves de duración de `TimerPreset` |
| `LocalStorageKey` | `src/enums/local-storage-key.enum.ts:1` | |
| `COLORS` | `src/utils/colors.ts:8` | Paleta Nocturne; se publica como `--pf-*` |
| `BREAKPOINTS` | `src/utils/breakpoints.ts:1` | `desktop: 950` |
| `toShortTime` / `toClock` | `src/utils/time.ts:2` / `:8` | `1:05` y `01:05` |
| `PRESETS_QUANTITY` | `src/utils/presets.ts:4` | |
| `MIN_VALUE` / `MAX_VALUE` | `src/utils/presets.ts:7` / `:15` | Preparación admite 0; el resto, mínimo 1 |
| `createInitialPresets` | `src/utils/presets.ts:23` | Classic / Thirty / Forty / Fifty |
| `stepValue` | `src/utils/presets.ts:31` | Circular entre extremos |
| `getTotalSeconds` | `src/utils/presets.ts:48` | |
| `LegacyPreset` / `fromLegacy` | `src/utils/presets.ts:55` / `:69` | Migración del formato anterior al rediseño |
| `parseStoredPresets` | `src/utils/presets.ts:87` | Normaliza lo que haya guardado |
| `getNextPhase` | `src/utils/session.ts:15` | Máquina de estados de la sesión |
| `getElapsedSeconds` | `src/utils/session.ts:41` | |
| `getNextLabel` | `src/utils/session.ts:57` | |
| `getCyclePips` | `src/utils/session.ts:71` | |
| `getPhaseColor` / `getPhaseGlow` | `src/utils/timers.ts:29` / `:32` | |
| `getPhaseLabel` / `getPhaseHint` | `src/utils/timers.ts:35` / `:37` | |
| `PHASE_ORDER` | `src/utils/timers.ts:39` | Orden de las filas de la home |
| `getLocalStorageItem` / `setLocalStorageItem` | `src/utils/local-storage.ts:3` / `:17` | |

## Configuración

| Archivo | Notas |
| --- | --- |
| `capacitor.config.ts` | `appId`, `webDir`, `SystemBars`, live reload por `CAP_SERVER_URL` |
| `scripts/dev-server.mjs` | Puerto y host del dev server, en un único sitio |
| `scripts/dev-cap.mjs` | `adb reverse` + Vite en `0.0.0.0` |
| `vite.config.ts` | Puerto fijo con `strictPort`, PWA |
| `android/gradle.properties` | Requisito de JDK 21 documentado al final |

## Activos de sonido

| Archivo | Uso |
| --- | --- |
| `beeps/321beep.mp3` | Cuenta atrás (`useSession.ts:112`) |
| `beeps/pause.mp3` / `resume.mp3` | Pausa y reanudación (`useSession.ts:152`) |
| `coach/prepare.mp3` | Al iniciar (`useSessionControls.ts:17`) |
| `coach/work.mp3` / `rest.mp3` | Cambio de fase (`useSession.ts:137`) |
| `coach/stop.mp3` | Parada manual (`useSessionControls.ts:24`) |
| `coach/complete.mp3` | Sesión completada (`useSession.ts:131`) |
