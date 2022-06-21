const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findCity = async (name) => await findByName('cities', name);

const checkCity = async (cityName, stateName) => {
  const query = `
    SELECT
      c.id AS cityId,
      c.name AS cityName,
      s.id AS stateId,
      s.name AS stateName
    FROM uaifood.cities c
    INNER JOIN uaifood.states s
    ON c.state_id = s.id
    WHERE c.name = ? AND s.name = ?;
  `;
  const params = [cityName, stateName];

  const [data] = await connection.execute(query, params);

  if (data.length === 0) return null;

  return data[0];
};

const createCity = async (cityName, stateId) => {
  const query = 'INSERT INTO uaifood.cities (name, state_id) VALUES (?, ?)';
  const params = [cityName, stateId];

  await connection.execute(query, params);

  const createdCity = await findCity(cityName);

  return createdCity;
};

module.exports = {
  findCity,
  checkCity,
  createCity,
};
