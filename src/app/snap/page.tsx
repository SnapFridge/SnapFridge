import RecipeSection from "@components/RecipeSection";
import ImageUpload from "@components/snap/ImageUpload";
import IngredientSection from "@components/snap/IngredientSection";
import { InputProvider } from "@components/snap/InputProvider";
import { styled } from "@pigment-css/react";
import { PageMargin } from "@utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snap - SnapFridge",
  description: "Start snapping recipes out of your fridge now!",
};

export default function Page() {
  return (
    <PageMargin>
      <InputProvider>
        <InputSection>
          <ImageUpload />
          <IngredientSection />
        </InputSection>
        <RecipeSection />
      </InputProvider>
    </PageMargin>
  );
}

const InputSection = styled("section")({
  margin: "auto",
  width: "min(100%, 576px)",
});
