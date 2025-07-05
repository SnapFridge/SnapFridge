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
import { type Ingredient, type Recipe } from "@components/Global";
import InputSection from "./InputSection";
import RecipeSection from "@components/RecipeSection";
enableMapSet();
export interface State {
  ingredients: Map<string, Ingredient>;
  files: File[];
  recipes: Recipe[];
}

export type Action =
  | { type: "addIngredient"; ingredient: Ingredient }
  | { type: "addIngredientsFromJSON"; json: string }
  | { type: "removeIngredient"; ingredient: Ingredient }
  | { type: "editIngredient"; old: Ingredient; new: Ingredient }
  | { type: "addFiles"; files: File[] }
  | { type: "removeFile"; index: number }
  | { type: "addRecipes"; recipes: Recipe[] };

function reducer(draft: State, action: Action) {
  function addIngredient(ingredient: Ingredient) {
    const key = `${ingredient.name}-${ingredient.unit}`;
    if (draft.ingredients.has(key)) {
      draft.ingredients.get(key)!.amount += ingredient.amount;
    } else {
      draft.ingredients.set(key, ingredient);
    }
  }

  switch (action.type) {
    case "addIngredient": {
      addIngredient(action.ingredient);
      break;
    }
    case "addIngredientsFromJSON": {
      const ingredients: Ingredient[] = JSON.parse(action.json);
      for (const ingredient of ingredients) {
        addIngredient(ingredient);
      }
      break;
    }
    case "removeIngredient": {
      draft.ingredients.delete(`${action.ingredient.name}-${action.ingredient.unit}`);
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
    case "addRecipes": {
      draft.recipes.push(...action.recipes);
      break;
    }
  }
}

export type InputContext = {
  dispatch: Dispatch<Action>;
  state: State;
};

export const InputContext = createContext<InputContext | undefined>(undefined);

function InputProvider({ children }: PropsWithChildren) {
  const [unmemoizedState, dispatch] = useImmerReducer(reducer, {
    ingredients: new Map<string, Ingredient>(),
    files: [],
    recipes: [],
  });

  const state = useMemo(() => {
    return unmemoizedState;
  }, [unmemoizedState]);

  return (
    <InputContext value={{ state, dispatch }}>
      <InputSection />
      <RecipeSection recipes={state.recipes} />
      <RecipeSection headerTxt="Previous Snaps" />
    </InputContext>
  );
}

export function useInputState() {
  return useContext(InputContext)!;
}

export default InputProvider;
