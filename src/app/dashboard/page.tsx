import LogoutButton from "@components/dashboard/LogoutButton";
import { PageMargin } from "@utils";
import DeleteButton from "@components/dashboard/DeleteButton";
import { styled } from "@pigment-css/react";
import Counter from "@components/home/Counter";
import { type Metadata } from "next";
import { createClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";

import deleteUser from "@components/dashboard/DeleteButton/actions";

export const metadata: Metadata = {
  title: "Dashboard - SnapFridge",
};

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return redirect("/login");

  return (
    <PageMargin>
      <Greeting>
        Hello, <Name>{user && (user.user_metadata["name"] || user.email)}</Name>
      </Greeting>
      <h2>
        You currently have <SavedRecipeCounter endValue={727} /> saved recipes!
      </h2>
      <DeleteButton deleteUser={deleteUser} />
      <LogoutButton />
    </PageMargin>
  );
}

const Greeting = styled("h1")({});

const Name = styled("span")({
  backgroundImage: "linear-gradient(to right, var(--text-800), var(--text-400))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontSize: `${36 / 16}rem`,
  fontWeight: "bold",
});

const SavedRecipeCounter = styled(Counter)({
  backgroundImage: "linear-gradient(to right, var(--text-900), var(--text-600))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontWeight: "bold",
});
