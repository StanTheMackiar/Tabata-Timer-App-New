/** 65 → "1:05". Formato compacto, para etiquetas secundarias. */
export const toShortTime = (totalSeconds: number) => {
  const seconds = Math.max(0, Math.ceil(totalSeconds));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
};

/** 65 → "01:05". Formato de reloj, para las cifras grandes. */
export const toClock = (totalSeconds: number) => {
  const seconds = Math.max(0, Math.round(totalSeconds));
  return [Math.floor(seconds / 60), seconds % 60]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
};
