"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { ON_MOBILE } from "@utils";
import { useUnit } from "@components/UnitProvider";
import { useSavedRecipes } from "./hooks.helper";
import useUser from "@components/User";
import { useRouter } from "next/navigation";
import useToast from "@components/ToastProvider/UseToast";

interface Props {
  recipeId: number;
  recipeName: string;
  updateSavedRecipes: (
    recipeId: number,
    recipeName: string
  ) => Promise<{ id: number; name: string }[] | undefined>;
}

function RecipeActions({ recipeId, recipeName, updateSavedRecipes }: Props) {
  const router = useRouter();
  const { addError, addSuccess } = useToast();

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
    } catch (error) {
      // Maybe put a toast here later
      addError("Error saving data", `${error}`);
    }
  }

  async function handleSaveClick() {
    const url = window.location.toString();
    try {
      await navigator.clipboard.writeText(url);
      addSuccess("Copied to clipboard");
    } catch {
      addError("Unable to copy to clipboard!");
    }
  }

  return (
    <RecipeActionsContainer>
      <RecipeAction variant="icon" onClick={handleHeartClick}>
        <Icon
          icon="Heart"
          fill={recipeExists ? "#FF4848" : undefined}
          color="#FF4848"
          size={36}
        />
        <RecipeActionText>{recipeExists ? "Saved" : "Save"}</RecipeActionText>
      </RecipeAction>
      <RecipeAction variant="icon" onClick={handleSaveClick}>
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
