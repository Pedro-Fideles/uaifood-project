const connection = require('./connection');
const crypto = require('crypto');

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

module.exports = {
  createNewRestaurant,
  findIdByToken,
};
