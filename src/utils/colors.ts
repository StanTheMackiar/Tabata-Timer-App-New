/**
 * Paleta Nocturne, tomada del design system del rediseño.
 *
 * El color de fase ya no inunda la pantalla: sobre el fondo indigo oscuro
 * actúa como anillo, marca y resplandor, así que cada fase necesita también
 * su versión translúcida para los halos.
 */
export const COLORS = {
  prepare: "#e3b95c",
  work: "#5ecfa4",
  rest: "#e8776a",

  prepareGlow: "rgba(227, 185, 92, 0.5)",
  workGlow: "rgba(94, 207, 164, 0.5)",
  restGlow: "rgba(232, 119, 106, 0.5)",

  bg: "#161826",
  panel: "#232532",
  line: "rgba(233, 233, 237, 0.16)",
  white: "#e9e9ed",
  muted: "rgba(233, 233, 237, 0.55)",
  faint: "rgba(233, 233, 237, 0.12)",

  accent: "#9184d9",
  accentText: "#e7e5fe",
  accentSoft: "#d2cefd",
  accentHover: "#423a6a",
  accentSurface: "#2b2741",
  accentGlow: "rgba(145, 132, 217, 0.34)",

  outline: "#595d6c",
};
