import { InputTypes } from "../interfaces"

    
export const validateForm = ( valueToValidate: string, inputType: InputTypes ):string => {

    let value = String(Math.max(0, Number(valueToValidate) || 0)).padStart(2, '0')

    if ( Number(value) > 99 ) value = '99';
    if ( Number(value) < 1 && inputType !== 'minutes' ) value = '01';
    if ( inputType === 'seconds' && Number(value) > 59 ) value = '59';

    return value
}
