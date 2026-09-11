/**
 * iOS, incluido iPadOS.
 *
 * Desde iPadOS 13 el iPad se identifica como Macintosh en el user agent, así
 * que hay que distinguirlo por la presencia de pantalla táctil.
 */
export const isIos = () => {
  if (typeof navigator === "undefined") return false;

  const { maxTouchPoints, userAgent } = navigator;

  return (
    /iPad|iPhone|iPod/.test(userAgent) ||
    (/Macintosh/.test(userAgent) && maxTouchPoints > 1)
  );
};
