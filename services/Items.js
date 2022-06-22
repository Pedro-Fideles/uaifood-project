const Items = require('../models/Items');
const Restaurants = require('../models/Restaurants');
const Ingredients = require('../models/Ingredients');

const createItem = async (newItem) => {
  const { name, price, ingredients, token } = newItem;

  const restaurant = await Restaurants.findIdByToken(token);

  const item = await Items.createNewItem({ name, price, restaurant });

  await Ingredients.createIngredients({ ingredients, item });
};

module.exports = { createItem };