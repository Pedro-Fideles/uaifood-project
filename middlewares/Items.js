const {
  isDefined,
  isString,
  lengthIsSmallerThan,
  fieldErrors,
  isNumber,
  arrayOf,
  isArray
} = require("./validations/validations");

const validateName = (req, _res, next) => {
  const { name } = req.body;

  switch (true) {
    case !isDefined(name): return next(fieldErrors.undefinedField('name'));
    case !isString(name): return next(fieldErrors.notString('name'));
    case lengthIsSmallerThan(name, 3): return next(fieldErrors.minLength('name', 3));
    default: return next();
  }
};

const validatePrice = (req, _res, next) => {
  const { price } = req.body;

  switch (true) {
    case !isDefined(price): return next(fieldErrors.undefinedField('price'));
    case !isNumber(price): return next(fieldErrors.notNumber('price'));
    default: return next();
  }
};

const validateToken = (req, _res, next) => {
  const { token } = req.body;
  switch (true) {
    case !isDefined(token): return next(fieldErrors.undefinedField('token'));
    case !isString(token): return next(fieldErrors.notString('token'));
    default: return next();
  }
};

const validateIngredients = (req, _res, next) => {
  const { ingredients } = req.body;

  switch (true) {
    case !isDefined(ingredients): return next(fieldErrors.undefinedField('ingredients'));
    case !isArray(ingredients): return next(fieldErrors.notArray('ingredients'));
    case !arrayOf(ingredients, 'string'): return next(fieldErrors.notArrayOf('ingredients', 'string'));
    default: return next();
  }
};

const validateId = (req, _res, next) => {
  if (req.method === 'PUT') {
    const { id } = req.body;

    switch (true) {
      case !isDefined(id): return next(fieldErrors.undefinedField('id'));
      case !isNumber(id): return next(fieldErrors.notNumber('id'));
      default: return next();
    }
  }
  next();
}

module.exports = {
  validateName,
  validatePrice,
  validateToken,
  validateIngredients,
  validateId
};
