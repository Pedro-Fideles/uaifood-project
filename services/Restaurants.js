const Types = require('../models/Types');
const Districts = require('../models/Districts');

/*
{
  name: string,
  cnpj: string,
  password: string,
  address: string,
  number: string,
  complement: string or null,
  district: string,
  city: string,
  state: string
  type: string
}
*/

const handleWithType = async (type) => {
  const existingType = await Types.findType(type);

  if (existingType) return await Types.createType(type).id;
  
  return existingType.id;
};

const createRestaurant = (newRestaurant) => {
  const { type, district, city, state } = newRestaurant;

  const restaurantToCreate = { ...newRestaurant };
  restaurantToCreate.type = handleWithType(type);
};
