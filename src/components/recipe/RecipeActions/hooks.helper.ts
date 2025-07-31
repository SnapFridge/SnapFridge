import useUser from "@components/User";
import { createClient } from "@utils/supabase/client";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function useSavedRecipes(): [
  { id: number; name: string }[],
  Dispatch<SetStateAction<{ id: number; name: string }[]>>,
] {
  const [savedRecipes, setSavedRecipes] = useState<{ id: number; name: string }[]>([]);
  const user = useUser();

  useEffect(() => {
    async function getSavedRecipes() {
      const supabase = createClient();

      // Safe to preform as Supabase will not allow multiple rows with the same key (user_id)
      await supabase.from("saved_recipes").insert({ user_id: user!.id, recipes: [] });

      // Don't need to preform equality checks as supabase should only return the row the user has access to
      const { data } = await supabase.from("saved_recipes").select();

      const recipes = (data?.[0]?.recipes ?? []) as { id: number; name: string }[];

      setSavedRecipes(recipes);
    }

    if (user) void getSavedRecipes();
  }, [user]);

  return [savedRecipes, setSavedRecipes];
}
