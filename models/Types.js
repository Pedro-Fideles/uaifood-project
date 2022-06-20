const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findType = async (name) => await findByName('types', name)[0];

const createType = async (typeName) => {
  const query = 'INSERT INTO (name) VALUES (?)';
  const params = [typeName];

  await connection.execute(query, params)

  return await findType(typeName);
};

module.exports = {
  findType,
  createType,
};
