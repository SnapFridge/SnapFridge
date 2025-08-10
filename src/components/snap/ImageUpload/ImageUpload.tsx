"use client";

import Button from "@components/Button";
import Icon from "@components/Icon";
import Input from "@components/Input";
import useToast from "@components/ToastProvider/UseToast";
import VisuallyHidden from "@components/VisuallyHidden";
import { css, styled } from "@pigment-css/react";
import { scaleClamped } from "@utils";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { BarLoader } from "react-spinners";
import { useInputState } from "../InputProvider";
import FridgeImage from "./FridgeImage";
import getIngredientWriter from "./IngredientWriter";

function ImageUpload() {
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  const { state, dispatch } = useInputState();
  const { files } = state;
  const { addWarn, addError } = useToast();
  const [pending, setPending] = useState(false);

  function handleFiles(files: FileList) {
    const newImages: string[] = [];
    const validFiles: File[] = [];
    for (const file of files) {
      switch (file.type) {
        case "image/png":
        case "image/jpeg":
        case "image/webp": {
          // Used as src and key since it's unique
          const url = URL.createObjectURL(file);
          newImages.push(url);
          break;
        }
        default:
          continue;
      }
      validFiles.push(file);
    }
    if (validFiles.length < files.length) {
      addWarn(
        "File Upload Error",
        "Files with unsupported format were uploaded, they've been ignored."
      );
    }

    dispatch({ type: "addFiles", files: validFiles });
    const nextImages = [...imgURLs, ...newImages];
    setImgURLs(nextImages);
  }

  function deleteImage(imgURL: string) {
    const index = imgURLs.findIndex((url) => imgURL === url);
    dispatch({ type: "removeFile", index });
    setImgURLs(imgURLs.filter((_, idx) => idx !== index));
  }

  async function fetchGemini(e: FormEvent) {
    setPending(true);
    e.preventDefault();
    const body = new FormData();
    for (const file of files) {
      body.append("files", file);
    }
    const res = await fetch("/gemini", {
      method: "POST",
      body: body,
    });
    if (res.ok) {
      await res
        .body!.pipeThrough(new TextDecoderStream())
        .pipeTo(getIngredientWriter(dispatch));
    } else {
      addError("Gemini fetching error", `${res.status} ${res.statusText}`);
    }
    setPending(false);
  }
  return (
    <>
      <EmptyTitle className={`${Appear} ${imgURLs.length > 0 ? "appear" : ""}`}>
        Upload fridge images to get started!
      </EmptyTitle>
      <Form layout onSubmit={(e) => void fetchGemini(e)}>
        <FileUploader>
          <HiddenUpload
            label={<VisuallyHidden>Upload image(s)</VisuallyHidden>}
            title="Upload image(s)"
            onChange={handleFiles}
            type="file"
            multiple
            accept=".png,.jpg,.webp"
            name="fileInput"
          />
          {imgURLs.length < 1 ? (
            <NoImageContainer>
              <Icon icon="ImageUp" size={36} />
              <SupportedFormats>Supported formats: png, jpg, webp</SupportedFormats>
            </NoImageContainer>
          ) : (
            <ImageContainer as="ul">
              {imgURLs.map((url) => (
                <FridgeImage key={url} src={url} deleteImage={deleteImage} />
              ))}
            </ImageContainer>
          )}
        </FileUploader>
        <ScanButton
          className={`${Appear} ${imgURLs.length > 0 ? "" : "appear"}`}
          disabled={pending}
          type="submit"
        >
          Scan
        </ScanButton>
      </Form>
      <BarLoader width="100%" color="var(--text-950)" loading={pending} />
    </>
  );
}

const Appear = css({
  transition: "opacity .25s, visibility 0s",
  "&.appear": {
    transition: "opacity .25s, visibility 0s .25s",
    opacity: 0,
    visibility: "hidden",
  },
});

const EmptyTitle = styled("h1")({
  textAlign: "center",
  width: "100%",
  margin: "0 0 20px",
  fontSize: scaleClamped(20, 30),
});

const Form = styled(motion.form)({
  width: "100%",
  "& > *": {
    width: "100%",
  },
});

const FileUploader = styled("div")({
  position: "relative",
  "& > *": {
    width: "100%",
  },
});

const HiddenUpload = styled(Input)({
  position: "absolute",
  height: "100%",
  opacity: 0,
});

const BaseContainer = styled("div")({
  minHeight: "202px",
  display: "flex",
  border: "4px dashed var(--accent-300)",
  borderRadius: "16px",
  background: "color-mix(in srgb, var(--background-50) 65%, transparent)",

  [`${HiddenUpload}:focus + &`]: {
    /* Try to get the default outline color */
    outline: ["5px auto -webkit-focus-ring-color", "medium auto currentColor"],
  },
  [`${HiddenUpload}:hover + &`]: {
    background: "color-mix(in srgb, var(--background-100) 50%, transparent)",
  },
});

const NoImageContainer = styled(BaseContainer)({
  gap: "12px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ImageContainer = styled(BaseContainer)({
  height: "fit-content",
  gap: scaleClamped(5, 20, false, 320, 673),
  flexWrap: "wrap",
  justifyContent: "space-around",
  padding: "20px",
  borderBottom: "none",
  borderBottomRightRadius: 0,
  borderBottomLeftRadius: 0,
});

const SupportedFormats = styled("div")({
  textAlign: "center",
  padding: "0 24px",
  color: "var(--gray-600)",
});

const ScanButton = styled(Button)({
  color: "var(--text-50)",
  height: `${35 / 16}rem`,
  fontSize: `${20 / 16}rem`,
  borderRadius: "16px",
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,

  transition: "background .25s",
  "&:hover:not(:disabled)": {
    background: "var(--gray-700)",
  },
});

export default ImageUpload;
