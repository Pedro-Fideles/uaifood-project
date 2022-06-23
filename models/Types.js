const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findType = async (name) => await findByName('types', name);

const createType = async (typeName) => {
  const query = 'INSERT INTO uaifood.types (name) VALUES (?)';
  const params = [typeName];

  await connection.execute(query, params);

  const createdType = await findType(typeName);

  return createdType;
};

module.exports = {
  findType,
  createType,
};
