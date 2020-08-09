/**
 * @fileOverview
 * @name validations.js
 * @author vmgabriel - Gabriel Vargas
 * @license GPL 3.0
 */

// Constants
const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


/**
  * Validation Email Data
  * params {data: string} - Data to Verify
  * return {error: boolean, message: string} - is Valid Email
  */
const isValidateEmail = data => (!reEmail.test(data.toLowerCase()))
      ? { error: true, message: 'Email not Valid' }
      : { error: false, message: '' }
;


/**
 * Validation Clear Data
 * params {data: string | undefined} - Data to Verify
 * return {error: boolean, message: string} - is Data no Valid
 */
const isValidateClear = data => (!data || data === '')
      ? { error: true, message: 'Data clear' }
      : { error: false, message: '' }
;


/**
 * Validation Data to Verify
 */
const validations = [
  { name: 'required', funcValidation: isValidateClear },
  { name: 'isEmail', funcValidation: isValidateEmail }
];


export default validations;
