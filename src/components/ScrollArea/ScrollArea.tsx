import { ScrollArea as RadixScrollArea } from "radix-ui";
import { styled } from "@pigment-css/react";
import SavedItem from "./SavedItem";
import { createClient } from "@utils/supabase/server";
import Icon from "@components/Icon";

export default async function ScrollArea() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <LoginContainer>
        <LoginContent>
          <Icon icon="User" size={36} color="var(--gray-500)" />
          <p>You must login to see saved recipes!</p>
        </LoginContent>
      </LoginContainer>
    );
  }

  const { data, error } = await supabase.from("saved_recipes").select();

  if (error) {
    console.error("Error fetching saved recipes:", error);
    return (
      <ErrorContainer>
        <ErrorContent>
          <Icon icon="TriangleAlert" size={36} color="var(--error-300)" />
          <p>Error: Failed to fetch saved recipes. Please try again.</p>
        </ErrorContent>
      </ErrorContainer>
    );
  }

  const recipes = (data?.[0]?.recipes ?? []) as {
    id: number;
    name: string;
    imageType: string;
  }[];

  if (recipes.length === 0) {
    return (
      <NoRecipesContainer>
        <NoRecipesContent>
          <Icon icon="Ghost" size={36} color="var(--gray-500)" />
          <p>You currently have no saved recipes.</p>
        </NoRecipesContent>
      </NoRecipesContainer>
    );
  }

  return (
    <ScrollAreaRoot>
      <ScrollAreaViewport>
        <Container>
          {recipes.map((recipe) => (
            <SavedItem
              recipeID={recipe.id}
              recipeName={recipe.name}
              imageType={recipe.imageType}
              key={recipe.name}
            />
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

const LoginContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  margin: "0 0 36px",
});
const LoginContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  maxWidth: "600px",
  color: "var(--gray-500)",
});

const ErrorContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  margin: "0 0 36px",
});
const ErrorContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  maxWidth: "600px",
  color: "var(--error-300)",
});

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
  color: "var(--gray-500)",
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
  box-shadow: 0 2px 10px var(--gray-400);
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
