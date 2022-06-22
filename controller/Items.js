const Items = require('../services/Items');

const createItem = async (req, res) => {
  const { name, price, token, ingredients } = req.body;
  const itemCreated = await Items.createItem({ name, price, token, ingredients });

  res.status(200).json({ message: 'deu certo' });
};

module.exports = { createItem };