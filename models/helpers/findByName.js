const connection = require('../connection');

const findByName = async (table, name) => {
  const query = `SELECT * FROM uaifood.${table} WHERE name = ?`;
  const params = [name];

  const [data] = await connection.execute(query, params);

  if(!data.length === 0) return null;

  return data;
};

module.exports = findByName;
