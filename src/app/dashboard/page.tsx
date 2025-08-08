import { PageMargin } from "@utils";
import { type Metadata } from "next";
import Greeting from "@components/dashboard/Greeting";
import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import ScrollArea from "@components/dashboard/ScrollArea";
import { scaleClamped } from "@utils";
import AccountButtons from "@components/dashboard/AccountButtons";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard - SnapFridge",
};

export default function Page() {
  return (
    <PageMargin>
      <Greeting />
      <Suspense>
        <SavedRecipesHeader>
          <SavedRecipesTitle>Saved Recipes</SavedRecipesTitle>
          <Icon icon="Save" size={50} />
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
