"use client";

import { type SpoonacularRecipe } from "@components/recipe/RecipeInfo";
import { useUnit } from "@components/UnitProvider";
import { styled } from "@pigment-css/react";
import { ON_MOBILE, roundNumber } from "@utils";

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
  scrollbarWidth: "none",
});

const ListItem = styled("li")({
  fontSize: `${16 / 16}rem`,
});

export default RecipeInfoList;
