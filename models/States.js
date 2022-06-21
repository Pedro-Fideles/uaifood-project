const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findState = async (name) => await findByName('states', name);

const createState = async (stateName) => {
  const query = 'INSERT INTO uaifood.states (name) VALUES (?)';
  const params = [stateName];

  await connection.execute(query, params);

  const createdState = await findState(stateName);

  return createdState;
};

module.exports = {
  findState,
  createState,
};
