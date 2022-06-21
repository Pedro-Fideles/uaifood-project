const isDefined = (value) => value;
const isString = (value) => typeof value === 'string';
const isNumber = (value) => typeof value === 'number';
const lengthIsSmallerThan = (value, num) => value.length < num;

module.exports = {
  isDefined,
  isString,
  isNumber,
  lengthIsSmallerThan
};