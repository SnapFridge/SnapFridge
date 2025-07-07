"use server";
async function getRecipesJSON(query: string): Promise<string> {
  const res = await fetch(
    "https://api.spoonacular.com/recipes/findByIngredients?" + query,
    {
      headers: {
        "x-api-key": process.env["SPOONACULAR_KEY"]!,
      },
    }
  );
  return res.text();
}
export default getRecipesJSON;
