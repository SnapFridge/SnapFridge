"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import { useRef, useState, type ChangeEvent } from "react";
import VisuallyHidden from "@components/VisuallyHidden";
import readFile from "./readFile.helper";
import ImageComponent from "@components/ImageComponent";

interface Image {
  src: string | undefined;
  key: number;
}

function FileUpload() {
  const [images, setImages] = useState<Image[]>([]);
  const newId = useRef(0);

function handleFiles(event: ChangeEvent<HTMLInputElement>) {

  // ESLint complains if I don't use an IIAFE
  void (async () => {
    const userFiles = event.target.files ?? [];
    const newImages: Image[] = []
    for (const file of userFiles) {
      switch (file.type) {
        case "image/png":
        case "image/jpeg":
        case "image/webp":
        case "image/heic":
        case "image/heif":
          newImages.push({ src: await readFile(file), key: newId.current++ });
          break;
        default:
          // TODO show this on a toaster when we make one
          // Rylex: JUST USE ALERT BRO IT'S TOTALLY FINEEEEEE
      }
    }
    setImages([...images, ...newImages]);
  })();
}

  return (
    <Wrapper>
      <HiddenUpload onChange={handleFiles} type="file" multiple/>
      {images.length === 0 && <Icon icon="FilePlus" size={36} />}
      {images.map(({ src, key }) => (
        <ImageComponent key={key} src={src} />
      ))}
      <VisuallyHidden>Add Images</VisuallyHidden>
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
