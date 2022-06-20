const Restaurants = require('../services/Restaurants');

const createRestaurant = async (req, res) => {
  await Restaurants.createRestaurant(req.body);

  res.status(201).json({ message: 'Restaurante criado com sucesso! '});
};

module.exports = { createRestaurant }; 