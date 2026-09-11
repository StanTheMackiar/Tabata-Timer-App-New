export const initEruda = () => {
  const cap =
    "Capacitor" in window
      ? (window.Capacitor as Record<string, unknown>)
      : null;

  const isNative =
    (cap &&
      "isNativePlatform" in cap &&
      typeof cap.isNativePlatform === "function" &&
      cap.isNativePlatform()) ||
    / wv\b/.test(navigator.userAgent || "");

  const eruda =
    "eruda" in window ? (window.eruda as Record<string, unknown>) : null;

  if (!eruda) return;

  if (
    isNative &&
    "init" in eruda &&
    typeof eruda.init === "function" &&
    eruda !== null
  )
    eruda.init();
};
