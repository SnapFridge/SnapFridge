"use client";

import { styled } from "@pigment-css/react";
import { useState } from "react";
import { type SpoonacularRecipe } from "@components/RecipeInfo/RecipeInfo";

export default function RecipeInfoList({
  ingredients,
}: {
  ingredients: SpoonacularRecipe["extendedIngredients"];
}) {
  const [metric, setMetric] = useState(false);

  return (
    <Container>
      <Title>Ingredients</Title>
      <List>
        {ingredients.map((ingredient) => {
          const amount = metric
            ? ingredient.measures.metric.amount
            : ingredient.measures.us.amount;
          const unit = metric
            ? ingredient.measures.metric.unitShort
            : ingredient.measures.us.unitShort;

          return (
            <ListItem key={ingredient.name}>
              {Math.trunc(amount)} {unit} {ingredient.name}
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
  maxWidth: "400px",

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
});

const Title = styled("h1")({
  fontSize: `${24 / 16}rem`,
});

const List = styled("ul")({
  marginLeft: "12px",
});

const ListItem = styled("li")({
  fontSize: `${16 / 16}rem`,
});
