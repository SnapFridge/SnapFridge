"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { ON_MOBILE } from "@utils";
import { useUnit } from "@components/UnitProvider";
import { useUser } from "@components/UserProvider";
import { useRouter } from "next/navigation";
import useToast from "@components/ToastProvider/UseToast";
import { RecipeActionsContext } from "./RecipeActionsProvider";
import { use } from "react";

interface Props {
  recipeId: number;
  recipeName: string;
  imageType: string;
  updateSavedRecipes: (
    recipeId: number,
    recipeName: string,
    imageType: string
  ) => Promise<{ id: number; name: string; imageType: string }[] | undefined>;
}

function RecipeActions({ recipeId, recipeName, imageType, updateSavedRecipes }: Props) {
  const router = useRouter();
  const { addError, addSuccess } = useToast();

  const [unit, toggleUnit] = useUnit();
  const user = useUser();
  const [savedRecipes, setSavedRecipes] = use(RecipeActionsContext)!;

  const recipeExists = !!savedRecipes.find((value) => value.id === recipeId);

  const updateSavedAction = updateSavedRecipes.bind(
    null,
    recipeId,
    recipeName,
    imageType
  );

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
