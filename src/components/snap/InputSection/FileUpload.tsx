"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import { useState, type ChangeEvent } from "react";
import VisuallyHidden from "@components/VisuallyHidden";
import readFile from "./readFile.helper";
import FridgeImage from "./FridgeImage";

interface Image {
  src: string;
  key: string;
}

function FileUpload() {
  const [images, setImages] = useState<Image[]>([]);

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const userFiles = event.target.files ?? [];
    const readerPromises: Promise<string>[] = [];

    for (const file of userFiles) {
      switch (file.type) {
        case "image/png":
        case "image/jpeg":
        case "image/webp":
        case "image/heic":
        case "image/heif":
          readerPromises.push(readFile(file));
          break;
        default:
        // Toaster time
      }
    }
    const results = await Promise.allSettled(readerPromises);
    const newImages = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => {
        return { src: result.value, key: crypto.randomUUID() };
      });
    const nextImages = [...images, ...newImages];
    setImages(nextImages);
  }

  function deleteImage(key: string) {
    const nextImages = images.filter((img) => img.key !== key);
    setImages(nextImages);
  }

  return (
    <Wrapper>
      <HiddenUpload
        onChange={(e) => void handleFiles(e)}
        type="file"
        multiple
        accept=".png,.jpg,.webp,.heic,.heif"
      />
      {images.length === 0 && <Icon icon="FilePlus" size={36} />}
      {images.map(({ src, key }) => (
        <FridgeImage
          key={key}
          imageKey={key}
          src={src}
          deleteImage={deleteImage}
        />
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
  width: "75%",
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
