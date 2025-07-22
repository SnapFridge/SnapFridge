"use client";

import { styled } from "@pigment-css/react";
import { type SpoonacularRecipe } from "@components/RecipeInfo/RecipeInfo";
import { ON_MOBILE } from "@components/Global";
import { useUnit } from "@components/UnitProvider";

function roundNumber(num: number) {
  // rounding function to handle stuff like 0.25 cups and weird measurements
  // like 178.958 ml

  if (num < 1) {
    return parseFloat(num.toFixed(2));
  }

  return Math.round(num);
}

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
              {roundNumber(amount)} {displayedUnit} {ingredient.name}
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

// Todo: figure out width
const Container = styled("div")({
  borderLeft: "2px solid var(--accent-500)",
  padding: "12px",
  position: "relative",
  width: "100%",
  maxWidth: "400px",
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

const Title = styled("h1")({
  fontSize: `${24 / 16}rem`,
});

const List = styled("ul")({
  marginLeft: "12px",
  overflow: "auto",
});

const ListItem = styled("li")({
  fontSize: `${16 / 16}rem`,
});
