import LogoutButton from "@components/dashboard/LogoutButton";
import { PageMargin } from "@utils";
import DeleteButton from "@components/dashboard/DeleteButton";
import { type Metadata } from "next";
import Greeting from "@components/dashboard/Greeting";
import ClearRecipe from "@components/dashboard/ClearRecipeButton";
import { UserProvider } from "@components/UserProvider";
import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import ScrollArea from "@components/ScrollArea";
import { scaleClamped } from "@utils";

export const metadata: Metadata = {
  title: "Dashboard - SnapFridge",
};

export default function Page() {
  return (
    <PageMargin>
      <UserProvider>
        <Greeting />
        <SavedRecipesHeader>
          <SavedRecipesTitle>Saved Recipes</SavedRecipesTitle>
          <Icon icon="Save" size={50} />
        </SavedRecipesHeader>
        <SavedRecipesContainer>
          <ScrollArea />
        </SavedRecipesContainer>
        <ActionContainer>
          <LogoutButton />
          <ClearRecipe />
          <DeleteButton />
        </ActionContainer>
      </UserProvider>
    </PageMargin>
  );
}
const SavedRecipesHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  margin: "24px 0",
});

const SavedRecipesTitle = styled("h1")({
  fontSize: scaleClamped(24, 36),
});

const SavedRecipesContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const ActionContainer = styled("div")({
  marginTop: "24px",
  display: "flex",
  gap: "15px",
});
