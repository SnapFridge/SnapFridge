"use client";

import { styled } from "@pigment-css/react";
import FileUpload from "../ImageUpload/ImageUpload";
import IngredientSection from "@components/snap/IngredientSection";

function InputSection() {
  return (
    <Wrapper>
      <FileUpload />
      <IngredientSection />
    </Wrapper>
  );
}

const Wrapper = styled("div")({
  margin: "auto",
  width: "min(100%, 576px)",
});

export default InputSection;
