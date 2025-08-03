import LogoutButton from "@components/dashboard/LogoutButton";
import { PageMargin } from "@utils";
import DeleteButton from "@components/dashboard/DeleteButton";
import { type Metadata } from "next";
import Greeting from "@components/dashboard/Greeting";
import ClearRecipe from "@components/dashboard/ClearRecipeButton";
import { UserProvider } from "@components/UserProvider";
import SavedCounter from "@components/dashboard/SavedCounter";

export const metadata: Metadata = {
  title: "Dashboard - SnapFridge",
};

export default function Page() {
  return (
    <UserProvider>
      <PageMargin>
        <Greeting />
        <SavedCounter />
        <DeleteButton />
        <ClearRecipe />
        <LogoutButton />
      </PageMargin>
    </UserProvider>
  );
}
