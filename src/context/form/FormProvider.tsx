import { FC, PropsWithChildren } from "react";
import { useForm } from "../../hooks";
import { FormContext } from "./useFormContext";

export const FormProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useForm();

  return <FormContext value={value}>{children}</FormContext>;
};
