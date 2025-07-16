import { styled } from "@pigment-css/react";

type Equipment = {
  id: number;
  image: string;
  name: string;
  temperature: {
    number: number;
    unit: string;
  };
};

type Ingredient = {
  id: number;
  image: string;
  name: string;
};

type Step = {
  equipment: Equipment[];
  ingredients: Ingredient[];
  length?: {
    number: number;
    unit: string;
  };
  number: number;
  step: string;
};

type Recipe = {
  name: string;
  steps: Step[];
};

function RecipeItem({ recipe }: { recipe: Recipe }) {
  console.log(recipe);
  console.log(recipe.name);
  console.log(recipe.steps);

  return (
    <Step>
      <RecipeTitle>{recipe.name}</RecipeTitle>
      <StepsList>
        {recipe.steps.map((step, index: number) => {
          return <Step key={index}>{step.step}</Step>;
        })}
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
        return <RecipeItem recipe={recipe} />;
      })}
    </RecipesList>
  );
}

const RecipesList = styled("ul")({});
