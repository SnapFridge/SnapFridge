"use client";

import InputSection from "@components/snap/InputSection";
import { PageMargin } from "@components/Global";
import { InputProvider } from "@components/snap/InputProvider";
import RecipeSection from "@components/RecipeSection";

export default function Page() {
  return (
    <PageMargin>
      <InputProvider>
        <InputSection />
        <RecipeSection recipes={undefined} />
      </InputProvider>
    </PageMargin>
  );
}
