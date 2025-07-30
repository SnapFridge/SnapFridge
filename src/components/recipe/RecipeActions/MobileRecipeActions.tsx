"use client";

import { ON_MOBILE } from "@utils";
import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import { useUnit } from "@components/UnitProvider";
import Button from "@components/Button";

function MobileRecipeActions() {
  const [unit, toggleUnit] = useUnit();

  return (
    <Wrapper>
      <RecipeAction variant="icon">
        <Icon icon="Heart" color="#FF4848" size={24} />
        <MobileActionText>Save</MobileActionText>
      </RecipeAction>
      <UnitButton variant="primary" onClick={toggleUnit}>
        {unit === "metric" ? "Metric" : "Imperial"}
      </UnitButton>
      <RecipeAction variant="icon">
        <Icon icon="Share2" size={24} />
        <MobileActionText>Share</MobileActionText>
      </RecipeAction>
    </Wrapper>
  );
}

const Wrapper = styled("aside")({
  display: "none",
  position: "fixed",
  right: 0,
  left: 0,
  margin: "auto",
  bottom: "16px",
  maxWidth: "314px",
  padding: "0 40px",
  background: "var(--background-50)",
  borderRadius: `${50 / 16}rem`,
  zIndex: 1,

  gap: "26px",
  justifyContent: "center",
  alignItems: "center",

  [ON_MOBILE]: {
    display: "flex",
  },
});

const RecipeAction = styled(Button)({
  display: "flex",
  flexDirection: "column",
});

const RecipeActionText = styled("p")({
  fontSize: `${16 / 16}rem`,
  fontWeight: 700,
});

const UnitButton = styled(Button)({
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

const MobileActionText = styled(RecipeActionText)({
  fontSize: `${14 / 16}rem`,
});

export default MobileRecipeActions;
