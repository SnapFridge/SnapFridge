"use client";

import { styled, css } from "@pigment-css/react";
import Icon from "@components/Icon";
import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import FridgeImage from "./FridgeImage";
import { scaleClamped } from "@components/Global";
import Button from "@components/Button";
import { AnimatePresence, type Variants } from "motion/react";
import { button, form, ul } from "motion/react-client";
import heic2URL from "./HeicDCode";
import { useInputState } from "../InputProvider";
import useToast from "@components/ToastProvider/UseToast";
import VisuallyHidden from "@components/VisuallyHidden";

type FileUploadData = {
  formAction: () => void;
};

function FileUpload({ formAction }: FileUploadData) {
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  const worker = useRef<Worker>(undefined as unknown as Worker);
  const { addWarn } = useToast();
  const { dispatch } = useInputState();
  const id = useId();

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

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    // Only null when the target is not <input type="file">, but we know it is
    const usrFiles = event.target.files!;
    if (usrFiles.length < 1) {
      return;
    }
    const newImages: string[] = [];
    const validUsrFiles: File[] = [];
    for (const file of usrFiles) {
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
      validUsrFiles.push(file);
    }
    if (validUsrFiles.length < usrFiles.length) {
      addWarn(
        "File Upload Error",
        "Files with unsupported format were uploaded, they've been ignored."
      );
    }

    dispatch({ type: "addFiles", files: validUsrFiles });

    // Reset so that you don"t have invisible imgURLs
    event.target.value = "";
    const nextImages = [...imgURLs, ...newImages];
    setImgURLs(nextImages);
  }

  function removeImage(imgURL: string) {
    // Find the index of the image, then remove the same index from files and imgURLs
    const index = imgURLs.findIndex((url) => imgURL === url);

    dispatch({ type: "removeFile", index });
    setImgURLs(imgURLs.filter((_, idx) => idx !== index));
  }

  return (
    <>
      <Wrapper layout action={formAction}>
        <FileUploader>
          <label htmlFor={id}>
            <VisuallyHidden>Upload image(s)</VisuallyHidden>
          </label>
          <HiddenUpload
            title="Upload image(s)"
            id={id}
            onChange={(e) => handleFiles(e)}
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
            <Button
              key="scan-button"
              layout
              className={ScanButton}
              variant="primary"
              as={button}
              variants={ScanButtonVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              Scan
            </Button>
          )}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(form)({
  width: "100%",
  maxWidth: "576px",
});

const FileUploader = styled("div")({
  position: "relative",
  width: "100%",
});

const HiddenUpload = styled("input")({
  position: "absolute",
  width: "100%",
  height: "100%",
  opacity: 0,
});

const BaseContainer = styled("div")({
  width: "100%",
  display: "flex",
  border: "var(--accent-300) dashed 4px",
  borderRadius: "16px",
  background: "color-mix(in srgb, var(--background-50) 65%, transparent)",

  [`${HiddenUpload}:focus + &`]: {
    /* Try to get the default outline color */
    outline: [
      "medium auto currentColor",
      "medium auto invert",
      "5px auto -webkit-focus-ring-color",
    ],
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
  padding: "20px 20px",
  borderBottom: "none",
  borderBottomRightRadius: 0,
  borderBottomLeftRadius: 0,
});

const SupportedFormats = styled("div")({
  textAlign: "center",
  color: "var(--text-950)",
  opacity: 0.55,
});

const ScanButton = css({
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
