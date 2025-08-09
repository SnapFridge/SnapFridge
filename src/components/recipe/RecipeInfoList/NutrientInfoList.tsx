import { styled } from "@pigment-css/react";
import { type SpoonacularRecipe } from "@components/recipe/RecipeInfo/RecipeInfo";
import { roundNumber } from "@utils";
import { Container, List, Title } from "./RecipeInfoList";

function NutrientInfoList({
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

const ListItem = styled("li")({
  fontSize: `${16 / 16}rem`,
  display: "flex",
  justifyContent: "space-between",
  flex: 1,
  minHeight: 0,
});

export default NutrientInfoList;
