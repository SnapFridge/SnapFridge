import { type Ingredient } from "@components/Global";
import { createContext, useContext, type Context, type Dispatch } from "react";

export interface State {
  ingredients: Ingredient[];
  files: File[];
}

export type Action =
  | { type: "addIngredient"; ingredient: Ingredient }
  | { type: "addIngredients"; ingredients: string }
  | { type: "removeIngredient"; name: string }
  | { type: "editIngredient"; name: string; newIngredient: Ingredient }
  | { type: "addFiles"; files: File[] }
  | { type: "removeFile"; index: number };

function reducer(draft: State, action: Action) {
  switch (action.type) {
    case "addIngredient": {
      draft.ingredients.push(action.ingredient);
      break;
    }
    case "addIngredients": {
      const newIngredients = JSON.parse(action.ingredients);
      draft.ingredients.push(...newIngredients);
      break;
    }
    case "removeIngredient": {
      const nextIngredients = draft.ingredients.filter(
        (ingredient) => ingredient.name !== action.name
      );
      draft.ingredients = nextIngredients;
      break;
    }
    case "editIngredient": {
      console.log("this isn't complete yet!");
      break;
    }
    case "addFiles": {
      draft.files.push(...action.files);
      break;
    }
    case "removeFile": {
      draft.files.splice(action.index, 1);
      break;
    }
  }
}

export default reducer;

// For writing
export const DispatchCtx: Context<Dispatch<Action>> = createContext(
  undefined as unknown as Dispatch<Action>
);

// For reading
export const IngredientsCtx: Context<Ingredient[]> = createContext(
  undefined as unknown as Ingredient[]
);

export function useDispatch() {
  return useContext(DispatchCtx);
}

export function useIngredients() {
  return useContext(IngredientsCtx);
}
