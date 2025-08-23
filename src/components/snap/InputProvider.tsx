"use client";

import type { Recipe } from "@utils";
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { useImmerReducer } from "use-immer";

export type State = {
  ingredients: string[];
  files: File[];
  recipes: "pending" | Recipe[];
};

export type Action =
  | { type: "addIngredient"; ingredient: string }
  | { type: "removeIngredient"; ingredient: string }
  | { type: "addFiles"; files: File[] }
  | { type: "removeFile"; index: number }
  | { type: "addRecipes"; recipes: Recipe[] }
  | { type: "setPendingSpoonacular" }
  | { type: "_set"; state?: Omit<State, "files"> };

function reducer(draft: State, action: Action) {
  const store = sessionStorage;
  function storeIngredients() {
    store.setItem("ingredients", JSON.stringify(draft.ingredients));
  }
  function storeRecipes() {
    store.setItem("recipes", JSON.stringify(draft.recipes));
  }
  switch (action.type) {
    case "addIngredient": {
      draft.ingredients.push(action.ingredient);
      storeIngredients();
      break;
    }
    case "removeIngredient": {
      draft.ingredients.splice(draft.ingredients.indexOf(action.ingredient), 1);
      storeIngredients();
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
    case "addRecipes": {
      if (draft.recipes === "pending") {
        draft.recipes = [];
      }
      draft.recipes.push(...action.recipes);
      storeRecipes();
      break;
    }
    case "setPendingSpoonacular": {
      draft.recipes = "pending";
      break;
    }
    case "_set": {
      if (action.state) {
        draft.ingredients = action.state.ingredients;
        draft.recipes = action.state.recipes;
        break;
      }
      draft.ingredients = draft.recipes = [];
      store.removeItem("ingredients");
      store.removeItem("recipes");
      break;
    }
  }
}

type InputContext = {
  dispatch: Dispatch<Action>;
  state: State;
};

const InputContext = createContext<InputContext | undefined>(undefined);

export function InputProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useImmerReducer(reducer, {
    ingredients: [],
    recipes: [],
    files: [],
  });

  useEffect(() => {
    const storedIngredients = sessionStorage.getItem("ingredients");
    const storedRecipes = sessionStorage.getItem("recipes");
    dispatch({
      type: "_set",
      state: {
        ingredients: storedIngredients ? (JSON.parse(storedIngredients) as string[]) : [],
        recipes: storedRecipes ? (JSON.parse(storedRecipes) as Recipe[]) : [],
      },
    });
  }, [dispatch]);

  return <InputContext value={{ state, dispatch }}>{children}</InputContext>;
}

export function useInputState() {
  return useContext(InputContext)!;
}
