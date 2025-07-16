import { NextResponse } from "next/server";

type paramProps = {
  params: {
    recipeID: string;
  };
};

export async function GET(req: Request, params: paramProps) {
  const { recipeID } = await params.params;

  const recipeInfoRes = await fetch(
    `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=true`,
    {
      headers: {
        "x-api-key": process.env["SPOONACULAR_KEY"]!,
      },
    }
  );
  const recipeInfo = await recipeInfoRes.json();

  const analyzedInstructionsRes = await fetch(
    `https://api.spoonacular.com/recipes/${recipeID}/analyzedInstructions`,
    {
      headers: {
        "x-api-key": process.env["SPOONACULAR_KEY"]!,
      },
    }
  );
  const analyzedInstructions = await analyzedInstructionsRes.json();

  console.log(recipeInfo);
  console.log(analyzedInstructions);

  return NextResponse.json({
    recipeInfo: recipeInfo,
    analyzedInstructions: analyzedInstructions,
  });
}
