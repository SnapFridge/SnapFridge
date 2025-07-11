"use client";
import RecipeCard from "./RecipeCard";
import { styled } from "@pigment-css/react";
import { scaleClamped, type Recipe } from "@components/Global";
import Icon from "@components/Icon";
import Pagination from "react-paginate";
import VisuallyHidden from "@components/VisuallyHidden";

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

interface Props {
  headerTxt?: string;

  // Undefined is pending
  recipes?: undefined | Recipe[];
  countPerPage?: number;
}

function RecipeSection({
  headerTxt = "Recipes Found",
  recipes = recipesExample,
  countPerPage = 3,
}: Props) {
  return (
    <>
      <Header>
        <HeaderTxt>{headerTxt}</HeaderTxt>
        <Icon aria-hidden icon="Sparkles" size={50}></Icon>
      </Header>
      {recipes === undefined ? (
        <RecipeList>
          {Array(countPerPage).fill(<RecipeCard recipe={undefined} />)}
        </RecipeList>
      ) : recipes.length < 0 ? (
        <EmptySectionContainer>
          <EmptySectionContent>
            <Icon icon="ChefHat" size={50} color="var(--gray-400)" />
            <p>
              Looks like your recipes is empty! Start by adding some ingredients or
              uploading an image!
            </p>
          </EmptySectionContent>
        </EmptySectionContainer>
      ) : (
        <>
          <RecipeList>
            {recipes.map((recipe: Recipe) => (
              <RecipeCard recipe={recipe} key={recipe.title} />
            ))}
          </RecipeList>
          <Pagination
            pageCount={Math.ceil(recipes.length / countPerPage)}
            breakLabel="..."
            nextLabel={
              <>
                <VisuallyHidden>Next</VisuallyHidden>
                {">"}
              </>
            }
            previousLabel={
              <>
                {"<"}
                <VisuallyHidden>Previous</VisuallyHidden>
              </>
            }
          />
        </>
      )}
    </>
  );
}

const RecipeList = styled("ul")({
  "& > li": {
    margin: "0 0 28px 0",
  },
});

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  margin: "0 0 12px",
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
  margin: "0 0 36px",
});

export default RecipeSection;
