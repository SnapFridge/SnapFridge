"use client";

import { styled } from "@pigment-css/react";
import Button from "@components/Button";
import Icon, { type IconType } from "@components/Icon";
import { type ComponentProps } from "react";

type CustomProps = {
  variant: "google" | "github" | "anon";
};
type Props = ComponentProps<"button"> & CustomProps;

export default function OAuthLoginCards({ variant, ...delegated }: Props) {
  let iconName: IconType;
  let text: string;

  switch (variant) {
    case "google":
      iconName = "Google";
      text = "With Google";
      break;
    case "github":
      iconName = "Github";
      text = "With GitHub";
      break;
    case "anon":
      iconName = "UserRound";
      text = "Anonymously";
      break;
  }

  return (
    <CardButton {...delegated}>
      Sign In {text}
      <Icon icon={iconName} size={36} />
    </CardButton>
  );
}

const CardButton = styled(Button)({
  width: "300px",
  backgroundColor: "transparent",
  border: "2px solid var(--gray-300)",
  fontSize: `${18 / 16}rem`,
  fontWeight: "bold",
  gap: "12px",
  boxShadow: "var(--shadow)",

  "&:hover:not(:disabled)": {
    backgroundColor: "var(--background-50)",
  },
});
