const connection = require('./connection');

const createNewItem = async (newItem) => {
  const { name, price, restaurant } = newItem;

  const query = 'INSERT INTO uaifood.items (name, price, restaurant_id) VALUES (?, ?, ?)';
  const params = [name, price, restaurant];

  const [data] = await connection.execute(query, params);

  return data.insertId;
};

module.exports = {
  createNewItem,
};
