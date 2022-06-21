const Restaurants = require('../services/Restaurants');

const createRestaurant = async (req, res) => {
  const { code, message } = await Restaurants.createRestaurant(req.body);

  res.status(code).json({ message });
};

module.exports = { createRestaurant }; 