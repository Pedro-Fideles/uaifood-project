const isDefined = (value) => value;
const isString = (value) => typeof value === 'string';
const isNumber = (value) => typeof value === 'number';
const lengthIsSmallerThan = (value, num) => value.length < num;
const isEmpty = (value) => value.length === 0;

module.exports = {
  isDefined,
  isString,
  isNumber,
  lengthIsSmallerThan,
  isEmpty
};