const isDefined = (value) => value;
const isString = (value) => typeof value === 'string';
const isNumber = (value) => typeof value === 'number';
const lengthIsSmallerThan = (value, num) => value.length < num;
const isEmpty = (value) => value.length === 0;
const isArray = (value) => Array.isArray(value);
const arrayOf = (values, type) => values.every((value) => typeof value === type);

const errorStatus = 422;

const fieldErrors = {
  undefinedField: (value) => ({
    code: errorStatus,
    message: `o campo ${value} é obrigatório.`
  }),
  notString: (value) => ({
    code: errorStatus,
    message: `o campo ${value} deve ser string.`
  }),
  notNumber: (value) => ({
    code: errorStatus,
    message: `o campo ${value} deve ser number.`
  }),
  minLength: (value, size) => ({
    code: errorStatus,
    message: `o campo ${value} ter no mínimo ${size} caracteres.`
  }),
  invalidFormat: (value) => ({
    code: errorStatus,
    message: `o campo ${value} está com um formato inválido.`
  }),
  fieldIsEmpty: (value) => ({
    code: errorStatus,
    message: `o campo ${value} não deve estar vazio`,
  }),
  notArray: (value) => ({
    code: errorStatus,
    message: `o campo ${value} deve ser um array`,
  }),
  notArrayOf: (value, type) => ({
    code: errorStatus,
    message: `o campo ${value} deve ser um array de ${type}`,
  }),
};

module.exports = {
  fieldErrors,
  isDefined,
  isString,
  isNumber,
  lengthIsSmallerThan,
  isEmpty,
  isArray,
  arrayOf
};