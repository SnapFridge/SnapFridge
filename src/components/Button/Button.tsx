import * as React from "react";
import { styled } from "@pigment-css/react";

interface Props extends React.PropsWithChildren {
  type: keyof typeof STYLES;
  delegated: React.ComponentProps<"button">;
}

const STYLES = {
  primary: {
    "--background": "var(--primary-500)",
    "--color": "#000000",
    "--background-hover": "var(--primary-600)",
  },
  secondary: {
    "--background": "var(--secondary-500)",
    "--color": "var(--text-950)",
  },
};

function Button({ type, children, ...delegated }: Props) {
  const style = STYLES[type] ?? {};

  return <StyledButton style={style} {...delegated}>{children}</StyledButton>;
}

const StyledButton = styled("button")({
  fontSize: `${16 / 16}rem`,
  padding: `${10 / 16}rem`,
  borderRadius: "8px",
  border: "none",
  backgroundColor: "var(--background)",
  color: "var(--color)",

  "&:hover": {
    backgroundColor: "var(--background-hover)",
  },
});

export default Button;
