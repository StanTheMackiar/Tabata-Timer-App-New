import { createContext, useContext } from "react";
import { usePresets } from "../../hooks/usePresets";

type ContextProps = ReturnType<typeof usePresets>;

export const PresetsContext = createContext({} as ContextProps);

export const usePresetsContext = () => {
  const context = useContext(PresetsContext);
  if (!context) {
    throw new Error("usePresetsContext must be used within a PresetsProvider");
  }
  return context;
};
