import { FC, PropsWithChildren } from "react";
import { usePresets } from "../../hooks/usePresets";
import { PresetsContext } from "./usePresetsContext";

export const PresetsProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = usePresets();

  return <PresetsContext value={value}>{children}</PresetsContext>;
};
