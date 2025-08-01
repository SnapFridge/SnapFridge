"use client";

import { createContext, useMemo, type Dispatch, type SetStateAction } from "react";
import { useSavedRecipes } from "./hooks.helper";

type SavedRecipes = {
  id: number;
  name: string;
}[];

export const RecipeActionsContext = createContext<
  [SavedRecipes, Dispatch<SetStateAction<SavedRecipes>>] | undefined
>(undefined);

function RecipeActionsProvider({ children }: React.PropsWithChildren) {
  const [savedRecipes, setSavedRecipes] = useSavedRecipes();

  const value = useMemo<[SavedRecipes, Dispatch<SetStateAction<SavedRecipes>>]>(() => {
    return [savedRecipes, setSavedRecipes];
  }, [savedRecipes, setSavedRecipes]);

  return <RecipeActionsContext value={value}>{children}</RecipeActionsContext>;
}

export default RecipeActionsProvider;
