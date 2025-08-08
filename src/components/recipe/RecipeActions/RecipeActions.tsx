"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { ON_MOBILE } from "@utils";
import { useUnit } from "@components/UnitProvider";
import { useUser } from "@components/UserProvider";
import { useRouter } from "next/navigation";
import useToast from "@components/ToastProvider/UseToast";
import createClient from "@utils/supabase/client";
import { type SavedRecipe } from "@utils";
import { useState } from "react";

type Props = {
  initialSavedRecipes: SavedRecipe[];
};

function RecipeActions({
  id,
  name,
  imageType,
  initialSavedRecipes,
}: SavedRecipe & Props) {
  const router = useRouter();
  const { addError, addSuccess } = useToast();
  const [unit, toggleUnit] = useUnit();
  const user = useUser();
  const supabase = createClient();
  const [saved, setSaved] = useState(
    initialSavedRecipes.findIndex((v) => v.id === id) > -1
  );

  async function toggleSave() {
    try {
      if (!user) {
        router.push("/login");
        return;
      }
      const nextRecipes = initialSavedRecipes;
      if (saved) {
        nextRecipes.splice(
          nextRecipes.findIndex((v) => v.id === id),
          1
        );
        setSaved(false);
      } else {
        nextRecipes.push({ id, name, imageType });
        setSaved(true);
      }
      const { error } = await supabase
        .from("saved_recipes")
        .update({ recipes: nextRecipes })
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      addError("Error saving data", `${error}`);
    }
  }

  async function handleShare() {
    const url = location.toString();
    try {
      await navigator.clipboard.writeText(url);
      addSuccess("Copied to clipboard");
    } catch {
      addError("Unable to copy to clipboard!");
    }
  }

  return (
    <Container>
      <ColFlexButton variant="icon" onClick={() => void toggleSave()}>
        <Icon icon="Heart" fill={saved ? "#FF4848" : "none"} color="#FF4848" size={36} />
        <RecipeActionText>{saved ? "Saved" : "Save"}</RecipeActionText>
      </ColFlexButton>
      <ShareButton variant="icon" onClick={handleShare}>
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
