import { styled } from "@pigment-css/react";
import { type SavedRecipe } from "@utils";
import { createClient } from "@utils/supabase/server";
import { Ghost } from "lucide-react";
import { ScrollArea } from "radix-ui";
import SavedItem from "./SavedItem";

async function AppScrollArea() {
  const supabase = await createClient();
  const { data } = await supabase.from("saved_recipes").select();
  const savedRecipes = data![0]!.recipes as SavedRecipe[];

  if (!savedRecipes) {
    return;
  }

  if (savedRecipes.length < 1) {
    return (
      <NoRecipesContainer>
        <NoRecipesContent>
          <Ghost aria-hidden size={36} color="var(--gray-600)" />
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
  margin: "0 0 24px",
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

const ScrollAreaRoot = styled(ScrollArea.Root)({
  width: "max(100%, 200px)",
  height: "fit-content",
  borderRadius: "5px",
  overflow: "hidden",
  boxShadow: "var(--shadow)",
  background: "var(--accent-100)",
  ["--scrollbar-size" as string]: "10px",
});

const ScrollAreaViewport = styled(ScrollArea.Viewport)({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});

const ScrollAreaScrollBar = styled(ScrollArea.ScrollAreaScrollbar)({
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

const ScrollAreaThumb = styled(ScrollArea.Thumb)({
  flex: 1,
  background: "var(--gray-500)",
  borderRadius: "var(--scrollbar-size)",
  position: "relative",

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

const ScrollAreaCorner = styled(ScrollArea.Corner)({
  background: "black",
});

export default AppScrollArea;
