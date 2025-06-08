import { type ComponentProps } from "react";
import { styled } from "@pigment-css/react";
import { scaledClamp } from '@components/Global';

export default function Link({ children, ...delegated }: ComponentProps<"a">) {
  return (
    <StyledLink {...delegated}>
      {children}
    </StyledLink>
  );
}

const StyledLink = styled("a")({
  color: "var(--text-950)",
  textDecoration: "none",
  fontSize: scaledClamp(16, 20),
  
  "&:hover": {
    textDecoration: "revert",
  },
});
