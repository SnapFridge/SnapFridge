"use client";

import { type SpoonacularRecipe } from "@components/recipe/RecipeInfo";
import { useUnit } from "@components/UnitProvider";
import { styled } from "@pigment-css/react";
import { roundNumber } from "@utils";

function RecipeInfoList({
  ingredients,
}: {
  ingredients: SpoonacularRecipe["extendedIngredients"];
}) {
  const [unit] = useUnit();

  return (
    <Container>
      <Title>Ingredients</Title>
      <List>
        {ingredients.map(({ name, measures: { metric, us } }) => {
          const { amount, unitShort } = unit === "metric" ? metric : us;
          return (
            <ListItem key={name}>
              {roundNumber(amount)} {unitShort} {name}
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
  height: "55vh",
  display: "flex",
  flexDirection: "column",
  borderRadius: "0 8px 8px 0",
  background: "color-mix(in srgb, var(--accent-500) 30%, transparent)",

  "@media (width < 650px)": {
    width: "100%",
  },
});

export const Title = styled("h1")({
  fontSize: `${24 / 16}rem`,
  position: "sticky",
});

export const List = styled("ul")({
  marginLeft: "12px",
  overflow: "auto",
  scrollbarWidth: "none",
});

const ListItem = styled("li")({
  fontSize: `${16 / 16}rem`,
});

export default RecipeInfoList;
