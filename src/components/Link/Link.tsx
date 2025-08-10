import { styled } from "@pigment-css/react";
import NextLink from "next/link";
import { type ComponentPropsWithoutRef } from "react";

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
