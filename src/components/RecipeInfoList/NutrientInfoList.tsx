import { styled } from "@pigment-css/react";
import { type SpoonacularRecipe } from "@components/RecipeInfo/RecipeInfo";
import { ON_MOBILE } from "@components/Global";
import { roundNumber } from "@components/Global";

export default function NutrientInfoList({
  nutrients,
}: {
  nutrients: SpoonacularRecipe["nutrition"]["nutrients"];
}) {
  return (
    <Container>
      <Title>Nutrients</Title>
      <List>
        {nutrients.map((nutrient) => {
          return (
            <ListItem key={nutrient.name}>
              <span>
                {nutrient.name} {"  "}
                {roundNumber(nutrient.amount)}
                {nutrient.unit}
              </span>
              <span>{nutrient.percentOfDailyNeeds}%</span>
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
  position: "sticky",
});

const List = styled("ul")({
  marginLeft: "12px",
  overflow: "auto",
});

const ListItem = styled("li")({
  fontSize: `${16 / 16}rem`,
  display: "flex",
  justifyContent: "space-between",
  flex: 1,
  minHeight: 0,
});
