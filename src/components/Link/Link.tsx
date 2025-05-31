import * as React from 'react';
import { styled } from "@pigment-css/react";

interface Props extends React.PropsWithChildren {
  href: string;
  hideDecoration?: boolean;
  delegated: React.ComponentProps<"a">
}

function Link({ href, children, ...delegated }: Props) {
  return (
    <StyledLink href={href} {...delegated}>
      {children}
    </StyledLink>
  )
}

const StyledLink = styled("a")({
  color: "var(--text-950)",
  textDecoration: "none",
  fontSize: `${18 / 16}rem`,

  "&:hover": {
    textDecoration: "revert",
  }
});

export default Link;
