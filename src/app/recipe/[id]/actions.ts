"use server";

import { createClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";

export async function updateSavedRecipes(
  recipeId: unknown,
  recipeName: string,
  imageType: string
) {
  // Are the typechecks necessary? Maybe not, but I'm too used to the saying to never trust the client!
  if (typeof recipeId !== "number") return;
  if (typeof recipeName !== "string") return;
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (!user || userError) {
    redirect("/login");
  }

  console.log("actions.ts");
  console.log(user);
  console.log(userError);

  // Why don't we use an eq? Because our database will only show us the right one!
  const { data, error } = await supabase.from("saved_recipes").select();
  if (error) throw new Error(`Supabase select error! ${error.code}: ${error.message}`);
  const saved_recipes: { id: number; name: string; imageType: string }[] = (data[0]
    ?.recipes ?? []) as {
    id: number;
    name: string;
    imageType: string;
  }[];

  const recipeIndex = saved_recipes.findIndex((value) => value.id === recipeId);

  const nextRecipes =
    recipeIndex > -1
      ? saved_recipes.filter((value) => value.id !== recipeId)
      : [
          ...saved_recipes,
          {
            name: recipeName,
            id: recipeId,
            imageType: imageType,
          },
        ];
  const { error: updateError } = await supabase
    .from("saved_recipes")
    .update({ recipes: nextRecipes })
    .eq("user_id", user.id);
  if (updateError)
    throw new Error(`Supabase update error! ${updateError.code}: ${updateError.message}`);
  return nextRecipes;
}
