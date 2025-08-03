import Counter from "@components/home/Counter";
import { styled } from "@pigment-css/react";
import { createClient } from "@utils/supabase/server";

export default async function SavedCounter() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("saved_recipes").select();

  if (error) {
    <ErrorText>Error: Failed to fetch saved recipes.</ErrorText>;
  }

  const recipes = (data?.[0]?.recipes ?? []) as {
    id: number;
    name: string;
    imageType: string;
  }[];

  return (
    <Header>
      You currently have <SavedRecipeCounter endValue={recipes.length} /> saved recipes!
    </Header>
  );
}

const ErrorText = styled("h2")({
  color: "var(--error-300)",
});

const Header = styled("h2")({});
const SavedRecipeCounter = styled(Counter)({
  backgroundImage: "linear-gradient(to right, var(--text-900), var(--text-600))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontWeight: "bold",
});
