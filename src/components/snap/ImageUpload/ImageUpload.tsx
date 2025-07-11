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
  const worker = useRef<Worker>(undefined as unknown as Worker);
  const { addWarn } = useToast();
  const [pending, setPending] = useState(false);

  // Initialize a worker
  useEffect(() => {
    worker.current = new Worker(new URL("HeicDCode.worker.ts", import.meta.url), {
      type: "module",
    });

    return () => {
      worker.current?.terminate();
    };
  }, []);

  // Revoke object urls when this component demounts or URLs change
  useEffect(() => {
    return () => {
      for (const url of imgURLs) {
        URL.revokeObjectURL(url);
      }
    };
  }, [imgURLs]);

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
          if (worker.current) {
            const heicData = new Uint8Array(await file.arrayBuffer());
            const url = await heic2URL(worker.current, heicData);
            newImages.push(url);
            break;
          }
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

  function removeImage(imgURL: string) {
    // Find the index of the image, then remove the same index from files and imgURLs
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
    const res = await fetch("/api/gemini", {
      method: "POST",
      body: body,
    });
    await res
      .body!.pipeThrough(new TextDecoderStream())
      .pipeTo(getIngredientWriter(dispatch));
    setPending(false);
  }

  return (
    <>
      <AnimatePresence>
        {imgURLs.length < 1 ? (
          <EmptyTitle
            layout
            variants={EmptyTitleVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            Upload images below to get started!
          </EmptyTitle>
        ) : null}
      </AnimatePresence>

      <Wrapper layout onSubmit={(e) => void fetchGemini(e)}>
        <FileUploader>
          {/*TODO: Fix hover behavior*/}
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
                <FridgeImage key={url} src={url} removeImage={removeImage} />
              ))}
            </ImageContainer>
          )}
        </FileUploader>

        <AnimatePresence>
          {imgURLs.length > 0 && (
            <ScanButton
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
  width: "100%",
  maxWidth: "576px",
};

const EmptyTitle = styled(motion.h1)({
  margin: "0 0 24px",
});

const EmptyTitleVariants: Variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -10,
    opacity: 0,
  },
};

const Wrapper = styled(motion.form)({
  width: "100%",
  maxWidth: "576px",
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
  color: "var(--text-950)",
  opacity: 0.55,
});

const ScanButton = styled(Button)({
  width: "100%",
  height: `${40 / 16}rem`,
  fontSize: `${20 / 16}rem`,
  borderRadius: "16px",
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
  padding: 0,
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
