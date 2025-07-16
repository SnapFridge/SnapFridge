async function getRecipe(recipeId: string) {
  const recipeInfoRes = await fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true`,
    {
      headers: {
        "x-api-key": process.env["SPOONACULAR_KEY"]!,
      },
    }
  );
  const recipeInfo = await recipeInfoRes.json();

  const analyzedInstructionsRes = await fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,
    {
      headers: {
        "x-api-key": process.env["SPOONACULAR_KEY"]!,
      },
    }
  );
  const analyzedInstructions = await analyzedInstructionsRes.json();

  console.log(recipeInfo);
  console.log(analyzedInstructions);

  return {
    recipeInfo: recipeInfo,
    analyzedInstructions: analyzedInstructions,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getRecipe(id);

  return (
    <div>
      <p>Loaded!</p>
    </div>
  );
}
