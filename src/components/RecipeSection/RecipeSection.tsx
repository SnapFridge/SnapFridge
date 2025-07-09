"use client";
import RecipeCard from "@components/RecipeCard";
import { styled } from "@pigment-css/react";
import { ul } from "motion/react-client";
import { scaleClamped, type Recipe } from "@components/Global";
import Icon from "@components/Icon";

type Props = {
  headerTxt?: string;
  recipes?: Recipe[];
  pending?: boolean;
};
const recipesExample: Recipe[] = [
  {
    image: "https://img.spoonacular.com/recipes/73420-312x231.jpg",
    imageType: "jpg",
    missedIngredientCount: 3,
    missedIngredients: [
      {
        amount: 1.0,
        name: "baking powder",
        unit: "tsp",
      },
      {
        amount: 1.0,
        name: "cinnamon",
        unit: "tsp",
      },
      {
        amount: 1.0,
        name: "egg",
        unit: "",
      },
    ],
    title: "Apple Or Peach Strudel",
    usedIngredientCount: 1,
    usedIngredients: [
      {
        amount: 6.0,
        name: "apples",
        unit: "large",
      },
    ],
  },
  {
    image: "https://img.spoonacular.com/recipes/632660-312x231.jpg",
    imageType: "jpg",
    missedIngredientCount: 4,
    missedIngredients: [
      {
        amount: 1.5,
        name: "butter",
        unit: "sticks",
      },
      {
        amount: 4.0,
        name: "red apples",
        unit: "large",
      },
      {
        amount: 2.0,
        name: "cinnamon",
        unit: "teaspoons",
      },
      {
        amount: 2.0,
        name: "apricot preserves",
        unit: "tablespoons",
      },
    ],
    title: "Apricot Glazed Apple Tart",
    usedIngredientCount: 0,
    usedIngredients: [],
  },
];
function RecipeSection({
  headerTxt = "Recipes Found",
  recipes = recipesExample,
  pending = false,
}: Props) {
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
export default RecipeSection;
