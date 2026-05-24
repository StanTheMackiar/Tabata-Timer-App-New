import { LocalStorageKey } from "../enums";

export const getLocalStorageItem = <T>(
  key: LocalStorageKey,
  fallback: T,
): T => {
  const stored = localStorage.getItem(key);
  if (!stored) return fallback;

  try {
    return JSON.parse(stored) as T;
  } catch {
    return stored as T;
  }
};

export const setLocalStorageItem = <T>(key: LocalStorageKey, value: T) => {
  localStorage.setItem(
    key,
    typeof value === "string" ? value : JSON.stringify(value),
  );
};
