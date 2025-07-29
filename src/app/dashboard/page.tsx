import { redirect } from "next/navigation";
import { createClient } from "@utils/supabase/server";
import LogoutButton from "@components/dashboard/LogoutButton";
import { PageMargin } from "@utils";
import DeleteButton from "@components/dashboard/DeleteButton";
import { styled } from "@pigment-css/react";
import Counter from "@components/home/Counter";

export default async function Page() {
  const { auth } = await createClient();
  const {
    error,
    data: { user },
  } = await auth.getUser();
  if (error || user === null) {
    redirect("/login");
  }

  // todo: update this to work with anonymous
  let welcomeText: string = user.user_metadata["name"] || user.email;

  return (
    <PageMargin>
      <Greeting>
        Hello, <Name>{welcomeText}</Name>
      </Greeting>
      <h2>
        You currently have <SavedRecipeCounter endValue={727} /> saved recipes!
      </h2>
      <DeleteButton />
      <LogoutButton />
    </PageMargin>
  );
}

const Greeting = styled("h1")({});

// thanks gemini
const Name = styled("span")({
  backgroundImage: "linear-gradient(to right, var(--text-800), var(--text-400))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontSize: `${36 / 16}rem`,
  fontWeight: "bold",
});

// again, thanks gemini
const SavedRecipeCounter = styled(Counter)({
  backgroundImage: "linear-gradient(to right, var(--text-900), var(--text-600))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontWeight: "bold",
});
