"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import FridgeImage from "./FridgeImage";
import { scaleClamped } from "@components/Global";
import { BarLoader } from "react-spinners";
import Button from "@components/Button";
import { AnimatePresence, type Variants, motion } from "motion/react";
import heic2URL from "./HeicDCode";
import { useInputState } from "../InputProvider";
import useToast from "@components/ToastProvider/UseToast";
import VisuallyHidden from "@components/VisuallyHidden";
import Input from "@components/Input";
import getIngredientWriter from "./IngredientWriter";

function FileUpload() {
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  const { state, dispatch } = useInputState();
  const { files } = state;
  const worker = useRef<Worker>(null);
  const { addWarn, addError } = useToast();
  const [pending, setPending] = useState(false);

  async function getWorker() {
    if (!worker.current) {
      worker.current = new Worker(new URL("HeicDCode.worker.ts", import.meta.url), {
        type: "module",
      });
      await new Promise<void>((resolve) => {
        worker.current!.addEventListener("message", () => resolve(), {
          once: true,
        });
      });
    }
    return worker.current;
  }

  useEffect(() => {
    return () => {
      worker.current?.terminate();
    };
  }, []);

  async function handleFiles(files: FileList) {
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
        case "image/heic":
        case "image/heif": {
          const heicData = new Uint8Array(await file.arrayBuffer());
          const url = await heic2URL(await getWorker(), heicData);
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
      <AnimatePresence>
        <EmptyTitle className={imgURLs.length > 0 ? "notEmpty" : undefined}>
          Upload images below to get started!
        </EmptyTitle>
      </AnimatePresence>

      <Wrapper layout onSubmit={(e) => void fetchGemini(e)}>
        <FileUploader>
          <HiddenUpload
            label={<VisuallyHidden>Upload image(s)</VisuallyHidden>}
            title="Upload image(s)"
            onChange={handleFiles}
            type="file"
            multiple
            accept=".png,.jpg,.webp,.heic,.heif"
            name="fileInput"
          />
          {imgURLs.length < 1 ? (
            <NoImageContainer>
              <Icon icon="ImageUp" size={36} />
              <SupportedFormats>
                Supported formats: png, jpg, webp, heic, heif
              </SupportedFormats>
            </NoImageContainer>
          ) : (
            <ImageContainer as="ul">
              {imgURLs.map((url) => (
                <FridgeImage key={url} src={url} deleteImage={deleteImage} />
              ))}
            </ImageContainer>
          )}
        </FileUploader>

        <AnimatePresence>
          {imgURLs.length > 0 && (
            <ScanButton
              type="submit"
              key="scan-button"
              layout
              variant="primary"
              as={motion.button}
              variants={ScanButtonVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              Scan
            </ScanButton>
          )}
        </AnimatePresence>
      </Wrapper>
      <BarLoader color="var(--text-950)" cssOverride={Fetching} loading={pending} />
    </>
  );
}
const Fetching: CSSProperties = {
  width: "min(100%, 576px)",
};

const EmptyTitle = styled("h1")({
  textAlign: "center",
  width: "100%",
  margin: "0 0 24px",
  fontSize: scaleClamped(22, 30),

  transition: "opacity .25s, visibility 0s",
  "&.notEmpty": {
    transition: "opacity .25s, visibility 0s .25s",
    opacity: 0,
    visibility: "hidden",
  },
});

const Wrapper = styled(motion.form)({
  width: "min(100%, 576px)",
});

const FileUploader = styled("div")({
  position: "relative",
  width: "100%",
});

const HiddenUpload = styled(Input)({
  position: "absolute",
  width: "100%",
  height: "100%",
  opacity: 0,
});

const BaseContainer = styled("div")({
  width: "100%",
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
  minHeight: "220px",
  gap: "12px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ImageContainer = styled(BaseContainer)({
  height: "fit-content",
  gap: scaleClamped(7, 20, false, 320, 673),
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  padding: "20px",
  borderBottom: "none",
  borderBottomRightRadius: 0,
  borderBottomLeftRadius: 0,
});

const SupportedFormats = styled("div")({
  textAlign: "center",
  width: "100%",
  padding: "0 24px",
  color: "var(--gray-600)",
});

const ScanButton = styled(Button)({
  width: "100%",
  height: `${40 / 16}rem`,
  fontSize: `${20 / 16}rem`,
  borderRadius: "16px",
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
});

const ScanButtonVariants: Variants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: {
      duration: 0.3,
      default: {
        ease: "easeOut",
      },
    },
  },
};

export default FileUpload;
