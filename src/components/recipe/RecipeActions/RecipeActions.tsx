"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { ON_MOBILE } from "@utils";
import { useUnit } from "@components/UnitProvider";
import { useSavedRecipes } from "./hooks.helper";

function RecipeActions() {
  const [unit, toggleUnit] = useUnit();
  const savedRecipes = useSavedRecipes();

  return (
    <RecipeActionsContainer>
      <RecipeAction variant="icon" onClick={() => {}}>
        <Icon icon="Heart" color="#FF4848" size={36} />
        <RecipeActionText>Save</RecipeActionText>
      </RecipeAction>
      <RecipeAction variant="icon">
        <Icon icon="Share2" size={36} />
        <RecipeActionText>Share</RecipeActionText>
      </RecipeAction>
      <UnitButton variant="primary" onClick={toggleUnit}>
        {unit === "metric" ? "Metric" : "Imperial"}
      </UnitButton>
    </RecipeActionsContainer>
  );
}

const RecipeActionsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyItems: "center",

  [ON_MOBILE]: {
    display: "none",
  },
});

export const RecipeAction = styled(Button)({
  display: "flex",
  flexDirection: "column",
});

export const RecipeActionText = styled("p")({
  fontSize: `${16 / 16}rem`,
  fontWeight: 700,
});

export const UnitButton = styled(Button)({
  borderRadius: `${36 / 16}rem`,
  maxWidth: "104px",
  padding: "12px 26px",
  background: "var(--text-900)",
  color: "var(--text-50)",
  fontSize: `${16 / 16}rem`,
  fontWeight: 700,

  "&:hover": {
    background: "var(--text-700)",
  },
});

export default RecipeActions;
