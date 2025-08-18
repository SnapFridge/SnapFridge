import { type SpoonacularRecipe } from "@components/recipe/RecipeInfo/RecipeInfo";
import { styled } from "@pigment-css/react";
import { ON_MOBILE } from "@utils";

type RecipeInstruction = {
  name: string;
  steps: {
    number: number;
    step: string;
    ingredients: {
      id: number;
      name: string;
      localizedName: string;
      image: string;
    }[];
    length?: {
      number: number;
      unit: string;
    };
  }[];
};

function RecipeStepList({ recipes }: { recipes: SpoonacularRecipe }) {
  return (
    <ul>
      {recipes.analyzedInstructions.map((recipe: RecipeInstruction, index) => (
        <li key={index}>
          <StepTitle>{recipe.name || recipes.title}</StepTitle>
          <StepList>
            {recipe.steps.map((step) => (
              <Step key={step.number}>{step.step}</Step>
            ))}
          </StepList>
        </li>
      ))}
    </ul>
  );
}

const StepTitle = styled("h1")({
  [ON_MOBILE]: {
    textAlign: "center",
  },
});

const StepList = styled("ol")({
  margin: "10px 0 0 24px",
  listStyle: "decimal inside",
  [ON_MOBILE]: {
    margin: "10px 0 0",
  },
});

const Step = styled("li")({
  "&::marker": {
    fontWeight: 700,
    fontSize: `${18 / 16}rem`,
  },
  "&:not(:first-child)": {
    margin: "12px 0 0",
  },
});

export default RecipeStepList;
