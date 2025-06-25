import { type Ingredient } from "@components/Global";

export interface State {
  ingredients: Ingredient[];
  files: File[];
}

export type Action =
  | { type: "add-ingredient"; ingredient: Ingredient }
  | {
      type: "add-ingredients";
      ingredients: string;
    }
  | { type: "remove-ingredient"; name: string }
  | { type: "edit-ingredient"; newIngredient: Ingredient }
  | { type: "add-files"; files: File[] }
  | { type: "remove-file"; index: number };

export type InputDispatch = React.Dispatch<Action>;

function reducer(draft: State, action: Action) {
  switch (action.type) {
    case "add-ingredient": {
      draft.ingredients.push(action.ingredient);
      break;
    }
    case "add-ingredients": {
      const newIngredients = JSON.parse(action.ingredients);
      draft.ingredients.push(...newIngredients);
      break;
    }
    case "remove-ingredient": {
      const nextIngredients = draft.ingredients.filter(
        (ingredient) => ingredient.name !== action.name
      );
      draft.ingredients = nextIngredients;
      break;
    }
    case "edit-ingredient": {
      console.log("this isn't complete yet!");
      break;
    }
    case "add-files": {
      draft.files.push(...action.files);
      break;
    }
    case "remove-file": {
      draft.files.splice(action.index, 1);
      break;
    }
  }
}

export default reducer;
