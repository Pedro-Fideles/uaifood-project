const Restaurants = require('../services/Restaurants');

const createRestaurant = async (req, res) => {
  const { code, message, token } = await Restaurants.createRestaurant(req.body);

  res.status(code).json({ message, token });
};

module.exports = { createRestaurant }; 