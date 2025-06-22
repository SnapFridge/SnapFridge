// Temp to test fetching from server
// TODO: remove this later and move the fetching to recipe section/input section
"use client";

import InputSection from "@components/snap/InputSection";
import { PageMargin } from "@components/Global";
import RecipeSection from "@components/RecipeSection";
import useToast from "@components/ToastProvider/UseToast";

// TODO: move these two to input/rection section
import AIprocessImages from "../api/actions";
import { useActionState } from "react";

export default function Page() {
  const [message, formAction, isPending] = useActionState(
    AIprocessImages,
    null
  );
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
      <button formAction={formAction}>Test calling for Gemini API</button>

      {isPending ? <p>Fetching from Gemini API...</p> : <p>{message}</p>}
    </PageMargin>
  );
}
