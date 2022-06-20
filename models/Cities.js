const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findCity = async (name) => await findByName('cities', name);

const checkCity = async (nameCity, nameState) => {
  const query = `
  SELECT
    c.id AS cityId,
    c.name AS cityName,
    s.id AS stateId,
    s.name AS stateName,
  FROM uaifood.cities c
  INNER JOIN uaifood.states s
  ON c.state_id = s.id
  c.name = ? AND d.name = ?;
  `;
  const params = [nameCity, nameState];

  const [data] = connection.execute(query, params);

  if (data.length === 0) return null;

  return data[0];
};

module.exports = {
  findCity,
  checkCity,
};
