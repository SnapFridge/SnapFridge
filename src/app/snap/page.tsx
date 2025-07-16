import InputSection from "@components/snap/InputSection";
import { PageMargin } from "@components/Global";
import { InputProvider } from "@components/snap/InputProvider";
import RecipeSection from "@components/RecipeSection";
import { type Metadata } from "next";
import ToastProvider from "@components/ToastProvider";
import Toaster from "@components/Toaster";

export const metadata: Metadata = {
  title: "Snap - SnapFridge",
  description: "Start snapping recipes out of your fridge now!",
};

export default function Page() {
  return (
    <PageMargin>
      <InputProvider>
        <ToastProvider>
          <Toaster />
          <InputSection />
        </ToastProvider>
        <RecipeSection />
      </InputProvider>
    </PageMargin>
  );
}
