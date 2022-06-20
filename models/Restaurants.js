const connection = require('./connection');

const createNewRestaurant = async (newRestaurant) => {
  const { name, cnpj, password, address, number, complement, district, type } = newRestaurant;

  const query = `
    INSERT INTO 
      uaifood.restaurants (name, cnpj, password, address, number, complement, district_id, type_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const params = [name, cnpj, password, address, number, complement, district, type];

  await connection.execute(query, params);
};

module.exports = {
  createNewRestaurant,
};
