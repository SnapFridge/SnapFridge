import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { styled } from "@pigment-css/react";

type ButtonProps<C extends ElementType> = {
  as?: C;
  styling?: keyof typeof STYLES;
} & Omit<ComponentPropsWithoutRef<C>, "as"> 
  // The default link has an "as" attribute, overriding that with our "as"

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

function Button<C extends ElementType = "button">({
  styling,
  children,
  style,
  ...delegated
}: ButtonProps<C>) {
  const buttonStyle = styling === undefined ? {} : STYLES[styling];
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
  textAlign: "center",
  textDecoration: "none",
  fontSize: "var(--1rem)",
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
