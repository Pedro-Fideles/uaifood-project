const connection = require('./connection');

const findItemById = async (id) => {
  const query = `SELECT * FROM uaifood.items WHERE id = ?`;
  const params = [id];

  const [data] = await connection.execute(query, params);

  if(!data.length === 0) return null;

  return data[0];
}

const createNewItem = async (newItem) => {
  const { name, price, restaurant } = newItem;

  const query = 'INSERT INTO uaifood.items (name, price, restaurant_id) VALUES (?, ?, ?)';
  const params = [name, price, restaurant];

  const [data] = await connection.execute(query, params);

  return data.insertId;
};

const updateItem = async (item) => {
  const { id, name, price } = item;

  const query = 'UPDATE uaifood.items SET name = ?, price = ? WHERE id = ?';
  const params = [name, price, id];

  await connection.execute(query, params);
}

module.exports = {
  findItemById,
  createNewItem,
  updateItem
};
