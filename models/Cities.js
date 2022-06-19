const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findCity = async (name) => await findByName('cities', name);

module.exports = {
  findCity,
};
