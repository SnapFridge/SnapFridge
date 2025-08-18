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
      <div>
        <AllergenTitle>Possible Allergens</AllergenTitle>
        <AllergenText>{prettyPrintArray(allergens)}</AllergenText>
      </div>
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
  margin: "0 0 24px",
  borderLeft: "2px solid var(--warn-600)",
  borderRadius: "0 8px 8px 0",
  background: "color-mix(in srgb, var(--warn-500) 30%, transparent)",
  [ON_MOBILE]: {
    borderRadius: 0,
    borderRight: "2px solid var(--warn-600)",
    margin: "0 auto 24px",
  },
});

const AllergenTitle = styled("h2")({
  fontSize: `${20 / 16}rem`,
});

const AllergenText = styled("p")({
  fontSize: `${16 / 16}rem`,
});

export default AllergenWarning;
