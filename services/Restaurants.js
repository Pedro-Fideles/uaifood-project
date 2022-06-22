const Types = require('../models/Types');
const States = require('../models/States');
const Cities = require('../models/Cities');
const Districts = require('../models/Districts');
const Restaurants = require('../models/Restaurants');

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
  const existingType = (await Types.findType(type));

  if (!existingType) return await Types.createType(type);

  return existingType;
};

const handleWithState = async (stateName) => {
  const existingState = await States.findState(stateName);

  if (!existingState) return (await States.createState(stateName)).id;

  return existingState.id;
}

const handleWithCity = async (cityName, stateName) => {
  const existingCity = await Cities.checkCity(cityName, stateName);
  
  if (!existingCity) {
    const stateId = await handleWithState(stateName);
    return (await Cities.createCity(cityName, stateId)).id;
  }

  return existingCity.cityId;
}

const handleWithLocalization = async (districtName, cityName, stateName) => {
  const existingDistrict = await Districts.checkDistrict(districtName, cityName, stateName);

  if (!existingDistrict) {
    const cityId = await handleWithCity(cityName, stateName);
    return (await Districts.createDistrict(districtName, cityId)).id;
  }

  return existingDistrict.districtId;
};

const createRestaurant = async (newRestaurant) => {
  const { type, district, city, state } = newRestaurant;

  const restaurantToCreate = { ...newRestaurant };
  restaurantToCreate.type = (await handleWithType(type)).id;
  restaurantToCreate.district = await handleWithLocalization(district, city, state);

  const token = await Restaurants.createNewRestaurant(restaurantToCreate);

  return { code: 200, message: 'Restaurante criado com sucesso!', token };
};

module.exports = { createRestaurant };
