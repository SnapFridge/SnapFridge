"use client";

import { styled, css } from "@pigment-css/react";
import Icon from "@components/Icon";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import FridgeImage from "./FridgeImage";
import { scaleClamped } from "@components/Global";
import Button from "@components/Button";
import { motion, AnimatePresence, type Variants } from "motion/react";
import heic2URL from "./HeicDCode";
import type { InputDispatch } from "../InputSection/inputReducer.helper";

type FileUploadData = {
  formAction: () => void;
  dispatch: InputDispatch;
};

function FileUpload({ formAction, dispatch }: FileUploadData) {
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  const [invalidFilesWarning, setInvalidFilesWarning] = useState(false);
  const worker = useRef<Worker>(undefined as unknown as Worker);

  // Initialize a worker
  useEffect(() => {
    worker.current = new Worker(new URL("HeicDCode.worker.ts", import.meta.url), {
      type: "module"
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
      setInvalidFilesWarning(true);
      setTimeout(() => {
        setInvalidFilesWarning(false);
      }, 3000);
    }

    dispatch({ type: "add-files", files: validUsrFiles });

    // Reset so that you don"t have invisible imgURLs
    event.target.value = "";
    const nextImages = [...imgURLs, ...newImages];
    setImgURLs(nextImages);
  }

  function removeImage(imgURL: string) {
    // Find the index of the image, then remove the same index from files and imgURLs
    const index = imgURLs.findIndex((url) => imgURL === url);

    dispatch({ type: "remove-file", index });
    setImgURLs(imgURLs.filter((_, idx) => idx !== index));
  }

  return (
    <>
      <Wrapper layout action={formAction}>
        <FileUploader>
          <HiddenUpload
            onChange={(e) => handleFiles(e)}
            type="file"
            multiple
            accept=".png,.jpg,.webp,.heic,.heif"
            name="fileInput"
          />
          <VisibleContent filled={imgURLs.length > 0}>
            {imgURLs.length === 0 && (
              <>
                <Icon icon="FilePlus" size={36} description="Upload images" />
                <SupportedFormats>
                  Supported formats: png, jpg, webp, heic, heif
                </SupportedFormats>
              </>
            )}
            {imgURLs.map((url) => (
              <FridgeImage key={url} src={url} removeImage={removeImage} />
            ))}
          </VisibleContent>
        </FileUploader>

        <AnimatePresence>
          {imgURLs.length > 0 && (
            <Button
              key="scan-button"
              layout
              className={ScanButton}
              variant="primary"
              as={motion.button}
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
      {invalidFilesWarning ? (
        <InvalidFilesWarning>
          Invalid files were uploaded, they"ve been ignored.
        </InvalidFilesWarning>
      ) : undefined}
    </>
  );
}

const Wrapper = styled(motion.form)({
  width: "100%",
  maxWidth: "576px"
});

const FileUploader = styled("div")({
  position: "relative",
  width: "100%"
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
  appearance: "none"
});

const VisibleContent = styled("div")<{ filled: boolean }>({
  width: "100%",
  height: "fit-content",
  minHeight: scaleClamped(115, 205, false, 320, 673),
  ["--gap" as string]: scaleClamped(7, 20, false, 320, 673),
  gap: "var(--gap)",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "center",
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
      "5px auto -webkit-focus-ring-color"
    ]
  },
  [`${HiddenUpload}:hover + &`]: {
    background: "color-mix(in srgb, var(--background-100) 50%, transparent)"
  },

  variants: [
    {
      props: { filled: true },
      style: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        minHeight: 0,
        borderBottom: "none",
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
      }
    }
  ]
});

const SupportedFormats = styled("div")({
  textAlign: "center",
  color: "var(--text-950)",
  opacity: 0.55
});

const ScanButton = css({
  width: "100%",
  height: `${40 / 16}rem`,
  fontSize: `${20 / 16}rem`,
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
  padding: 0
});

const ScanButtonVariants: Variants = {
  initial: {
    opacity: 0,
    y: -50
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: {
      duration: 0.3,
      default: {
        ease: "easeOut"
      }
    }
  }
};

const InvalidFilesWarning = styled("p")({
  textAlign: "center",
  color: "var(--warn-500)"
});
export default FileUpload;
