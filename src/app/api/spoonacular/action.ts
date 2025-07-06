"use server";

import { type Recipe } from "@components/Global";

async function fetchRecipes(query: string): Promise<Recipe[]> {
  const res = await fetch(
    "https://api.spoonacular.com/recipes/findByIngredients?" + query,
    {
      headers: {
        "x-api-key": process.env["SPOONACULAR_KEY"]!,
      },
    }
  );
  return (await res.json()) as Recipe[];
}
