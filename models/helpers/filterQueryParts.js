const queryHeader = () => (`
  SELECT
    res.id AS restaurantId,
    res.name AS restaurant,
    typ.name AS type,
    cit.name AS city,
    sta.name AS state
`);

const queryToListDishs = (part) => {
  if (part === 1) return 'ite.id AS itemId, ite.name AS itemName';
  if (part === 2) return 'INNER JOIN uaifood.items ite ON res.id = ite.restaurant_id';

  return null;
}

const queryInnerJoins = () => (`
  FROM 
    uaifood.restaurants res
  INNER JOIN
    uaifood.districts dis
  ON res.district_id = dis.id
  INNER JOIN
    uaifood.cities cit
  ON dis.city_id = cit.id
  INNER JOIN
    uaifood.states sta
  ON cit.state_id = sta.id
  INNER JOIN
    uaifood.types typ
  ON res.type_id = typ.id
`);

const whereTo = (as) => `WHERE ${as}.name LIKE CONCAT ( '%', ?, '%' )`;

module.exports = {
  queryHeader,
  queryToListDishs,
  queryInnerJoins,
  whereTo
};
