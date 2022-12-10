
export interface TimerForm {
    prepareM: string,
    prepareS: string,
    recoveryM: string,
    recoveryS: string,
    restM: string,
    restS: string,
    workM: string,
    workS: string,
    cycles: string,
    tabatas: string,
 }
 

export type TimerTypes = 'prepare' | 'work' | 'rest' | 'recovery'
export type InputTypes = 'minutes' | 'seconds' | 'cycles' | 'tabatas'


export interface ITimers {
    prepare: number;
    work: number;
    recovery: number;
    rest: number;
}