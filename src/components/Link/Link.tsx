import * as React from 'react';
import { styled } from "@pigment-css/react";

interface Props extends React.PropsWithChildren {
  href: string;
  showDecoration?: boolean;
  delegated: React.ComponentProps<"a">
}

function Link({ href, children, showDecoration = true, ...delegated }: Props) {
  return (
    <StyledLink href={href} style={{ "--behavior": showDecoration ? "revert" : "none" }} {...delegated}>
      {children}
    </StyledLink>
  )
}

const StyledLink = styled("a")({
  color: "var(--text-950)",
  textDecoration: "none",
  fontSize: `${18 / 16}rem`,

  "&:hover": {
    textDecoration: "var(--behavior)",
  }
});

export default Link;
