import InputSection from "@components/snap/InputSection";
import { PageMargin } from "@utils";
import { InputProvider } from "@components/snap/InputProvider";
import RecipeSection from "@components/RecipeSection";
import { type Metadata } from "next";
import ScrollArea from "@components/ScrollArea";
import { styled } from "@pigment-css/react";
import { scaleClamped } from "@utils";
import Icon from "@components/Icon";

export const metadata: Metadata = {
  title: "Snap - SnapFridge",
  description: "Start snapping recipes out of your fridge now!",
};

export default function Page() {
  return (
    <PageMargin>
      <InputProvider>
        <InputSection />
        <RecipeSection />
      </InputProvider>

      <SavedRecipesHeader>
        <SavedRecipesTitle>Saved Recipes</SavedRecipesTitle>
        <Icon icon="Download" size={50} />
      </SavedRecipesHeader>
      <SavedRecipesContainer>
        <ScrollArea />
      </SavedRecipesContainer>
    </PageMargin>
  );
}

const SavedRecipesHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  margin: "0 0 12px",
});

const SavedRecipesTitle = styled("h1")({
  fontSize: scaleClamped(24, 36),
});

const SavedRecipesContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
});
