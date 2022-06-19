const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findDistrict = async (name) => await findByName('districts', name);

module.exports = {
  findDistrict,
};
