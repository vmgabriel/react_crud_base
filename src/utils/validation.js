/**
 * @fileOverview
 * @name validation.js
 * @author vmgabriel - Gabriel Vargas
 * @license GPL 3.0
 */

import validations from './validate/validations';

/**
 * Function Validate with validation Data and Change formBase with Data Entry
 * @param {object} datas - Parameter description.
 * @param {object} formBase - Parameter description.
 * @param {function} validation - Parameter description.
 * @returns {object} Return description.
 */
const validateControl = (datas) => (formBase) => (validation) => {
  const result = validation(datas[formBase.name]);
  formBase.isError = result.error;
  formBase.messageError = result.message;
  return formBase;
};


/**
 * Function Validate Data into formBase
 * @param {object} datas - Parameter data to eval.
 * @param {object} formBase - Parameter rules for formBase.
 * @returns {object} Return a Object with error if exist.
 */
const validate = (datas) => (formBase) => {
  const validateField = validateControl(datas)(formBase);

  let validationAttribute = {
    ...formBase,
    isError: false,
    messageError: ''
  };

  validationAttribute = validations.reduce(
    (acc, curr) => (formBase[curr.name] && !acc.isError)
      ? validateField(curr.funcValidation)
      : acc,
    validationAttribute
  );

  return validationAttribute;
};


export default validate;
