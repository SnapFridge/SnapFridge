import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "@utils/supabase/database";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export type SavedRecipe = {
  id: number;
  name: string;
  imageType: string;
};

function useSavedRecipes(
  supabase: SupabaseClient<Database>,
  user: User | undefined
): [SavedRecipe[], Dispatch<SetStateAction<SavedRecipe[]>>] {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    async function getSavedRecipes() {
      // Safe to preform as Supabase will not allow multiple rows with the same key (user_id)
      await supabase.from("saved_recipes").insert({ user_id: user!.id, recipes: [] });

      // Don't need to preform equality checks as supabase sho!uld only return the row the user has access to
      const { data } = await supabase.from("saved_recipes").select();

      const recipes = (data?.[0]?.recipes ?? []) as SavedRecipe[];

      setSavedRecipes(recipes);
    }
    void getSavedRecipes();
  }, [user, supabase]);

  return [savedRecipes, setSavedRecipes];
}

export default useSavedRecipes;
