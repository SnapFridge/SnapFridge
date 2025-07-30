"use server";

import { createClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";

export async function updateSavedRecipes(recipeId: unknown, recipeName: string) {
  // Are the typechecks necessary? Maybe not, but I'm too used to the saying to never trust the client!
  if (typeof recipeId !== "number") return;
  if (typeof recipeName !== "string") return;
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return redirect("/login");

  // Why don't we use an eq? Because our database will only show us the right one!
  const { data, error } = await supabase.from("saved_recipes").select();
  if (error) throw new Error(`Supabase select error! ${error.code}: ${error.message}`);
  const saved_recipes: { id: number; name: string }[] = data[0]?.recipes ?? [];

  const recipeIndex = saved_recipes.findIndex((value) => value.id === recipeId);

  const nextRecipes =
    recipeIndex > -1
      ? saved_recipes.filter((value) => value.id !== recipeId)
      : [
          ...saved_recipes,
          {
            name: recipeName,
            id: recipeId,
          },
        ];
  const { data: updateData, error: updateError } = await supabase
    .from("saved_recipes")
    .update({ recipes: nextRecipes })
    .eq("user_id", user.id);
  if (updateError)
    throw new Error(`Supabase update error! ${updateError.code}: ${updateError.message}`);
  return nextRecipes;
}
