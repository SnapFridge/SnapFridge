import AccountButtons from "@components/dashboard/AccountButtons";
import Greeting from "@components/dashboard/Greeting";
import ScrollArea from "@components/dashboard/ScrollArea";
import { styled } from "@pigment-css/react";
import { PageMargin, scaleClamped } from "@utils";
import { Save } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <PageMargin>
      <Greeting />
      <Suspense>
        <SavedRecipesHeader>
          <SavedRecipesTitle>Saved Recipes</SavedRecipesTitle>
          <Save size={50} />
        </SavedRecipesHeader>
        <ScrollArea />
      </Suspense>
      <AccountButtons />
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
