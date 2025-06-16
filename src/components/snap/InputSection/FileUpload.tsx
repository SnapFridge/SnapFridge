"use client";

import { css, styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import { useEffect, useState, type ChangeEvent } from "react";
import VisuallyHidden from "@components/VisuallyHidden";
import FridgeImage from "./FridgeImage";
import { scaleClamped } from "@components/Global";

function FileUpload() {
  const [imgURLs, setImgURLs] = useState<string[]>([]);

  // Revoke object urls when this component demounts or URLs change
  useEffect(() => {
    return () => {
      for (const url of imgURLs) {
        URL.revokeObjectURL(url);
      }
    };
  }, [imgURLs]);

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    // Only null when the target is not <input type="file">, but we know it is
    const userFiles = event.target.files!;
    if (userFiles.length < 1) {
      return;
    }
    const newImages: string[] = [];
    for (const file of userFiles) {
      switch (file.type) {
        case "image/png":
        case "image/jpeg":
        case "image/webp":
        case "image/heic":
        case "image/heif": {
          // Used as src and key since it's unique
          const url = URL.createObjectURL(file);
          newImages.push(url);
          break;
        }
        default:
        // Toaster time
      }
    }
    // Reset so that you don't have invisible imgURLs
    event.target.value = "";
    const nextImages = [...imgURLs, ...newImages];
    setImgURLs(nextImages);
  }
  return (
    <Wrapper>
      <HiddenUpload
        onChange={handleFiles}
        type="file"
        multiple
        accept=".png,.jpg,.webp,.heic,.heif"
      />
      <VisibleContent>
        {imgURLs.length === 0 && (
          <>
            <Icon icon="FilePlus" size={36} />
            <VisuallyHidden>Add Images</VisuallyHidden>
          </>
        )}
        {imgURLs.map((url) => (
          <FridgeImage
            key={url}
            src={url}
            setImgURLs={setImgURLs}
            imgURLs={imgURLs}
          />
        ))}
      </VisibleContent>
    </Wrapper>
  );
}

const Wrapper = styled("div")({
  position: "relative",
  width: "100%",
  maxWidth: "576px",
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

const VisibleContent = styled("div")({
  width: "100%",
  height: "fit-content",
  minHeight: "180px",
  ["--gap" as string]: scaleClamped(7, 20, true, 320, 673),
  gap: "var(--gap)",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: "20px 20px",
  borderRadius: "16px",
  border: "var(--accent-300) dashed 4px",
  background: "color-mix(in srgb, var(--background-50) 65%, transparent)",

  [`${HiddenUpload}:focus + &`]: {
    /* Try to get the default outline color */
    outline: [
      "medium auto currentColor",
      "medium auto invert",
      "5px auto -webkit-focus-ring-color",
    ],
    outlineOffset: "4px",
  },
  [`${HiddenUpload}:hover + &`]: {
    background: "color-mix(in srgb, var(--background-100) 50%, transparent)",
  },

  variants: [],
});

export default FileUpload;
