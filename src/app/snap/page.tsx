"use client";

import InputSection from "@components/snap/InputSection";
import { PageMargin } from "@components/Global";
import RecipeSection from "@components/RecipeSection";
import useToast from "@components/ToastProvider/UseToast";
import { useState, useActionState } from "react";
import AIprocessImages from "../api/actions";

export default function Page() {
  const { addSuccess } = useToast();
  
  const [files, setFiles] = useState<File[]>([]);
  const boundAction = AIprocessImages.bind(null, files);
  const [message, formAction, isPending] = useActionState(boundAction, null);


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
