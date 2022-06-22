const Items = require('../services/Items');

const createItem = async (req, res, next) => {
  const { name, price, token, ingredients } = req.body;
  const validation = await Items.createItem({ name, price, token, ingredients });

  if (validation) next(validation);

  res.status(200).json({ message: 'Item criado.' });
};

const updateItem = async (req, res, next) => {
  const { id, name, price } = req.body;
  const validation = await Items.updateItem({ id, name, price });

  if (validation) next(validation);

  res.status(200).json({ message: 'item atualizado.' });
}

module.exports = { createItem, updateItem };