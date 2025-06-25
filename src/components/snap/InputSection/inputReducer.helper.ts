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
      return;
    }
    case "add-ingredients": {
      const newIngredients = JSON.parse(action.ingredients);
      draft.ingredients.push(...newIngredients);
      return;
    }
    case "remove-ingredient": {
      const nextIngredients = draft.ingredients.filter(
        (ingredient) => ingredient.name !== action.name
      );
      draft.ingredients = nextIngredients;
      return;
    }
    case "edit-ingredient": {
      console.log("this isn't complete yet!");
      return;
    }
    case "add-files": {
      draft.files.push(...action.files);
      return;
    }
    case "remove-file": {
      draft.files.splice(action.index, 1);
      return;
    }
  }
}

export default reducer;
