import type { SpoonacularRecipe } from "@components/recipe/RecipeInfo/RecipeInfo";
import { styled } from "@pigment-css/react";
import { ON_MOBILE } from "@utils";

function RecipeStepList({ recipe }: { recipe: SpoonacularRecipe }) {
  return (
    <ul>
      {recipe.analyzedInstructions.map(({ name, steps }) => (
        <li key={name || recipe.title}>
          <StepTitle>{name || recipe.title}</StepTitle>
          <StepList>
            {steps.map(({ number, step }) => (
              <Step key={number}>{step}</Step>
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
