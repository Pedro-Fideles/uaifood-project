const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findDistrict = async (name) => await findByName('districts', name);

const checkDistrict = async (districtName, cityName, stateName) => {
  const query = `
    SELECT
      d.id AS districtId,
      d.name AS districtName,
      c.id AS cityId,
      c.name AS cityName,
      s.id AS stateId,
      s.name AS stateName
    FROM uaifood.districts d
    INNER JOIN uaifood.cities c
    ON d.city_id = c.id
    INNER JOIN uaifood.states s
    ON c.state_id = s.id
    WHERE d.name = ? AND c.name = ? AND s.name = ?;
  `;
  const params = [districtName, cityName, stateName];

  const [data] = await connection.execute(query, params);

  if (data.length === 0) return null;

  return data[0];
};

const createDistrict = async (districtName, cityId) => {
  const query = 'INSERT INTO uaifood.districts (name, city_id) VALUES (?, ?)';
  const params = [districtName, cityId];

  await connection.execute(query, params);

  const createdDistrict = await findDistrict(districtName);

  return createdDistrict;
};

module.exports = {
  findDistrict,
  checkDistrict,
  createDistrict
};
