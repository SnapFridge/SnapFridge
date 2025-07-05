import { type ComponentProps } from "react";
import NextLink from "next/link";
import { styled } from "@pigment-css/react";

function Link({ children, ...delegated }: ComponentProps<typeof NextLink>) {
  return <StyledLink {...delegated}>{children}</StyledLink>;
}

const StyledLink = styled(NextLink)({
  color: "var(--text-950)",
  textDecoration: "none",
  fontSize: `${16 / 16}rem`,

  "&:hover": {
    textDecoration: "revert",
  },
});

export default Link;
