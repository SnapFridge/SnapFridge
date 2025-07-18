import DetailedRecipe from "@components/DetailedRecipe";
import AppTooltip from "@components/Tooltip";
import RecipeInfo from "@components/RecipeInfo";
import { type SpoonacularRecipe } from "@components/RecipeInfo/RecipeInfo";

async function getRecipe(id: string) {
  const recipeInfoRes = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true`,
    {
      headers: {
        "x-api-key": process.env["SPOONACULAR_KEY"]!,
      },
    }
  );
  const recipeInfo = (await recipeInfoRes.json()) as SpoonacularRecipe;

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
      <RecipeInfo recipeInfo={data.recipeInfo} />
      <div>
        <p>testing: </p>
        <AppTooltip type="vegan"></AppTooltip>
        <AppTooltip type="vegetarian"></AppTooltip>
        <AppTooltip type="sustainable"></AppTooltip>
        <AppTooltip type="healthy"></AppTooltip>
        <AppTooltip type="popular"></AppTooltip>
      </div>
    </div>
  );
}
