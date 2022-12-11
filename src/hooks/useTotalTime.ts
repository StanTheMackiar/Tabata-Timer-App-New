import { useState, useContext, useEffect } from "react";
import { FormContext } from "../context";
import { ITimers } from "../interfaces";


export const useTotalTime = () => {
    const [totalMinutes, setTotalMinutes] = useState<string>('00');
    const [totalSeconds, setTotalSeconds] = useState<string>('00');
  
    const { form } = useContext(FormContext);

      
    useEffect(() => {
        // Obtiene la cantidad de veces que se repite cada timer
        const repeat = getRepeat();
    
        // Calculando el total de minutos de cada timer
        const totalMinForTimer = getTotalTimer(
          repeat,
          num.workM,
          num.prepareM,
          num.restM,
          num.recoveryM
        );
    
        // Calculando el total de segundos de cada timer
        const totalSecForTimer = getTotalTimer(
          repeat,
          num.workS,
          num.prepareS,
          num.restS,
          num.recoveryS
        );
    
        // Total de minutos (sumando solo los minutos)
        const totalMins = getTotal(totalMinForTimer);
    
        //Total de segundos
        const totalSecs = getTotal(totalSecForTimer);
    
        // Convirtiendo segundos a minutos y los decimales sobrantes a segundos
        const { decimalPart, secsToMin } = ConvertDecimalsToSecs(totalSecs);
    
        // Valores a mostrar en pantalla
        const minutesToShow = String(secsToMin + totalMins).padStart(2, '0')
        const secondstToShow = String(Math.floor(decimalPart * 60)).padStart(2, '0')
    
        setTotalMinutes(minutesToShow);
        setTotalSeconds(secondstToShow);
    
      }, [ form ]);

  
    const num = {
      prepareM  : Number(form.prepareM),
      prepareS  : Number(form.prepareS),
      workM     : Number(form.workM),
      workS     : Number(form.workS),
      restM     : Number(form.restM),
      restS     : Number(form.restS),
      recoveryM : Number(form.recoveryM),
      recoveryS : Number(form.recoveryS),
      cycles    : Number(form.cycles),
      tabatas   : Number(form.tabatas),
    }
  
  
    // cantidad de veces que se repite cada timer
    const getRepeat = (): ITimers => {
      const prepare = 1;
      const work = num.tabatas * num.cycles;
      const recovery = num.tabatas - 1;
      const rest = (num.cycles - 1) * num.tabatas;
  
      return {
        prepare,
        recovery,
        rest,
        work,
      };
    };
  
    const getTotalTimer = (
      repeat: ITimers,
      workInput: number,
      prepareInput: number,
      restInput: number,
      recoveryInput: number,
    ): ITimers => {
      const work = workInput * repeat.work;
      const prepare = prepareInput * repeat.prepare;
      const rest = restInput * repeat.rest;
      const recovery = recoveryInput * repeat.recovery;
  
      return {
        prepare,
        recovery,
        rest,
        work,
      };
    };
  
    const getTotal = ({ work, prepare, recovery, rest}: ITimers ): number => {
      const total = work + prepare + recovery + rest;
      return total;
    };
  
    const ConvertDecimalsToSecs = ( totalSecs: number ): { decimalPart: number, secsToMin: number } => {
  
      const toMin = totalSecs / 60;
      const secsToMin = Math.trunc(toMin);
      const decimalPart = toMin.toString().replace(/^[^.]+/, "0");
  
      return {
        decimalPart: Number(decimalPart),
        secsToMin,
      };
    };


    return {
        totalMinutes,
        totalSeconds
    }
}