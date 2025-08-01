import LogoutButton from "@components/dashboard/LogoutButton";
import { PageMargin } from "@utils";
import DeleteButton from "@components/dashboard/DeleteButton";
import { styled } from "@pigment-css/react";
import Counter from "@components/home/Counter";
import { type Metadata } from "next";
import Greeting from "@components/dashboard/Greeting";
import ClearRecipe from "@components/dashboard/ClearRecipeButton";

export const metadata: Metadata = {
  title: "Dashboard - SnapFridge",
};

export default function Page() {
  return (
    <PageMargin>
      <Greeting />
      <h2>
        You currently have <SavedRecipeCounter endValue={727} /> saved recipes!
      </h2>
      <DeleteButton />
      <ClearRecipe />
      <LogoutButton />
    </PageMargin>
  );
}

const SavedRecipeCounter = styled(Counter)({
  backgroundImage: "linear-gradient(to right, var(--text-900), var(--text-600))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontWeight: "bold",
});
