import * as React from "react";
import { styled } from "@pigment-css/react";

export default function Link({ children, ...delegated }: React.ComponentProps<"a">) {
  return (
    <StyledLink {...delegated}>
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
