# Tabata Timer — Alpha 1.0

Versión renovada, más sólida y totalmente reestructurada de mi anterior aplicación Tabata Timer: mudada de repositorio, rediseñada desde cero y migrada a TypeScript para mayor escalabilidad.

Es una **PWA** creada para una empresa de gimnasios local. Sirve para entrenar con el método Tabata, que estructura la sesión en intervalos de trabajo y descanso.

**[Ver demo](https://newtabatatimer.netlify.app/)**

---

## Índice

- [Qué es el método Tabata](#qué-es-el-método-tabata)
- [Características](#características)
- [Stack técnico](#stack-técnico)
- [Puesta en marcha](#puesta-en-marcha)
- [Scripts](#scripts)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
  - [Árbol de providers](#árbol-de-providers)
  - [Flujo de una sesión](#flujo-de-una-sesión)
  - [Motor del cronómetro](#motor-del-cronómetro)
  - [Máquina de estados de los intervalos](#máquina-de-estados-de-los-intervalos)
  - [Gestión del audio](#gestión-del-audio)
  - [Persistencia](#persistencia)
- [Modelo de datos](#modelo-de-datos)
- [Estilos y diseño responsive](#estilos-y-diseño-responsive)
- [PWA](#pwa)
- [Convenciones de código](#convenciones-de-código)
- [Documentación adicional](#documentación-adicional)

---

## Qué es el método Tabata

Un entrenamiento Tabata se compone de:

- **Preparación** — cuenta atrás inicial antes de empezar.
- **Trabajo** — intervalo de esfuerzo máximo.
- **Descanso** — recuperación entre intervalos.
- **Ciclo** — una pareja trabajo + descanso.
- **Tabata** — un bloque completo de N ciclos.

La configuración por defecto de la app es 5 s de preparación, 20 s de trabajo, 10 s de descanso, 4 ciclos y 3 tabatas.

## Características

- **4 presets configurables** (T1–T4) que persisten entre sesiones.
- **Editor por diálogo**: se toca un intervalo y se ajusta con flechas, con valores circulares (de `59` pasa a `00`) pensado para uso táctil.
- **Tiempo total calculado en vivo** — `preparación + (trabajo + descanso) × ciclos × tabatas`.
- **Cronómetro sin deriva**, basado en un instante de fin absoluto en lugar de restar segundos.
- **Pausa y reanudación** que conservan el tiempo restante exacto del intervalo.
- **Señales sonoras**: pitido en la cuenta atrás final (3-2-1-0) y voz de coach anunciando cada fase.
- **Control de volumen independiente** para el volumen global y para la voz del coach.
- **Fondo cromático por fase** (amarillo preparación, verde trabajo, rojo descanso) legible a distancia.
- **Instalable como PWA** con service worker y actualización automática.
- **Interfaz a pantalla completa sin scroll**, adaptada de móvil a escritorio.

## Stack técnico

| Área | Elección | Notas |
| --- | --- | --- |
| UI | React 19 | Sin `StrictMode`: el doble montaje rompería los efectos del cronómetro |
| Lenguaje | TypeScript 6 (`strict: true`) | |
| Build | Vite 8 + `@vitejs/plugin-react` | |
| Estilos | styled-components 6 | Variables CSS `--pf-*` inyectadas por `createGlobalStyle` |
| Rutas | React Router 7 | Dos rutas más un redirect comodín |
| Audio | Howler 2 | Ocho pistas precargadas y compartidas vía contexto |
| Fechas | Luxon 3 | Aritmética del reloj y formateo del tiempo total |
| Iconos | react-icons | Set Remix Icon (`ri`) |
| PWA | `vite-plugin-pwa` + Workbox 7 | `registerType: "autoUpdate"` |
| Linting | ESLint 8 + `@typescript-eslint` | |

Sin librería de estado externa: bastan `useReducer` y Context.

## Puesta en marcha

Requisitos: **Node >= 20** y **yarn** (el repositorio versiona `yarn.lock`).

```bash
git clone git@github.com:StanTheMackiar/Tabata-Timer-App-New.git
cd Tabata-Timer-App-New
yarn install
yarn dev
```

La app queda disponible en `http://localhost:5173`.

> El service worker está activo también en desarrollo (`devOptions.enabled`). Si un cambio no se refleja, haz un recarga forzada o elimina el registro del service worker desde las DevTools.

## Scripts

| Script | Descripción |
| --- | --- |
| `yarn dev` | Servidor de desarrollo con HMR |
| `yarn build` | `tsc` (typecheck sin emitir) seguido de `vite build` |
| `yarn preview` | Sirve el build de producción localmente |
| `yarn lint` | ESLint sobre `src/` |
| `yarn lint:fix` | ESLint con autofix |

No hay suite de tests: la verificación se hace con `yarn build` (typecheck) y `yarn lint`.

## Estructura del proyecto

```
src/
├── App.tsx                 Providers, router y estilos globales
├── main.tsx                Punto de montaje de React
├── assets/sounds/
│   ├── beeps/              Pitidos: cuenta atrás, pausa, reanudar
│   └── coach/              Voz: prepare, work, rest, stop, complete
├── components/
│   ├── form/               Formulario, diálogo de edición, botón start/stop
│   │   └── styles/         styled-components del formulario
│   ├── layouts/            Layout de página (header + contenido + volumen)
│   └── ui/                 Timer, PauseTimer, TotalTime, VolumeControl, Header
├── context/
│   ├── form/               Estado del formulario y de los presets
│   ├── sound/              Instancias Howl compartidas y precarga
│   └── timer/              Reducer y acciones del cronómetro
├── enums/                  TimerType, LocalStorageKey
├── hooks/                  Toda la lógica de negocio
├── interfaces/             Tipos compartidos
├── pages/                  HomePage (configurar), StartPage (ejecutar)
├── routes/                 Enum de rutas, Navigation, helper de navegación
└── utils/                  colors, breakpoints, local-storage, timers, validation
```

## Arquitectura

El principio rector: **la lógica vive en hooks, los componentes sólo dibujan**. Cada provider es una capa fina que expone el valor de su hook por Context.

### Árbol de providers

```
Router
└── SoundProvider      instancias Howl + precarga
    └── FormProvider   presets, preset activo, validación (useForm)
        └── TimerProvider   estado del cronómetro (useReducer)
            └── Navigation
```

### Flujo de una sesión

1. **HomePage** muestra los presets T1–T4, los tres intervalos y los contadores de ciclos/tabatas. `useForm` hidrata los valores desde localStorage al montar.
2. Al tocar un intervalo se abre `FormEditorDialog`, que ajusta el campo con `stepField` mediante incrementos circulares.
3. Al enviar, `onSubmit` espera a `loadSounds()` —el gesto del usuario es lo que desbloquea el audio en móviles—, reproduce el aviso de preparación y navega a `/start?preset=N`.
4. **StartPage** resuelve los valores iniciales con `useInitialValues`, en cascada: query param → `ACTIVE_PRESET` de localStorage → `initialForm`.
5. `Timer` monta `useTimer`, que dispara el primer intervalo (`PREPARE`) y toma el control de la sesión.
6. Al terminar el último tabata —o al pulsar stop— `useStopButton` detiene todo el audio, reproduce el sonido correspondiente, resetea el reducer y vuelve a `/`.

### Motor del cronómetro

`useTimer` **no descuenta segundos acumulativamente**. Al arrancar cada intervalo guarda un instante de fin absoluto con Luxon:

```ts
endAtRef.current = DateTime.now().plus({ seconds: minutes * 60 + seconds });
```

y hace tick cada **250 ms** recalculando el tiempo restante contra el reloj real. Así el cronómetro no deriva aunque el navegador retrase el intervalo (pestaña en segundo plano, dispositivo con carga alta) y la UI reacciona en menos de un segundo al cambio de fase.

Al pausar se guarda el tiempo restante; al reanudar se reconstruye `endAt` a partir de ese valor, de modo que la pausa nunca pierde ni regala segundos.

Un `Set` de refs (`beepedRef`) garantiza que cada pitido de la cuenta atrás suene **una sola vez**, aunque varios ticks caigan dentro del mismo segundo. `completedRef` cumple la misma función para la transición de fase.

### Máquina de estados de los intervalos

```
PREPARE ──▶ WORK ──▶ REST ──┬──▶ WORK        (quedan ciclos)
                            ├──▶ WORK        (nuevo tabata: ciclos reiniciados)
                            └──▶ fin de sesión (no quedan tabatas)
```

Al acabar un descanso: si quedan ciclos se decrementa el contador de ciclos; si no, se reinician los ciclos y se decrementa el de tabatas. Cuando no quedan tabatas, la sesión termina con el sonido de finalización.

### Gestión del audio

Las ocho pistas se instancian una única vez en `SoundProvider` (dentro de un `useMemo`) y se precargan en paralelo; un error de carga resuelve igualmente para no bloquear el arranque. Al desmontar se libera cada instancia con `unload()`.

Los sonidos se dividen en dos grupos:

- **beeps** — cuenta atrás, pausa y reanudar; siguen el volumen global.
- **coach** — voz que anuncia cada fase; puede silenciarse por separado sin bajar el volumen general.

### Persistencia

Todo pasa por los helpers `getLocalStorageItem` / `setLocalStorageItem`, con parseo tolerante y valor por defecto, bajo claves tipadas en `LocalStorageKey`:

| Clave | Contenido |
| --- | --- |
| `tabata-presets` | Los cuatro presets del usuario |
| `tabata-active-preset` | Índice del preset seleccionado |
| `volume` | Volumen global (0–1) |
| `coachMuted` | Si la voz del coach está silenciada |

Al leer, los presets guardados se fusionan sobre los presets base, de modo que un dato corrupto o incompleto nunca deja la app en un estado inválido.

## Modelo de datos

El formulario existe en dos formas, deliberadamente separadas:

- **`TimerFormString`** — la forma de edición. Todos los valores son strings con relleno de dos dígitos (`"05"`), que es lo que se muestra y se valida.
- **`TimerFormNumber`** — la forma de ejecución. Valores numéricos, con `initialCycles` e `initialTabatas` como referencia para reiniciar los ciclos al empezar cada tabata.

La validación (`validateForm`) acota los valores: máximo 99, máximo 59 en segundos, y mínimo `01` en todo lo que no sean minutos.

## Estilos y diseño responsive

- La paleta se define una sola vez en `utils/colors.ts` y se publica como variables CSS `--pf-*` desde `createGlobalStyle`; los componentes consumen las variables, nunca literales de color.
- Un único breakpoint, `desktop: 950px`, en `utils/breakpoints.ts`. Móvil primero: en móvil todo es flexbox en columna; a partir del breakpoint el formulario y la pantalla de ejecución pasan a grid de dos columnas.
- Layout de altura completa sin scroll: `100dvh` con `overflow: hidden` y `min-height: 0` en los contenedores flex, de modo que la app se comporta como una pantalla fija y no como un documento.
- Tipografía y espaciados con `clamp()` para escalar de forma continua sin media queries adicionales.

## PWA

Configurada en `vite.config.ts` mediante `vite-plugin-pwa`:

- `registerType: "autoUpdate"` — el service worker se actualiza solo, sin pedir confirmación.
- Precacheo de `js`, `css`, `html`, `ico`, `png` y `svg` vía Workbox.
- Manifiesto en modo `standalone`, orientación `portrait`, con iconos de 64, 192 y 512 px.
- `devOptions.enabled` deja el service worker activo también en desarrollo.

## Convenciones de código

- **Estado en hooks**, no en componentes: un provider fino delega en su hook (`FormProvider` → `useForm`).
- **`useEffect` con función nombrada** para documentar la intención: `useEffect(function hydratePresetsFromLocalStorage() { … }, [])`.
- **Barrels (`index.ts`)** en `components/`, `hooks/`, `utils/`, `enums/`, `interfaces/` y `pages/`: al añadir un archivo, hay que exportarlo allí.
- **Navegación** siempre vía `useAppNavigate` y el enum `AppRoute`; nada de rutas en texto plano.
- **styled-components** al final del archivo del componente; el formulario centraliza los suyos en `FormStyles.ts`.
- **Commits** siguiendo Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`).

## Documentación adicional

- **[AGENTS.md](AGENTS.md)** — índice del proyecto: comandos, mapa de directorios, arquitectura resumida, convenciones y puntos delicados.
- **[COORDINATES.md](COORDINATES.md)** — mapa `archivo:línea` de todos los símbolos del código.
