"use client";

import * as React from "react";
import { styled } from "@pigment-css/react";
import FileUpload from "./FileUpload";

function InputSection() {
  return (
    <Wrapper>
      <FileUpload />
    </Wrapper>
  );
}

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export default InputSection;
