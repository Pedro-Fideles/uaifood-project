const { validateBr } = require('js-brasil');

const { isDefined, isString, lengthIsSmallerThan } = require("./validations/validations");

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
  minLength: (value, size) => ({
    code: errorStatus,
    message: `o campo ${value} ter no mínimo ${size} caracteres.`
  }),
  invalidFormat: (value) => ({
    code: errorStatus,
    message: `o campo ${value} está com um formato inválido.`
  }),
}

const validateName = (req, _res, next) => {
  const { name } = req.body;

  switch (true) {
    case !isDefined(name): return next(fieldErrors.undefinedField('name'));
    case !isString(name): return next(fieldErrors.notString('name'));
    case lengthIsSmallerThan(name, 3): return next(fieldErrors.minLength('name', 3));
    default: return next();
  }
}

const validateCNPJ = (req, _res, next) => {
  const { cnpj } = req.body;

  switch (true) {
    case !isDefined(cnpj): return next(fieldErrors.undefinedField('cnpj'));
    case !isString(cnpj): return next(fieldErrors.notString('cnpj'));
    case !validateBr.cnpj(cnpj): return next(fieldErrors.invalidFormat('cnpj'));
    default: return next();
  }
}

const validatePassword = (req, _res, next) => {
  const { password } = req.body;

  switch (true) {
    case !isDefined(password): return next(fieldErrors.undefinedField('password'));
    case !isString(password): return next(fieldErrors.notString('password'));
    case lengthIsSmallerThan(password, 6): return next(fieldErrors.minLength('password', 6));
    default: return next();
  }
}

module.exports = {
  validateName,
  validateCNPJ,
  validatePassword,
};
