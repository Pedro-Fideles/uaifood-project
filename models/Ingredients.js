const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findIngredient = async (name) => await findByName('ingredients', name);

const createIngredient = async (name) => {
  const existingIngredient = await findIngredient(name);

  if(existingIngredient) return existingIngredient.id;

  const query = 'INSERT INTO uaifood.ingredients (name) VALUES (?);';
  const params = [name];

  const [resultIngredient] = await connection.execute(query, params);

  return resultIngredient.insertId;
}

const createIngredientAndRelationship = async (name, item) => {
  const ingredient = await createIngredient(name);

  const query = `
    INSERT INTO
      uaifood.items_has_ingredients (item_id, ingredient_id)
    VALUES (?, ?);
  `;
  const params = [item, ingredient];

  await connection.execute(query, params);
}

const createIngredients = async (ingredientsInfo) => {
  const { ingredients, item } = ingredientsInfo;

  await Promise.all(ingredients.map((name) => createIngredientAndRelationship(name, item)));
}

module.exports = { createIngredients };