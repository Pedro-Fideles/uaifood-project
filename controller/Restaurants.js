const Restaurants = require('../services/Restaurants');

const createRestaurant = async (req, res) => {
  const { code, message, token } = await Restaurants.createRestaurant(req.body);

  res.status(code).json({ message, token });
};

const listWithFilters = async (req, res, next) => {
  const { city, state, type, dish } = req.query;
  const data = await Restaurants.listWithFilters({ city, state, type, dish });

  if (!data) return next({ code: 404, message: 'nenhum restaurante encontrado.' });

  res.status(200).json(data);
}

module.exports = { createRestaurant, listWithFilters };
