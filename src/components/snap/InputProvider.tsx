"use client";

import {
  createContext,
  useContext,
  useMemo,
  type Dispatch,
  type PropsWithChildren,
} from "react";
import { enableMapSet } from "immer";
import { useImmerReducer } from "use-immer";
import { type Recipe } from "@utils";

enableMapSet();

export interface State {
  ingredients: string[];
  files: File[];
  recipes: "pending" | Recipe[];
}

export type Action =
  | { type: "addIngredient"; ingredient: string }
  | { type: "removeIngredient"; ingredient: string }
  | { type: "addFiles"; files: File[] }
  | { type: "removeFile"; index: number }
  | { type: "addRecipes"; recipes: Recipe[] }
  | { type: "setPendingSpoonacular" };

function reducer(draft: State, action: Action) {
  function removeIngredient(ingredient: string) {
    draft.ingredients.splice(draft.ingredients.indexOf(ingredient), 1);
  }

  switch (action.type) {
    case "addIngredient": {
      draft.ingredients.push(action.ingredient);
      break;
    }
    case "removeIngredient": {
      removeIngredient(action.ingredient);
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
      break;
    }
    case "setPendingSpoonacular": {
      draft.recipes = "pending";
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
    files: [],
    recipes: [],
  });

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <InputContext value={value}>{children}</InputContext>;
}

export function useInputState() {
  return useContext(InputContext)!;
}
