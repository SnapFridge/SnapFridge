"use client";

import InputSection from "@components/snap/InputSection";
import { PageMargin } from "@components/Global";
import InputProvider from "@components/snap/InputProvider";
import useToast from "@components/ToastProvider/UseToast";
import RecipeHolder from "@components/snap/RecipeHolder";

export default function Page() {
  const { addSuccess } = useToast();

  return (
    <PageMargin>
      <InputProvider>
        <InputSection />
        <RecipeHolder />
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
