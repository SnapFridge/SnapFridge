import { useUser } from "@components/UserProvider";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export type SavedRecipe = {
  id: number;
  name: string;
  imageType: string;
};

export function useSavedRecipes(
  supabase: SupabaseClient
): [SavedRecipe[], Dispatch<SetStateAction<SavedRecipe[]>>] {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const user = useUser();

  useEffect(() => {
    async function getSavedRecipes() {
      if (!user) return;
      // Safe to preform as Supabase will not allow multiple rows with the same key (user_id)
      await supabase.from("saved_recipes").insert({ user_id: user.id, recipes: [] });

      // Don't need to preform equality checks as supabase should only return the row the user has access to
      const { data } = await supabase.from("saved_recipes").select();

      const recipes = (data?.[0]?.recipes ?? []) as SavedRecipe[];

      setSavedRecipes(recipes);
    }
    void getSavedRecipes();
  }, [user, supabase]);

  return [savedRecipes, setSavedRecipes];
}
