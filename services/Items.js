const Items = require('../models/Items');
const Restaurants = require('../models/Restaurants');
const Ingredients = require('../models/Ingredients');

const createItem = async (newItem) => {
  const { name, price, ingredients, token } = newItem;

  const restaurant = await Restaurants.findIdByToken(token);
  if (!restaurant) return { code: 422, message: 'Token inválido' };

  const item = await Items.createNewItem({ name, price, restaurant });

  await Ingredients.createIngredients({ ingredients, item });
};

const updateItem = async (item) => {
  const { id, token } = item;

  const restaurant = await Restaurants.findIdByToken(token);
  if (!restaurant) return { code: 422, message: 'Token inválido' };

  const existingItem = await Items.findItemById(id);
  if (!existingItem) return { code: 404, message: 'item não encontrado' };

  await Items.updateItem(item);
}

module.exports = { createItem, updateItem };