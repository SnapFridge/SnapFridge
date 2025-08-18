"use client";

import Button from "@components/Button";
import useToast from "@components/ToastProvider/UseToast";
import { useUnit } from "@components/UnitProvider";
import { useUser } from "@components/UserProvider";
import { css, styled } from "@pigment-css/react";
import { ON_MOBILE, type SavedRecipe } from "@utils";
import createClient from "@utils/supabase/client";
import { Heart, Share2 } from "lucide-react";
import Link from "next/link";
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
  const { addError, addSuccess } = useToast();
  const [unit, toggleUnit] = useUnit();
  const user = useUser();
  const supabase = createClient();
  const [saved, setSaved] = useState(
    initialSavedRecipes.findIndex((v) => v.id === id) > -1
  );

  async function toggleSave() {
    try {
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
        .eq("id", user!.id);

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
      {user ? (
        <Button
          variant="icon"
          className={SaveButtonCSS}
          onClick={() => void toggleSave()}
        >
          <Heart
            aria-hidden
            fill={saved ? "#FF4848" : "none"}
            color="#FF4848"
            size={36}
          />
          <RecipeActionText>Save{saved && "d"}</RecipeActionText>
        </Button>
      ) : (
        <Button variant="icon" className={SaveButtonCSS} as={Link} href="/login">
          <Heart aria-hidden color="#FF4848" size={36} />
          <RecipeActionText>Save</RecipeActionText>
        </Button>
      )}
      <ShareButton variant="icon" onClick={handleShare}>
        <Share2 aria-hidden size={36} />
        <RecipeActionText>Share</RecipeActionText>
      </ShareButton>
      <UnitButton variant="primary" onClick={toggleUnit}>
        {unit}
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

const SaveButtonCSS = css({
  flexDirection: "column",
});

const ShareButton = styled(Button)({
  flexDirection: "column",
  [ON_MOBILE]: {
    order: 1,
  },
});

const RecipeActionText = styled("p")({
  display: "block",
  fontSize: `${16 / 16}rem`,
  fontWeight: 700,
  [ON_MOBILE]: {
    fontSize: `${14 / 16}rem`,
  },
});

const UnitButton = styled(Button)({
  textTransform: "capitalize",
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
