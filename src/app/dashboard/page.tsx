"use client";

import LogoutButton from "@components/dashboard/LogoutButton";
import { PageMargin } from "@utils";
import DeleteButton from "@components/dashboard/DeleteButton";
import { styled } from "@pigment-css/react";
import Counter from "@components/home/Counter";
import useUser from "@components/User";

export default function Page() {
  const u = useUser();

  return (
    <PageMargin>
      <Greeting>
        Hello, <Name>{u && (u.user_metadata["name"] || u.email)}</Name>
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
