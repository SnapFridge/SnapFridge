"use client";

import { ON_MOBILE } from "@utils";
import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import { useUnit } from "@components/UnitProvider";
import { RecipeAction, RecipeActionText, UnitButton } from "./RecipeActions";
import { useRouter } from "next/navigation";
import useUser from "@components/User";
import { useSavedRecipes } from "./hooks.helper";

interface Props {
  recipeId: number;
  recipeName: string;
  updateSavedRecipes: (
    recipeId: number,
    recipeName: string
  ) => Promise<{ id: number; name: string }[] | undefined>;
}

function MobileRecipeActions({ recipeId, recipeName, updateSavedRecipes }: Props) {
  const router = useRouter();

  const [unit, toggleUnit] = useUnit();

  const user = useUser();
  const [savedRecipes, setSavedRecipes] = useSavedRecipes();

  const recipeExists = !!savedRecipes.find((value) => value.id === recipeId);

  const updateSavedAction = updateSavedRecipes.bind(null, recipeId, recipeName);

  async function handleHeartClick() {
    if (!user) return router.push("/login");
    try {
      const nextRecipes = (await updateSavedAction()) ?? [];
      setSavedRecipes(nextRecipes);
    } catch {
      // Maybe put a toast here later
    }
  }

  return (
    <Wrapper>
      <RecipeAction variant="icon" onClick={void handleHeartClick}>
        <Icon
          icon="Heart"
          fill={recipeExists ? "#FF4848" : undefined}
          color="#FF4848"
          size={24}
        />
        <MobileActionText>{recipeExists ? "Saved" : "Save"}</MobileActionText>
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

const MobileActionText = styled(RecipeActionText)({
  fontSize: `${14 / 16}rem`,
});

export default MobileRecipeActions;
