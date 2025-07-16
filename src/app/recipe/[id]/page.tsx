import DetailedRecipe from "@components/DetailedRecipe";

async function getRecipe(id: string) {
  const recipeInfoRes = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true`,
    {
      headers: {
        "x-api-key": process.env["SPOONACULAR_KEY"]!,
      },
    }
  );
  const recipeInfo = (await recipeInfoRes.json()) as Recipe;

  const analyzedInstructionsRes = await fetch(
    `https://api.spoonacular.com/recipes/${id}/analyzedInstructions`,
    {
      headers: {
        "x-api-key": process.env["SPOONACULAR_KEY"]!,
      },
    }
  );
  const analyzedInstructions = await analyzedInstructionsRes.json();

  return {
    recipeInfo,
    analyzedInstructions,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getRecipe(id);

  return (
    <div>
      <DetailedRecipe></DetailedRecipe>
    </div>
  );
}
