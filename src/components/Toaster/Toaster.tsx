"use client";

import { useContext } from "react";
import AppToast from "./Toast";
import { Toast } from "radix-ui";
import { styled } from "@pigment-css/react";
import { ON_MOBILE } from "@components/Global";
import { ToastContext } from "@components/ToastProvider";

function Toaster() {
  const { toasts, removeToast } = useContext(ToastContext)!;

  return (
    <ToastContainer>
      {toasts.map(({ id, title, description, variant }) => (
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
      <Toast.Viewport />
    </ToastContainer>
  );
}

const ToastContainer = styled("div")({
  display: "flex",
  flexDirection: "column-reverse",
  gap: "8px",
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

export default Toaster;
