import { styled } from "@pigment-css/react";
import type { SpoonacularRecipe } from "../RecipeInfo/RecipeInfo";
import Icon from "@components/Icon";
import { ON_MOBILE } from "@utils";

interface Props {
  recipeInfo: SpoonacularRecipe;
}

function prettyPrintArray(ingredients: string[]) {
  let prettyPrint = "";

  for (let i = 0; i++; i < ingredients.length) {
    const ingredient = ingredients[i];
    prettyPrint += ingredient;
    if (i + 1 < ingredients.length) {
      prettyPrint += ", ";
    }
  }

  // Capitalize the first letter of the string
  return prettyPrint[0]!.toUpperCase() + prettyPrint.slice(1);
}

function AllergenWarning({ recipeInfo }: Props) {
  const allergens = [];

  if (!recipeInfo.glutenFree) allergens.push("gluten");
  if (!recipeInfo.dairyFree) allergens.push("dairy");

  if (allergens.length <= 0) return undefined;

  return (
    <Wrapper>
      <Icon
        icon="TriangleAlert"
        color="var(--warn-500)"
        size={32}
        description="Warning"
      />
      <AllergenContent>
        <AllergenTitle>Possible Allergens</AllergenTitle>
        <AllergenText>{prettyPrintArray(allergens)}</AllergenText>
      </AllergenContent>
    </Wrapper>
  );
}

const Wrapper = styled("section")({
  padding: "12px 24px",
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  position: "relative",
  gap: "24px",
  borderLeft: "2px solid var(--warn-600)",
  marginBottom: "12px",

  "&::before": {
    content: "''",
    position: "absolute",
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "var(--warn-500)",
    opacity: "30%",
    zIndex: -1,
  },

  [ON_MOBILE]: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const AllergenContent = styled("div")({});
const AllergenTitle = styled("h2")({
  fontSize: `${20 / 16}rem`,
});
const AllergenText = styled("p")({
  fontSize: `${16 / 16}rem`,
});

export default AllergenWarning;
