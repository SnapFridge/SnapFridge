"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import { useState, type ChangeEvent } from "react";
import VisuallyHidden from "@components/VisuallyHidden";
import { readFile } from "./file.helper";

interface Image {
  src: string | undefined;
  id: string;
}

function FileUpload() {
  const [images, setImages] = useState<Image[]>([]);

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const userFiles = event.target.files ?? [];
    const readerPromises: Promise<string | undefined>[] = [];

    for (const file of userFiles) {
      if (!file.type.startsWith("image/")) {
        // TODO show this on a toaster when we make one
        continue;
      }
      readerPromises.push(readFile(file));
    }

    const result = await Promise.all(readerPromises);
    const newImages = result.map((src) => ({ src, id: crypto.randomUUID() }));
    const nextImages = [...images, ...newImages];
    setImages(nextImages);
  }

  return (
    <Wrapper>
      <HiddenUpload onChange={handleFiles} type="file" />
      {images.length === 0 && <Icon icon="FilePlus" size={36} />}
      {images.map(({ src, id }) => (
        <img key={id} width={150} height={150} src={src} />
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
