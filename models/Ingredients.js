const connection = require('./connection');
const findByName = require('./helpers/findByName');

const findIngredient = async (name) => await findByName('ingredients', name);

const listItemIngredients = async (item) => {
  const query = `
    SELECT
      i.id, i.name
    FROM uaifood.ingredients i
    INNER JOIN uaifood.items_has_ingredients ii
    ON i.id = ii.ingredient_id
    WHERE ii.item_id = ?;
  `;
  const params = [item];

  const [data] = await connection.execute(query, params);

  return data;
}

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

const deleteRelationship = async (itemId, ingredientId) => {
  const query = `
    DELETE FROM
      uaifood.items_has_ingredients
    WHERE item_id = ? AND ingredient_id = ?
  `;
  const params = [itemId, ingredientId];

  await connection.execute(query, params);
}

const updateIngredients = async (ingredientsInfo) => {
  const { ingredients, id: item } = ingredientsInfo;

  const prevIngredients = await listItemIngredients(item);
  
  const ingredientsToExclude = prevIngredients
    .filter(({ name }) => !ingredients.includes(name));
  await Promise.all(ingredientsToExclude
    .map(({ id }) => deleteRelationship(item, id)));

  const ingredientsToAdd = ingredients
    .filter((ingredient) => prevIngredients.every(({ name }) => ingredient !== name));
  await Promise.all(ingredientsToAdd
    .map((name) => createIngredientAndRelationship(name, item)));
};

module.exports = { createIngredients, updateIngredients };