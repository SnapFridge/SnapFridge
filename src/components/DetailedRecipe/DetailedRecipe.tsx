import { styled } from "@pigment-css/react";
import { type Ingredient } from "@components/Global";

export type DetailedRecipe = {
  id: string;
  name: string;
  cooking: number;
  prep: number;
  srcName: string;
  srcURL: string;
  likes: number;
  ingredients: Ingredient[];
  instructions: {
    name: string;
    steps: string[];
  }[];
  nutrients: {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
  }[];
};

function RecipeItem({ recipe }: { recipe: Recipe }) {
  return (
    <Step>
      <RecipeTitle>{recipe.name}</RecipeTitle>
      <StepsList>
        {recipe.instructions.map((instruction) => (
          <>
            <h2>{instruction.name}</h2>
            <ul></ul>
          </>
        ))}
      </StepsList>
    </Step>
  );
}
const RecipeTitle = styled("h1")({});

const StepsList = styled("ol")({});
const Step = styled("li")({});

export default function RecipeSteps({
  analyzedInstructions,
}: {
  analyzedInstructions: Recipe[];
}) {
  return (
    <RecipesList>
      {analyzedInstructions.map((recipe) => {
        return <RecipeItem key={recipe.id} recipe={recipe} />;
      })}
    </RecipesList>
  );
}

const RecipesList = styled("ul")({});
