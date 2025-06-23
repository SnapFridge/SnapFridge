import { type Ingredient } from '@components/Global';

function ingredients2Str(ingredients: Ingredient[]) {
  let ingredientStr = "";
  for (const ingredient of ingredients) {
    let toUpper = true;
    for (const char of ingredient.name) {
      if (toUpper) {
        ingredientStr += char.toUpperCase();
        toUpper = false;
      } else {
        ingredientStr += char;
        if (char === " ") {
          toUpper = true;
        }
      }
    }
    ingredientStr += ", ";
  }
  return ingredientStr.slice(0, -2);
}

export default ingredients2Str;