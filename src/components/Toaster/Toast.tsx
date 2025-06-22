"use client";

import { useState } from "react";
import { Toast } from "radix-ui";
import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import VisuallyHidden from "@components/VisuallyHidden";

interface Props extends React.PropsWithChildren {
  id: string;
  variant: "success" | "warn" | "error" | "info";
  title: React.ReactNode;
  removeToast: (id: string) => void;
}

function AppToast({ id, variant, title, removeToast, children }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <BaseToast
      variant={variant}
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          removeToast(id);
        }
      }}
    >
      <Toast.Title>{title}</Toast.Title>
      <Toast.Description>{children}</Toast.Description>
      <Toast.Close
        onClick={() => {
          setOpen(false);
        }}
      >
        <VisuallyHidden>Close</VisuallyHidden>
        <Icon icon="X" color="var(--warning)" />
      </Toast.Close>
    </BaseToast>
  );
}

const BaseToast = styled(Toast.Root)<{
  variant: "success" | "warn" | "error" | "info";
}>({
  width: "400px",
  minHeight: "80px",
  height: "fit-content",
  maxHeight: "200px",
  overflowY: "auto",
  borderRadius: "16px",
  padding: "12px 16px",

  variants: [
    {
      props: { variant: "success" },
      style: {
        background: "var(--success-50)",
      },
    },
    {
      props: { variant: "warn" },
      style: {
        background: "var(--warn-50)",
      },
    },
    {
      props: { variant: "error" },
      style: {
        background: "var(--error-50)",
      },
    },
  ],
});

export default AppToast;
