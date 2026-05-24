import { createContext, useContext } from "react";
import { FormProviderProps } from "../../interfaces/providers/form-provider.interface";

export const FormContext = createContext<FormProviderProps>(
  {} as FormProviderProps,
);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
