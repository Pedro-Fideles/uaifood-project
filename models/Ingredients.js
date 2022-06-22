const connection = require('./connection');

const createIngredient = async (name, item) => {
  const queryIngredient = 'INSERT INTO uaifood.ingredients (name) VALUES (?);';
  const paramsIngredient = [name];

  const [resultIngredient] = await connection.execute(queryIngredient, paramsIngredient);

  const queryItemHasIngredient = `
    INSERT INTO
      uaifood.items_has_ingredients (item_id, ingredient_id)
    VALUES (?, ?);
  `;
  const paramsItemHasIngredient = [item, resultIngredient.insertId];

  await connection.execute(queryItemHasIngredient, paramsItemHasIngredient);
}

const createIngredients = async (ingredientsInfo) => {
  const { ingredients, item } = ingredientsInfo;

  await Promise.all(ingredients.map((name) => createIngredient(name, item)));
}

module.exports = { createIngredients };