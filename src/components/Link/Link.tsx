import * as React from "react";
import { styled } from "@pigment-css/react";

interface Props extends React.ComponentProps<"a"> {
  href: string;
  hideDecoration?: boolean;
}

function Link({ href, children, ...delegated }: Props) {
  return (
    <StyledLink href={href} {...delegated}>
      {children}
    </StyledLink>
  );
}

const StyledLink = styled("a")({
  color: "var(--text-950)",
  textDecoration: "none",
  fontSize: `${18 / 16}rem`,
  
  "&:hover": {
    textDecoration: "revert",
  },
});

export default Link;
