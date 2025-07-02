"use client";

import InputSection from "@components/snap/InputSection";
import { PageMargin } from "@components/Global";
import RecipeSection from "@components/RecipeSection";
import InputProvider from "@components/snap/InputProvider";
import useToast from "@components/ToastProvider/UseToast";

export default function Page() {
  const { addSuccess } = useToast();

  return (
    <PageMargin>
      <InputProvider>
        <InputSection />
        <RecipeSection />
        <RecipeSection headerTxt="Previous Snaps" />
      </InputProvider>
      <button
        onClick={() => {
          addSuccess("Hello, World!", "Wowie this works?" + Math.random());
        }}
      >
        Test adding a toast
      </button>
    </PageMargin>
  );
}
