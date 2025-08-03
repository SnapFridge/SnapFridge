"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { ON_MOBILE } from "@utils";
import { useUnit } from "@components/UnitProvider";
import { useUser } from "@components/UserProvider";
import { useRouter } from "next/navigation";
import useToast from "@components/ToastProvider/UseToast";
import { useEffect, useState } from "react";
import createClient from "@utils/supabase/client";

type Props = {
  recipeId: number;
  recipeName: string;
  imageType: string;
};
type SavedRecipe = {
  id: number;
  name: string;
  imageType: string;
};

function RecipeActions({ recipeId, recipeName, imageType }: Props) {
  const router = useRouter();
  const { addError, addSuccess } = useToast();
  const [unit, toggleUnit] = useUnit();
  const user = useUser();
  const supabase = createClient();

  // work on this l8r
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

  useEffect(() => {
    async function getSavedRecipes() {
      if (!user) {
        return;
      }

      // Safe to preform as Supabase will not allow multiple rows with the same key (user_id)
      await supabase.from("saved_recipes").insert({ user_id: user.id, recipes: [] });

      // Don't need to preform equality checks as supabase should only return the row the user has access to
      const { data } = await supabase.from("saved_recipes").select();

      const recipes = (data?.[0]?.recipes ?? []) as SavedRecipe[];

      setSavedRecipes(recipes);
    }
    void getSavedRecipes();
  }, [supabase, user]);

  const recipeSaved = savedRecipes.findIndex(({ id }) => id === recipeId) > -1;

  async function updateSavedRecipes() {
    // Why don't we use an eq? Because our database will only show us the right one!
    const { data, error } = await supabase.from("saved_recipes").select();
    if (error) throw new Error(`Supabase select error! ${error.code}: ${error.message}`);
    const savedRecipes = (data[0]?.recipes ?? []) as SavedRecipe[];
    const recipeIndex = savedRecipes.findIndex(({ id }) => id === recipeId);
    const nextRecipes =
      recipeIndex > -1
        ? savedRecipes.filter((value) => value.id !== recipeId)
        : [
            ...savedRecipes,
            {
              name: recipeName,
              id: recipeId,
              imageType: imageType,
            },
          ];
    const { error: updateError } = await supabase
      .from("saved_recipes")
      .update({ recipes: nextRecipes })
      .eq("user_id", user!.id);
    if (updateError)
      throw new Error(
        `Supabase update error! ${updateError.code}: ${updateError.message}`
      );
    return nextRecipes;
  }

  async function handleSaveClick() {
    try {
      if (!user) {
        router.push("/login");
      }
      setSavedRecipes(await updateSavedRecipes());
    } catch (error) {
      addError("Error saving data", `${error}`);
    }
  }

  async function handleShareClick() {
    const url = window.location.toString();
    try {
      await navigator.clipboard.writeText(url);
      addSuccess("Copied to clipboard");
    } catch {
      addError("Unable to copy to clipboard!");
    }
  }

  return (
    <Container>
      <ColFlexButton variant="icon" onClick={handleSaveClick}>
        <Icon
          icon="Heart"
          fill={recipeSaved ? "#FF4848" : "none"}
          color="#FF4848"
          size={36}
        />
        <RecipeActionText>{recipeSaved ? "Saved" : "Save"}</RecipeActionText>
      </ColFlexButton>
      <ShareButton variant="icon" onClick={handleShareClick}>
        <Icon icon="Share2" size={36} />
        <RecipeActionText>Share</RecipeActionText>
      </ShareButton>
      <UnitButton variant="primary" onClick={toggleUnit}>
        {unit === "metric" ? "Metric" : "Imperial"}
      </UnitButton>
    </Container>
  );
}

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  [ON_MOBILE]: {
    zIndex: 1,
    flexDirection: "row",
    position: "fixed",
    right: 0,
    left: 0,
    margin: "auto",
    bottom: "16px",
    maxWidth: "320px",
    borderRadius: `${50 / 16}rem`,
    gap: "26px",
    background: "var(--background-50)",
  },
});

const ColFlexButton = styled(Button)({
  flexDirection: "column",
});

const ShareButton = styled(Button)({
  flexDirection: "column",
  [ON_MOBILE]: {
    order: 1,
  },
});

const RecipeActionText = styled("p")({
  fontSize: `${16 / 16}rem`,
  fontWeight: 700,

  [ON_MOBILE]: {
    fontSize: `${14 / 16}rem`,
  },
});

const UnitButton = styled(Button)({
  height: "fit-content",
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
