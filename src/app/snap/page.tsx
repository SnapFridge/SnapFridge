import InputSection from "@components/snap/InputSection";
import { PageMargin } from "@utils";
import { InputProvider } from "@components/snap/InputProvider";
import RecipeSection from "@components/RecipeSection";
import { type Metadata } from "next";

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
    </PageMargin>
  );
}
