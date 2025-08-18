"use client";

import Button from "@components/Button";
import VisuallyHidden from "@components/VisuallyHidden";
import { styled } from "@pigment-css/react";
import { Check, CircleAlert, CircleX, Info, X } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { Toast } from "radix-ui";
import { useState, type PropsWithChildren, type ReactNode } from "react";

type Props = {
  id: string;
  variant: "success" | "warn" | "error" | "info";
  title: ReactNode;
  removeToast: (id: string) => void;
};

function AppToast({
  id,
  variant,
  title,
  removeToast,
  children,
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(true);
  let Icon;
  switch (variant) {
    case "success":
      Icon = Check;
      break;
    case "warn":
      Icon = CircleAlert;
      break;
    case "error":
      Icon = CircleX;
      break;
    default:
      Icon = Info;
  }

  return (
    <Toast.Root
      open={open}
      onOpenChange={(open: boolean) => {
        if (!open) {
          removeToast(id);
        }
      }}
      asChild
      forceMount
    >
      <ContentContainer
        layout
        variant={variant}
        variants={ToastVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
      >
        <Icon aria-hidden />
        <MainContent>
          <Title>{title}</Title>
          {children && <Description>{children}</Description>}
          <Toast.Close
            onClick={() => {
              setOpen(false);
            }}
            asChild
          >
            <Close variant="icon">
              <X color="var(--text-950)" />
              <VisuallyHidden>Dismiss</VisuallyHidden>
            </Close>
          </Toast.Close>
        </MainContent>
      </ContentContainer>
    </Toast.Root>
  );
}

const ToastVariants: Variants = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: "100%",
    opacity: 0,
  },
};

const ContentContainer = styled(motion.li)<{
  variant: "success" | "warn" | "error" | "info";
}>({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  width: "100%",
  minHeight: "80px",
  height: "fit-content",
  maxHeight: "200px",
  overflowY: "auto",
  borderRadius: "16px",
  padding: "16px",
  boxShadow: "var(--shadow)",
  listStyle: "none",

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
    {
      props: { variant: "info" },
      style: {
        background: "var(--background-100)",
      },
    },
  ],
});

const MainContent = styled("div")({
  flex: 1,
  display: "grid",
  gridTemplateAreas: `
    "title close"
    "description close"
  `,
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: "4px 16px",
});

const Title = styled(Toast.Title)({
  gridArea: "title",
  fontWeight: 700,
  fontSize: `${18 / 16}rem`,
});

const Description = styled(Toast.Description)({
  gridArea: "description",
  fontSize: `${16 / 16}rem`,
  color: "var(--text-900)",
});

const Close = styled(Button)({
  borderRadius: "50%",
  gridArea: "close",
  alignSelf: "start",
});

export default AppToast;
