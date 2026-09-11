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
- [PWA y app nativa](#pwa-y-app-nativa)
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

- **4 presets con nombre** (Classic, Thirty, Forty, Fifty), renombrables y persistentes.
- **Editor en hoja inferior**: se toca un intervalo y se ajusta con flechas de minutos y segundos, más atajos de 5 a 60 segundos.
- **Ciclos y tabatas a un toque** con botones ± en la propia pantalla de inicio.
- **Tiempo total calculado en vivo** — `preparación + (trabajo + descanso) × ciclos × tabatas`.
- **Cronómetro sin deriva**, basado en un instante de fin absoluto en lugar de restar segundos.
- **Progreso a tres niveles**: anillo grueso para el intervalo, arco fino para la sesión y un punto por ciclo bajo el reloj.
- **Pausa con desenfoque** que deja el reloj legible detrás.
- **Resumen de fin de sesión** con trabajo acumulado, total, ciclos y tabatas.
- **Señales sonoras**: pitido en la cuenta atrás final y voz de coach anunciando cada fase, silenciable aparte del volumen general.
- **Audio nativo en Android e iOS**, con Howler como respaldo en web y si la precarga nativa falla.
- **Instalable como PWA** y empaquetada como app nativa con Capacitor.
- **Interfaz a pantalla completa sin scroll**, respetando el área segura del dispositivo.

## Stack técnico

| Área | Elección | Notas |
| --- | --- | --- |
| UI | React 19 | Sin `StrictMode`: el doble montaje rompería los efectos del cronómetro |
| Lenguaje | TypeScript 6 (`strict: true`) | |
| Build | Vite 8 + `@vitejs/plugin-react` | |
| Estilos | styled-components 6 | Variables CSS `--pf-*` inyectadas por `createGlobalStyle` |
| Rutas | React Router 7 | Tres rutas más un redirect comodín |
| Audio | Howler 2 en web, `@capacitor-community/native-audio` en nativo | Detrás de una única interfaz `AudioEngine` |
| Fechas | Luxon 3 | Aritmética del reloj y formateo del tiempo total |
| Iconos | react-icons | Set Phosphor (`pi`), sin CDN para que funcione offline |
| PWA | `vite-plugin-pwa` + Workbox 7 | `registerType: "autoUpdate"` |
| Nativo | Capacitor 8 | Proyectos Android e iOS versionados en el repositorio |
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
| `yarn dev:cap` | `adb reverse` + Vite en `0.0.0.0`, para el emulador Android |
| `yarn cap:sync` | Build web seguido de `cap sync` |
| `yarn android:dev` / `yarn ios:dev` | Ejecuta en dispositivo con live reload |
| `yarn android:open` / `yarn ios:open` | Abre el proyecto en Android Studio o Xcode |

El build de Android necesita **JDK 21**: el wrapper trae Gradle 8.14, que no arranca sobre Java 25.

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
```

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
│   ├── ui/                 Cabecera, popover de volumen, resplandor, botones
│   ├── home/               Total, presets, intervalos, contadores
│   ├── run/                Anillo, pips, panel de sesión, cartel de pausa
│   ├── editor/             Hoja inferior de edición y selector de tiempo
│   └── layouts/            Armazón de la app
├── context/
│   ├── presets/            Presets con nombre, persistencia y migración
│   ├── sound/              Motor de audio; engines/ tiene el web y el nativo
│   └── timer/              Reducer y acciones de la sesión
├── enums/                  TimerType, LocalStorageKey
├── hooks/                  Toda la lógica de negocio
├── interfaces/             Tipos compartidos
├── pages/                  HomePage, RunPage, SummaryPage
├── routes/                 Enum de rutas, Navigation, helper de navegación
└── utils/                  colors, presets, session, time, timers, storage
```

## Arquitectura

El principio rector: **la lógica vive en hooks, los componentes sólo dibujan**. Cada provider es una capa fina que expone el valor de su hook por Context.

### Árbol de providers

```
Router
└── SoundProvider          motor de audio (nativo o web) + precarga
    └── PresetsProvider    presets con nombre, persistencia (usePresets)
        └── TimerProvider  estado de la sesión (useReducer)
            └── Navigation
```

### Flujo de una sesión

1. **HomePage** muestra los cuatro presets con nombre, los tres intervalos y los contadores de ciclos y tabatas. `usePresets` hidrata los valores desde localStorage al montar.
2. Al tocar un intervalo se abre la hoja inferior, que ajusta minutos y segundos con flechas o aplica un atajo de duración. Ciclos y tabatas se cambian con ± sin salir de la pantalla.
3. Al pulsar Start, `useSessionControls` espera a `loadSounds()` —el gesto del usuario es lo que desbloquea el audio en móviles—, reproduce el aviso de preparación, arranca la sesión en el reducer y navega a `/run`.
4. `useSession` toma el control: pinta el anillo, la barra de sesión y los pips, y avanza de fase cuando el reloj llega a cero.
5. Agotados los tabatas, el reducer guarda un resumen y la app navega a `/summary`. Desde ahí se puede repetir la sesión o volver al inicio.


### Motor del cronómetro

`useTimer` **no descuenta segundos acumulativamente**. Al arrancar cada intervalo guarda un instante de fin absoluto con Luxon:

```ts
endAtRef.current = DateTime.now().plus({ seconds: minutes * 60 + seconds });
```

y recalcula el restante contra el reloj real. Así el cronómetro no deriva aunque el navegador retrase un fotograma.

Ese restante se lleva en **dos resoluciones**. La fraccionaria se recalcula en cada fotograma y sólo alimenta lo que se mueve —el anillo del intervalo y la barra de sesión—, para que avancen de forma continua en vez de a saltos de un segundo. La entera llega al reducer únicamente cuando cambia de segundo, que es lo que necesitan la cifra del reloj, los pitidos y el cambio de fase; así el contexto no se actualiza sesenta veces por segundo.

Al pausar se guarda el tiempo restante; al reanudar se reconstruye `endAt` a partir de ese valor, de modo que la pausa nunca pierde ni regala segundos.

Un `Set` de refs (`beepedRef`) garantiza que cada pitido de la cuenta atrás suene **una sola vez**, aunque varios ticks caigan dentro del mismo segundo. `completedRef` cumple la misma función para la transición de fase.

### Máquina de estados de los intervalos

```
PREPARE ──▶ WORK ──▶ REST ──┬──▶ WORK        (quedan ciclos)
                            ├──▶ WORK        (nuevo tabata: ciclos a 1)
                            └──▶ resumen     (no quedan tabatas)
```

Los contadores avanzan hacia arriba, que es como se muestran en pantalla (`2 / 4`). Al acabar un descanso: si quedan ciclos se incrementa el ciclo; si no, se reinicia a 1 y se incrementa el tabata. Cuando no quedan tabatas, la sesión termina con el sonido de finalización y el resumen.

### Gestión del audio

Los dos motores implementan la misma interfaz `AudioEngine`, así que nada fuera de `context/sound` sabe sobre qué plataforma está sonando. En web y PWA suena por Howler; en Android e iOS, por la API nativa, que baja la latencia y esquiva las reglas de autoplay del WebView. Se configura para **mezclarse con la música que ya esté escuchando el usuario** en vez de robarle el foco de audio.

Si la precarga nativa falla, el motor cae al web y rehace el volumen y el silencio del coach que se hubieran ajustado antes del fallo.

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

Al leer, `parseStoredPresets` normaliza lo guardado sobre los presets base, de modo que un dato corrupto o incompleto nunca deja la app en un estado inválido. También **migra los presets del formato anterior al rediseño**, cuando cada intervalo eran dos campos de texto y los presets no tenían nombre.

## Modelo de datos

Un preset es un objeto plano con nombre y cinco números:

```ts
interface TimerPreset {
  name: string;
  prepare: number; // segundos
  work: number;
  rest: number;
  cycles: number;
  tabatas: number;
}
```

Los intervalos se guardan como **segundos totales**, no como minutos y segundos por separado. El editor deriva ambas cifras al vuelo. Es lo que permite fijar `01:00` sin casos especiales: el modelo anterior recorría los segundos de 01 a 59 y nunca pasaba por 00, así que el minuto exacto era inalcanzable.

Los límites viven en `utils/presets.ts`: la preparación admite 0, el resto un mínimo de 1, con máximos de 599 segundos y 20 repeticiones. `stepValue` es circular, para que una pulsación larga vuelva al otro extremo en lugar de atascarse.

## Estilos y diseño responsive

- La paleta Nocturne se define una sola vez en `utils/colors.ts` y se publica como variables CSS `--pf-*` desde `createGlobalStyle`; los componentes consumen las variables, nunca literales de color.
- El color de fase no inunda la pantalla: sobre el fondo indigo oscuro actúa como anillo, marca y resplandor, lo que deja sitio al progreso sin competir con la cifra del reloj.
- Un único breakpoint, `desktop: 950px`, en `utils/breakpoints.ts`. Móvil primero: en móvil todo es flexbox en columna; a partir del breakpoint el inicio y la sesión pasan a dos columnas.
- El área segura del dispositivo se expone como `--pf-safe-*`, que leen `env()` en iOS y navegadores y las variables que inyecta Capacitor en Android.
- Layout de altura completa sin scroll: `100dvh` con `overflow: hidden` y `min-height: 0` en los contenedores flex, de modo que la app se comporta como una pantalla fija y no como un documento.
- Tipografía y espaciados con `clamp()` para escalar de forma continua sin media queries adicionales.

## PWA y app nativa

La PWA se configura en `vite.config.ts` mediante `vite-plugin-pwa`:

- `registerType: "autoUpdate"` — el service worker se actualiza solo, sin pedir confirmación.
- Precacheo de `js`, `css`, `html`, `ico`, `png` y `svg` vía Workbox.
- Manifiesto en modo `standalone`, orientación `portrait`, con iconos de 64, 192 y 512 px.
- `devOptions.enabled` deja el service worker activo también en desarrollo.

Para las apps nativas, `capacitor.config.ts` fija el bundle id, apunta `webDir` a `dist/` y configura las barras de sistema. Los proyectos `android/` e `ios/` están versionados, así que los ajustes hechos a mano en Xcode o Gradle se conservan.

> Dentro del WebView el service worker sigue cacheando el bundle. Después de un `cap copy` la app nativa puede seguir mostrando la versión anterior hasta limpiar sus datos.

## Convenciones de código

- **Estado en hooks**, no en componentes: un provider fino delega en su hook (`PresetsProvider` → `usePresets`).
- **`useEffect` con función nombrada** para documentar la intención: `useEffect(function hydratePresetsFromLocalStorage() { … }, [])`.
- **Barrels (`index.ts`)** en `components/`, `hooks/`, `utils/`, `enums/`, `interfaces/` y `pages/`: al añadir un archivo, hay que exportarlo allí.
- **Navegación** siempre vía `useAppNavigate` y el enum `AppRoute`; nada de rutas en texto plano.
- **styled-components** al final del archivo del componente, con las props personalizadas prefijadas con `$` para que no lleguen al DOM.
- **Las capas superpuestas** (hoja del editor, cartel de pausa) se pasan como prop `overlay` al `Layout`: dentro del contenido quedarían recortadas y no cubrirían la cabecera.
- **Commits** siguiendo Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`).

## Documentación adicional

- **[AGENTS.md](AGENTS.md)** — índice del proyecto: comandos, mapa de directorios, arquitectura resumida, convenciones y puntos delicados.
- **[COORDINATES.md](COORDINATES.md)** — mapa `archivo:línea` de todos los símbolos del código.
