import { styled } from "@pigment-css/react";
import { type SpoonacularRecipe } from "@components/recipe/RecipeInfo/RecipeInfo";
import { round } from "@utils";
import { Container, List, Title } from "./RecipeInfoList";

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
                {round(nutrient.amount, 2)}
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

const ListItem = styled("li")({
  fontSize: `${16 / 16}rem`,
  display: "flex",
  justifyContent: "space-between",
  flex: 1,
  minHeight: 0,
});
