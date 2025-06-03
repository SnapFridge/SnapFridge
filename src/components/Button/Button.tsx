import * as React from "react";
import { styled } from "@pigment-css/react";

interface Props extends React.ComponentProps<"button"> {
  styling: keyof typeof STYLES;
}

const STYLES = {
  primary: {
    "--background": "var(--primary-500)",
    "--color": "#000000",
    "--background-hover": "var(--primary-600)",
  },
  secondary: {
    "--background": "var(--secondary-300)",
    "--color": "var(--text-950)",
    "--background-hover": "var(--secondary-400)",
  },
};

function Button({ styling, children, style, ...delegated }: Props) {
  const buttonStyle = STYLES[styling] ?? {};
  const actualStyle = {
    ...buttonStyle,
    ...style,
  };

  return (
    <StyledButton style={actualStyle} {...delegated}>
      {children}
    </StyledButton>
  );
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
