"use client";

import { styled } from "@pigment-css/react";
import FileUpload from "../ImageUpload/ImageUpload";
import IngredientSection from "@components/snap/IngredientSection";
import { useState, useActionState } from "react";
import AIprocessImages from "@app/api/actions";
import { type Ingredient } from "@components/Global";
import useToast from "@components/ToastProvider/UseToast";

function InputSection() {
  const [files, setFiles] = useState<File[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const boundAction = AIprocessImages.bind(null, files);
  const { addError } = useToast();

  // Update the ingredient state when calling the action
  async function wrapperFunction() {
    try {
      const result = await boundAction();
      if (result) {
        const newIngredients = JSON.parse(result);
        setIngredients((prev) => [...prev, ...newIngredients]);
      }
    } catch {
      addError("Scan error", "Gemini likely timed out.");
    }
  }

  function addFiles(newFiles: File[]) {
    const nextFiles = [...files, ...newFiles];
    setFiles(nextFiles);
  }

  function removeFile(imgIndex: number) {
    const nextFiles = files.filter((_, index) => index !== imgIndex);
    setFiles(nextFiles);
  }

  const [_message, formAction, isPending] = useActionState(
    wrapperFunction,
    null
  );

  return (
    <Wrapper>
      <FileUpload
        formAction={formAction}
        addFiles={addFiles}
        removeFile={removeFile}
      />
      <p style={{display: isPending ? "initial" : "none"}}>Fetching from Gemini API...</p>
      <IngredientSection
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
    </Wrapper>
  );
}

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

export default InputSection;
