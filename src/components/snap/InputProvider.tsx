import { createContext, useContext, useMemo, type Dispatch } from "react";
import { useImmerReducer } from "use-immer";
import { type Ingredient } from "@components/Global";

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

export type InputContext = {
  dispatch: Dispatch<Action>;
  state: State;
};

export const InputContext = createContext<InputContext | undefined>(undefined);

function InputProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useImmerReducer(reducer, {
    ingredients: [],
    files: []
  });

  const value = useMemo(() => {
    return {
      dispatch,
      state
    };
  }, [state, dispatch]);

  return <InputContext value={value}>{children}</InputContext>;
}

export function useInputState() {
  return useContext(InputContext)!;
}

export default InputProvider;
