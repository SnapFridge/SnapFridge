import { ON_MOBILE } from "@components/Global";
import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import { RecipeAction, RecipeActionText, UnitButton } from "./RecipeActions";

function MobileRecipeActions() {
  return (
    <Wrapper>
      <RecipeAction variant="icon">
        <Icon icon="Heart" color="#FF4848" size={24} />
        <MobileActionText>Save</MobileActionText>
      </RecipeAction>
      <UnitButton variant="primary">Metric</UnitButton>
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
  zIndex: "9999999",

  gap: "26px",
  justifyContent: "center",
  alignItems: "center",

  [ON_MOBILE]: {
    display: "flex",
  },
});

const MobileActionText = styled(RecipeActionText)({
  fontSize: `${14 / 16}rem`,
});

export default MobileRecipeActions;
