const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findDistrict = async (name) => await findByName('districts', name);

const checkDistrict = async (nameDistrict, nameCity, nameState) => {
  const query = `
    SELECT
      d.id AS districtId,
      d.name AS districtName,
      c.id AS cityId,
      c.name AS cityName,
      s.id AS stateId,
      s.name AS stateName,
    FROM uaifood.dristricts d
    INNER JOIN uaifood.cities c
    ON d.city_id = c.id
    INNER JOIN uaifood.states s
    ON c.state_id = s.id
    WHERE d.name = ? AND c.name = ? AND d.name = ?;
  `;
  const params = [nameDistrict, nameCity, nameState];

  const [data] = connection.execute(query, params);

  if (data.length === 0) return null;

  return data[0];
};

module.exports = {
  findDistrict,
  checkDistrict,
};
