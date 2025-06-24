"use client";

import { useState } from "react";
import { Toast } from "radix-ui";
import { styled } from "@pigment-css/react";
import Icon, { type IconType } from "@components/Icon";
import Button from "@components/Button";

interface Props extends React.PropsWithChildren {
  id: string;
  variant: "success" | "warn" | "error" | "info";
  title: React.ReactNode;
  removeToast: (id: string) => void;
}

function AppToast({ id, variant, title, removeToast, children }: Props) {
  const [open, setOpen] = useState(true);

  let iconName: IconType;
  switch (variant) {
    case "success":
      iconName = "Check";
      break;
    case "warn":
      iconName = "CircleAlert";
      break;
    case "error":
      iconName = "CircleX";
      break;
    default:
      iconName = "Info";
  }

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
      <Icon icon={iconName} />
      <MainContent>
        <Title>{title}</Title>
        <Description>{children}</Description>
        <Toast.Close
          onClick={() => {
            setOpen(false);
          }}
          asChild
        >
          <Close>
            <Icon icon="X" color="var(--warn-500)" description="Close" />
          </Close>
        </Toast.Close>
      </MainContent>
    </BaseToast>
  );
}

const BaseToast = styled(Toast.Root)<{
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
  padding: "12px 16px",
  boxShadow: "var(--shadow)",

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
  gridTemplateAreas: '"title close" "description close"',
  gridTemplateColumns: "auto max-content",
  columnGap: "15px",
  alignItems: "center",
});

const Title = styled(Toast.Title)({
  gridArea: "title",
  marginBottom: "6px",
  color: "var(--text-950)",
  fontSize: `${20 / 16}rem`,
});

const Description = styled(Toast.Description)({
  fontSize: `${16 / 16}rem`,
  color: "var(--text-900)",
});

const Close = styled(Button)({
  gridArea: "close",
  background: "transparent",
});

export default AppToast;
