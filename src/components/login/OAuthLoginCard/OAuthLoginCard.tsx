"use client";

import { styled } from "@pigment-css/react";
import Button from "@components/Button";
import Icon from "@components/Icon";
import { type ComponentProps } from "react";

type CustomProps = {
  variant: "Google" | "Github";
};
type Props = ComponentProps<"button"> & CustomProps;

export default function OAuthLoginCards({ variant, ...delegated }: Props) {
  return (
    <li style={{ width: "100%" }}>
      <CardButton {...delegated}>
        Sign In With {variant}
        <Icon icon={variant} size={36} />
      </CardButton>
    </li>
  );
}

const CardButton = styled(Button)({
  width: "100%",
  backgroundColor: "transparent",
  border: "2px solid var(--gray-300)",
  fontSize: `${17 / 16}rem`,
  fontWeight: 700,
  gap: "12px",
  boxShadow: "var(--shadow)",

  "&:hover:not(:disabled)": {
    backgroundColor: "var(--background-50)",
  },
});
