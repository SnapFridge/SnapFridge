import { type ComponentPropsWithoutRef } from "react";
import NextLink from "next/link";
import { styled } from "@pigment-css/react";

function Link({ children, ...delegated }: ComponentPropsWithoutRef<typeof NextLink>) {
  return <StyledLink {...delegated}>{children}</StyledLink>;
}

const StyledLink = styled(NextLink)({
  textAlign: "center",
  color: "var(--text-950)",
  textDecoration: "none",
  fontSize: "inherit",

  "&:hover": {
    textDecoration: "revert",
  },
});

export default Link;
