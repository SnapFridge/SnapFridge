"use client";

import { styled } from "@pigment-css/react";
import FileUpload from "../ImageUpload/ImageUpload";
import IngredientSection from "@components/snap/IngredientSection";

function InputSection({ setRecipes }) {
  return (
    <Wrapper>
      <FileUpload />
      <IngredientSection setRecipes={setRecipes} />
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
