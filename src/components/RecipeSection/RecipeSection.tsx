"use client";
import RecipeCard from "@components/RecipeCard";
import { styled } from "@pigment-css/react";
import { ul } from "motion/react-client";
import { scaleClamped, type Recipe } from "@components/Global";
import Icon from "@components/Icon";

const recipesExample: Recipe[] = [
  {
    title: "Simple Whole Wheat Crepes",
    image: "https://img.spoonacular.com/recipes/716407-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 1,
    missedIngredients: [
      {
        amount: 1,
        unit: "Tablespoon",
        name: "maple syrup",
      },
    ],
    usedIngredients: [
      {
        amount: 3,
        unit: "Tablespoons",
        name: "butter",
      },
      {
        amount: 3,
        unit: "",
        name: "eggs",
      },
      {
        amount: 1,
        unit: "cup",
        name: "milk",
      },
    ],
  },
  {
    title: "Dutch Baby",
    image: "https://img.spoonacular.com/recipes/641759-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 1,
    missedIngredients: [
      {
        amount: 2,
        unit: "",
        name: "lemons",
      },
    ],
    usedIngredients: [
      {
        amount: 3,
        unit: "",
        name: "eggs",
      },
      {
        amount: 1,
        unit: "cup",
        name: "milk",
      },
      {
        amount: 2,
        unit: "tablespoons",
        name: "butter",
      },
    ],
  },
];

type Props = {
  headerTxt?: string;
  recipes?: Recipe[];
  pending?: boolean;
};

function RecipeSection({
  headerTxt = "Recipes Found",
  recipes = recipesExample,
  pending = false,
}: Props) {
  if (recipes.length === 0) {
    return (
      <>
        <Header>
          <HeaderTxt>{headerTxt}</HeaderTxt>
          <Icon aria-hidden icon="Sparkles" size={50}></Icon>
        </Header>

        {pending ? (
          <>
            <RecipeCard recipe={undefined} />
            <RecipeCard recipe={undefined} />
            <RecipeCard recipe={undefined} />
          </>
        ) : (
          <>
            <EmptySectionContainer>
              <EmptySectionContent>
                <Icon icon="ChefHat" size={50} color="var(--gray-400)" />
                <p>
                  Looks like your recipes is empty! Start by adding some ingredients or
                  uploading an image, and then you can get your first recipe.
                </p>
              </EmptySectionContent>
            </EmptySectionContainer>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <Header>
        <HeaderTxt>{headerTxt}</HeaderTxt>
        <Icon aria-hidden icon="Sparkles" size={50}></Icon>
      </Header>
      <RecipeList>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.title} />
        ))}
        {pending && (
          <>
            <RecipeCard recipe={undefined} />
            <RecipeCard recipe={undefined} />
            <RecipeCard recipe={undefined} />
          </>
        )}
      </RecipeList>
    </>
  );
}

const RecipeList = styled(ul)({
  listStyleType: "none",
  padding: 0,
  "& > :not(:first-child)": {
    marginTop: "28px",
  },
});

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "12px",
});

const HeaderTxt = styled("h2")({
  fontSize: scaleClamped(24, 36),
});

const EmptySectionContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  maxWidth: "600px",
  color: "var(--gray-400)",
});

const EmptySectionContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginBottom: "36px",
});

export default RecipeSection;
