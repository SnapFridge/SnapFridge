import * as React from 'react';
import { styled } from "@pigment-css/react";

function Link({ href, children }) {
  return (
    <StyledLink href={href}>
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
