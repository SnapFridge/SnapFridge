"use client";

import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AppToast from "./Toast";
import { Toast } from "radix-ui";
import { styled } from "@pigment-css/react";
import { ON_MOBILE } from "@components/Global";
import { ToastContext } from "@components/ToastProvider";
import { motion } from "motion/react";

function Toaster() {
  const [isClient, setIsClient] = useState(false);
  const { toasts, removeToast } = useContext(ToastContext)!;

  const visibleToasts = toasts.slice(0, 5);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  return createPortal(
    <ToastContainer>
      {visibleToasts.map(({ id, title, description, variant }) => (
        <AppToast
          key={id}
          id={id}
          title={title}
          variant={variant}
          removeToast={removeToast}
        >
          {description}
        </AppToast>
      ))}
      <Toast.Viewport asChild>
        <Viewport layout="position" />
      </Toast.Viewport>
    </ToastContainer>,
    document.body
  );
}

const ToastContainer = styled("div")({
  position: "fixed",
  right: 0,
  bottom: 0,
  paddingRight: "16px",
  paddingBottom: "16px",
  width: "400px",
  height: "fit-content",

  [ON_MOBILE]: {
    width: "100%",
    paddingLeft: "16px",
    left: 0,
    margin: "auto",
    maxHeight: "50vh",
  },
});

const Viewport = styled(motion.ol)({
  display: "flex",
  flexDirection: "column-reverse",
  gap: "8px",
});

export default Toaster;
