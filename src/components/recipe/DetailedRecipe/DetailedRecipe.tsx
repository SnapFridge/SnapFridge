import { styled } from "@pigment-css/react";
import { type SpoonacularRecipe } from "@components/recipe/RecipeInfo/RecipeInfo";
import { ON_MOBILE } from "@components/Global";

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

export default function RecipeStepsList({ recipes }: { recipes: SpoonacularRecipe }) {
  return (
    <RecipeList>
      {recipes.analyzedInstructions.map((recipe: RecipeInstruction) => {
        return (
          <RecipeItem
            recipe={recipe}
            recipeTitle={recipes.title}
            key={recipe.name || recipes.title}
          />
        );
      })}
    </RecipeList>
  );
}
const RecipeList = styled("ul")({});

function RecipeItem({
  recipe,
  recipeTitle,
}: {
  recipe: RecipeInstruction;
  recipeTitle: SpoonacularRecipe["title"];
}) {
  return (
    <StepContainer>
      <StepTitle>{recipe.name || recipeTitle}</StepTitle>
      <StepsList>
        {recipe.steps.map((step) => {
          return <Step key={step.number}>{step.step}</Step>;
        })}
      </StepsList>
    </StepContainer>
  );
}
const StepContainer = styled("li")({});

const StepTitle = styled("h1")({
  [ON_MOBILE]: {
    textAlign: "center",
  },
});

const StepsList = styled("ol")({
  marginLeft: "24px",

  [ON_MOBILE]: {
    marginTop: "12px",
  },
});

const Step = styled("li")({});
