import { styled } from "@pigment-css/react";
import { ON_MOBILE } from "@utils";
import { TriangleAlert } from "lucide-react";
import { type SpoonacularRecipe } from "../RecipeInfo";

interface Props {
  recipe: SpoonacularRecipe;
}

function prettyPrintArray(arr: string[]) {
  let prettyPrint = "";

  for (let i = 0; i < arr.length; i++) {
    prettyPrint += arr[i];
    if (i + 1 < arr.length) {
      prettyPrint += ", ";
    }
  }
  // Capitalize the first letter of the string
  return prettyPrint[0]!.toUpperCase() + prettyPrint.slice(1);
}

function AllergenWarning({ recipe }: Props) {
  const allergens = [];

  if (!recipe.glutenFree) allergens.push("gluten");
  if (!recipe.dairyFree) allergens.push("dairy");

  if (allergens.length <= 0) return undefined;

  return (
    <Wrapper>
      <TriangleAlert color="var(--warn-500)" size={32} aria-hidden />
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
    background: "var(--warn-500)",
    opacity: "30%",
    zIndex: -1,
  },

  [ON_MOBILE]: {
    margin: "0 auto",
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
