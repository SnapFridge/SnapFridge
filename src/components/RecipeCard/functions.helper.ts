export interface Ingredient {
  aisle: string;
  amount: number;
  id: number;
  image: string;
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
  unitLong: string;
  unitShort: string;
}

export interface Recipe {
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  title: string;
  unusedIngredients: Ingredient[];
  usedIngredientCount: number;
  usedIngredients: Ingredient[];
}

export function ingredients2Str(ingredients: Ingredient[]) {
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
