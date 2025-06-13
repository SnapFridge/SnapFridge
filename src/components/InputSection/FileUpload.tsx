"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import { useState, type ChangeEvent } from "react";

function FileUpload() {
  const [files, setFiles] = useState([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    console.log(files);
  }

  return (
    <Wrapper>
      <HiddenUpload onChange={handleChange} type="file" />
      <Icon icon="FilePlus" size={36} />
    </Wrapper>
  );
}

const Wrapper = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "600px",
  height: "180px",
  borderRadius: "16px",
  outline: "var(--accent-300) dashed 4px",
  outlineOffset: "-4px",
  background: "color-mix(in srgb, var(--background-50) 65%, transparent)",
});

const HiddenUpload = styled("input")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto",
  opacity: 0,
  appearance: "none",
});

export default FileUpload;
