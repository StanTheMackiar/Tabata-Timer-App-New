import { InputTypes } from "../interfaces"

    
export const validateForm = ( valueToValidate: string, inputType: InputTypes ):string => {

    let value = valueToValidate.padStart(2, '0')
    value = value.slice(-2)

    if ( Number(value) > 99 ) value = '99';
    if ( Number(value) < 1 && inputType !== 'minutes' ) value = '01';

    return value
}