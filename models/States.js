const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findState = async (name) => await findByName('states', name);

module.exports = {
  findState,
};
