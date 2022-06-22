const Items = require('../services/Items');

const createItem = async (req, res, next) => {
  const { name, price, token, ingredients } = req.body;
  const validation = await Items.createItem({ name, price, token, ingredients });

  if (validation) next(validation);

  res.status(200).json({ message: 'deu certo' });
};

module.exports = { createItem };