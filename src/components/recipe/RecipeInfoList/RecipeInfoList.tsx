"use client";

import { styled } from "@pigment-css/react";
import { type SpoonacularRecipe } from "@components/recipe/RecipeInfo/RecipeInfo";
import { ON_MOBILE } from "@utils";
import { useUnit } from "@components/UnitProvider";
import { round } from "@utils";

export default function RecipeInfoList({
  ingredients,
}: {
  ingredients: SpoonacularRecipe["extendedIngredients"];
}) {
  const [unit] = useUnit();

  return (
    <Container>
      <Title>Ingredients</Title>
      <List>
        {ingredients.map((ingredient) => {
          const amount =
            unit === "metric"
              ? ingredient.measures.metric.amount
              : ingredient.measures.us.amount;
          const displayedUnit =
            unit === "metric"
              ? ingredient.measures.metric.unitShort
              : ingredient.measures.us.unitShort;

          return (
            <ListItem key={ingredient.name}>
              {round(amount, 2)} {displayedUnit} {ingredient.name}
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export const Container = styled("div")({
  borderLeft: "2px solid var(--accent-500)",
  padding: "12px",
  position: "relative",
  width: "min(100%, 400px)",
  height: "350px",
  display: "flex",
  flexDirection: "column",

  "&::before": {
    content: "''",
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
    backgroundColor: "var(--accent-500)",
    opacity: "30%",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },

  [ON_MOBILE]: {
    height: "fit-content",
    maxHeight: "350px",
  },
});

export const Title = styled("h1")({
  fontSize: `${24 / 16}rem`,
  position: "sticky",
});

export const List = styled("ul")({
  marginLeft: "12px",
  overflow: "auto",
});

const ListItem = styled("li")({
  fontSize: `${16 / 16}rem`,
});
