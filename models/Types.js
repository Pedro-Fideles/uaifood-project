const findByName = require('./helpers/findByName');

const findType = async (name) => await findByName('types', name);

module.exports = {
  findType,
};
