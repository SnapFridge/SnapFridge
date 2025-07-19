import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { ON_MOBILE } from "@components/Global";

function RecipeActions() {
  return (
    <RecipeActionsContainer>
      <RecipeAction variant="icon">
        <Icon icon="Heart" color="#FF4848" size={36} />
        <RecipeActionText>Save</RecipeActionText>
      </RecipeAction>
      <RecipeAction variant="icon">
        <Icon icon="Share2" size={36} />
        <RecipeActionText>Share</RecipeActionText>
      </RecipeAction>
      <UnitButton variant="primary">Metric</UnitButton>
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

const RecipeAction = styled(Button)({
  display: "flex",
  flexDirection: "column",
});
const RecipeActionText = styled("p")({});

const UnitButton = styled(Button)({
  borderRadius: `${36 / 16}rem`,
  padding: "12px 26px",
  background: "var(--text-900)",
  color: "var(--text-50)",
});

export default RecipeActions;
