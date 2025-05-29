import { styled } from "@pigment-css/react";

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

function Button(
  { type, children, ...delegated }: {
    type: keyof typeof STYLES;
    children: React.ReactNode;
    delegated?: React.ComponentProps<"button">;
  },
) {
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
