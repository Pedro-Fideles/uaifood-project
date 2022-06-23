const { validateBr } = require('js-brasil');

const { 
  isDefined,
  isString,
  lengthIsSmallerThan,
  isEmpty,
  fieldErrors
} = require("./validations/validations");

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

const validateAddress = (req, _res, next) => {
  const { address } = req.body;

  switch (true) {
    case !isDefined(address): return next(fieldErrors.undefinedField('address'));
    case !isString(address): return next(fieldErrors.notString('address'));
    case lengthIsSmallerThan(address, 5): return next(fieldErrors.minLength('address', 5));
    default: return next();
  }
}

const validateNumber = (req, _res, next) => {
  const { number } = req.body;

  switch (true) {
    case !isDefined(number): return next(fieldErrors.undefinedField('number'));
    case !isString(number): return next(fieldErrors.notString('number'));
    case isEmpty(number): return next(fieldErrors.fieldIsEmpty('number'));
    default: return next();
  }
}

const validateComplement = (req, _res, next) => {
  const { complement } = req.body;

  if (complement) {
    switch (true) {
      case !isString(complement): return next(fieldErrors.notString('complement'));
      default: return next();
    }
  }

  return next();
}

const validateDistrict = (req, _res, next) => {
  const { district } = req.body;

  switch (true) {
    case !isDefined(district): return next(fieldErrors.undefinedField('district'));
    case !isString(district): return next(fieldErrors.notString('district'));
    case lengthIsSmallerThan(district, 5): return next(fieldErrors.minLength('district', 5));
    default: return next();
  }
}

const validateCity = (req, _res, next) => {
  const { city } = req.body;

  switch (true) {
    case !isDefined(city): return next(fieldErrors.undefinedField('city'));
    case !isString(city): return next(fieldErrors.notString('city'));
    case lengthIsSmallerThan(city, 3): return next(fieldErrors.minLength('city', 3));
    default: return next();
  }
}

const validateState = (req, _res, next) => {
  const { state } = req.body;

  switch (true) {
    case !isDefined(state): return next(fieldErrors.undefinedField('state'));
    case !isString(state): return next(fieldErrors.notString('state'));
    case lengthIsSmallerThan(state, 3): return next(fieldErrors.minLength('state', 3));
    default: return next();
  }
}

const validateType = (req, _res, next) => {
  const { type } = req.body;

  switch (true) {
    case !isDefined(type): return next(fieldErrors.undefinedField('type'));
    case !isString(type): return next(fieldErrors.notString('type'));
    case lengthIsSmallerThan(type, 3): return next(fieldErrors.minLength('type', 3));
    default: return next();
  }
}

module.exports = {
  validateName,
  validateCNPJ,
  validatePassword,
  validateAddress,
  validateNumber,
  validateComplement,
  validateDistrict,
  validateCity,
  validateState,
  validateType
};
