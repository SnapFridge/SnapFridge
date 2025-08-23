"use client";

import { useToast } from "@components/ToastProvider";
import { styled } from "@pigment-css/react";
import { ON_MOBILE } from "@utils";
import { AnimatePresence, motion } from "motion/react";
import { Toast } from "radix-ui";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AppToast from "./Toast";

function Toaster() {
  const [isClient, setIsClient] = useState(false);
  const { toasts } = useToast();

  const visibleToasts = toasts.slice(0, 5);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  return createPortal(
    <ToastContainer>
      <AnimatePresence mode="popLayout">
        {visibleToasts.map(({ id, title, description, variant }) => (
          <AppToast key={id} id={id} title={title} variant={variant}>
            {description}
          </AppToast>
        ))}
      </AnimatePresence>
      <Toast.Viewport asChild>
        <Viewport />
      </Toast.Viewport>
    </ToastContainer>,
    document.body
  );
}

const ToastContainer = styled("div")({
  zIndex: 2,
  position: "fixed",
  right: 0,
  bottom: 0,
  padding: "0 16px 16px 0",
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
  flexDirection: "column",
  gap: "8px",
});

export default Toaster;
