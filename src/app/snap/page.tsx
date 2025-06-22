"use client";

import InputSection from "@components/snap/InputSection";
import { PageMargin } from "@components/Global";
import RecipeSection from "@components/RecipeSection";
import useToast from "@components/ToastProvider/UseToast";

export default function Page() {
  const { addSuccess } = useToast();

  return (
    <PageMargin>
      <InputSection></InputSection>
      <RecipeSection />
      <RecipeSection headerText="Previous Snaps" />

      <button
        onClick={() => {
          addSuccess("Hello, World!", "Wowie this works?");
        }}
      >
        Test adding a toast
      </button>
    </PageMargin>
  );
}
