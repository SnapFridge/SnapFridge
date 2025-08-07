"use client";

import { ScrollArea as RadixScrollArea } from "radix-ui";
import { styled } from "@pigment-css/react";
import SavedItem from "./SavedItem";
import createClient from "@utils/supabase/client";
import Icon from "@components/Icon";
import { useUser } from "@components/UserProvider";
import type { SavedRecipe } from "@utils";
import { useEffect, useState } from "react";

export default function ScrollArea() {
  const user = useUser();
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>();

  useEffect(() => {
    async function getSavedRecipes() {
      if (!user) {
        return;
      }
      const supabase = createClient();
      // Safe to preform as Supabase will not allow multiple rows with the same key (user_id)
      await supabase.from("saved_recipes").insert({ user_id: user.id, recipes: [] });

      // Don't need to preform equality checks as supabase sho!uld only return the row the user has access to
      const { data } = await supabase.from("saved_recipes").select();
      setSavedRecipes((data?.[0]?.recipes ?? []) as SavedRecipe[]);
    }
    void getSavedRecipes();
  }, [user]);

  if (savedRecipes === undefined) {
    return;
  }

  if (savedRecipes.length < 1) {
    return (
      <NoRecipesContainer>
        <NoRecipesContent>
          <Icon icon="Ghost" size={36} color="var(--gray-600)" />
          <p>You currently have no saved recipes.</p>
        </NoRecipesContent>
      </NoRecipesContainer>
    );
  }

  return (
    <ScrollAreaRoot>
      <ScrollAreaViewport>
        <Container>
          {savedRecipes.map(({ id, name, imageType }) => (
            <SavedItem id={id} name={name} imageType={imageType} key={id} />
          ))}
        </Container>
      </ScrollAreaViewport>
      <ScrollAreaScrollBar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollBar>

      <ScrollAreaScrollBar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollBar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
}

const NoRecipesContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  margin: "0 0 36px",
});
const NoRecipesContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  maxWidth: "600px",
  color: "var(--gray-600)",
});

const Container = styled("div")({
  display: "flex",
  gap: "12px",
  padding: "20px 15px",
});

// apparently pigmentcss doesn't like defining css variables so use a string literal instead
const ScrollAreaRoot = styled(RadixScrollArea.Root)`
  width: max(200px, 75vw);
  height: fit-content;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: var(--shadow);
  background-color: var(--accent-50);

  --scrollbar-size: 10px;
`;

const ScrollAreaViewport = styled(RadixScrollArea.Viewport)({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});

const ScrollAreaScrollBar = styled(RadixScrollArea.ScrollAreaScrollbar)({
  display: "flex",
  userSelect: "none",
  touchAction: "none",
  padding: "2px",
  background: "var(--gray-300)",
  transition: "background 160ms ease-out",

  "&:hover": {
    background: "var(--gray-400)",
  },

  '&[data-orientation="vertical"]': {
    width: "var(--scrollbar-size)",
  },

  '&[data-orientation="horizontal"]': {
    flexDirection: "column",
    height: "var(--scrollbar-size)",
  },
});

const ScrollAreaThumb = styled(RadixScrollArea.Thumb)({
  flex: 1,
  background: "var(--gray-500)",
  borderRadius: "var(--scrollbar-size)",
  position: "relative",

  /* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
  "&::before": {
    content: "",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    minWidth: "44px",
    minHeight: "44px",
  },
});

const ScrollAreaCorner = styled(RadixScrollArea.Corner)({
  background: "black",
});
