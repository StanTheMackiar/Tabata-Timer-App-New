import { Duration } from "luxon";
import { useMemo } from "react";
import { useFormContext } from "../context/form/useFormContext";

export const useTotalTime = () => {
  const { form } = useFormContext();

  return useMemo(() => {
    const prepare = Number(form.prepareM) * 60 + Number(form.prepareS);
    const work = Number(form.workM) * 60 + Number(form.workS);
    const rest = Number(form.restM) * 60 + Number(form.restS);
    const cycles = Number(form.cycles);
    const tabatas = Number(form.tabatas);
    const totalSeconds = prepare + (work + rest) * cycles * tabatas;
    const duration = Duration.fromObject({ seconds: totalSeconds }).shiftTo(
      "minutes",
      "seconds",
    );

    return {
      totalMinutes: String(Math.floor(duration.minutes)).padStart(2, "0"),
      totalSeconds: String(Math.floor(duration.seconds)).padStart(2, "0"),
    };
  }, [form]);
};
