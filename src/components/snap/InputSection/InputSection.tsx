"use client";

import * as React from "react";
import { styled } from "@pigment-css/react";
import FileUpload from "../ImageUpload/ImageUpload";
import IngredientSection from "@components/snap/IngredientSection";
import { useState, useActionState, useEffect } from "react";
import AIprocessImages from "../../../app/api/actions";
import Ingredient from "../IngredientSection/Ingredient";

function InputSection() {
  const [files, setFiles] = useState<File[]>([]);
  const boundAction = AIprocessImages.bind(null, files);
  const [message, formAction, isPending] = useActionState(boundAction, null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (message) {
      setIngredients([...ingredients].concat(JSON.parse(message)));
    }
  }, [message]);

  return (
    <Wrapper>
      <FileUpload setFiles={setFiles} formAction={formAction} files={files} />
      {isPending ? <p>Fetching from Gemini API...</p> : undefined }
      <IngredientSection ingredients={ingredients} setIngredients={setIngredients} />
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
