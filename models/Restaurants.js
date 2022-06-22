const connection = require('./connection');
const crypto = require('crypto');
const { queryToListDishs, queryHeader, queryInnerJoins, whereToCity } = require('./helpers/filterQueryParts');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const createNewRestaurant = async (newRestaurant) => {
  const { name, cnpj, password, address, number, complement, district, type } = newRestaurant;

  const token = generateToken()

  const query = `
    INSERT INTO 
      uaifood.restaurants (name, cnpj, password, token, address, number, complement, district_id, type_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const params = [name, cnpj, password, token, address, number, complement, district, type];

  await connection.execute(query, params);

  return token;
};

const findIdByToken = async (token) => {
  const query = 'SELECT id FROM uaifood.restaurants WHERE token = ?;';
  const params = [token];

  const [restaurant] = await connection.execute(query, params);

  if (restaurant.length === 0) return null;

  return restaurant[0].id;
};

const createWheres = (query, city, state, type, dish) => {
  let newQuery = query;
  const params = [];
  if (city) {
    query += `\n${whereTo('cit')}`;
    params.push(city);
  }
  if (state) {
    query += `\n${whereTo('sta')}`;
    params.push(state);
  }
  if (type) {
    query += `\n${whereTo('typ')}`;
    params.push(type);
  }
  if(dish) {
    query += `\n${whereTo('ite')}`;
    params.push(dish);
  }

  return { query: newQuery, params };
}

const listWithFilters = async (filters) => {
  const { city, state, type, dish } = filters;

  let query = queryHeader();

  if (dish) query += `, ${queryToListDishs(1)}`;

  query += `\n${queryInnerJoins()}`;

  if (dish) query += `\n${queryToListDishs(2)}`;

  const newQuery = createWheres(query, city, state, type, dish);

  console.log(newQuery);
}

module.exports = {
  createNewRestaurant,
  findIdByToken,
  listWithFilters,
};
