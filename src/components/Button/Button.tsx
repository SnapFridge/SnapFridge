import { styled } from "@pigment-css/react";

const STYLES = {
  primary: {
    "--background": "var(--primary-700)",
    "--color": "var(--text-700)",
  },
  secondary: {
    "--background": "var(--secondary-700)",
    "--color": "var(--text-700)",
  },
};

function Button({ type = "primary", children, ...delegated }) {
  const style = STYLES[type];

  if (!style) {
    throw new Error(`Invalid button type: ${type}`);
  }

  return <StyledButton style={style} {...delegated}>{children}</StyledButton>;
}

const StyledButton = styled("button")({
  fontSize: `${16 / 16}rem`,
  padding: `${14 / 16}rem ${10 / 16}rem`,
  borderRadius: "8px",
  border: "none",
  backgroundColor: "var(--background)",
  color: "var(--color)",
});

export default Button;
