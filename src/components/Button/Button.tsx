import { styled } from "@pigment-css/react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type Variant = "primary" | "secondary" | "icon";
type ButtonProps<C extends ElementType> = {
  as?: C;
  variant?: Variant;
} & Omit<ComponentPropsWithoutRef<C>, "as">;
// The default link has an "as" attribute, overriding that with our "as"

function Button<C extends ElementType = "button">({
  variant,
  children,
  ...delegated
}: ButtonProps<C>) {
  return (
    <StyledButton variant={variant} {...delegated}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled("button")<{ variant: Variant | undefined }>({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  fontSize: `${16 / 16}rem`,
  padding: `10px`,
  borderRadius: "8px",
  border: 0,
  color: "var(--text-950)",
  // Hidden dependency relied upon by the trickery we use later
  position: "relative",

  "&:hover:not(:disabled)": {
    background: "var(--background-hover)",
  },

  "&:disabled": {
    opacity: 0.7,
  },

  // Apple recommends a minimum 44x44 tapping size
  // Do a little trickery (thanks Kevin)
  "&:after": {
    inset: "min(0, calc((100% - var(--click-target-minimum, 100%)) / 2))",
    content: "",
    position: "absolute",
  },

  variants: [
    {
      props: { variant: "primary" },
      style: {
        background: "var(--primary-500)",
        color: "#000000",
        ["--background-hover" as string]: "var(--primary-600)",
      },
    },
    {
      props: { variant: "secondary" },
      style: {
        background: "var(--secondary-300)",
        ["--background-hover" as string]: "var(--secondary-400)",
      },
    },
    {
      props: { variant: "icon" },
      style: {
        background: "none",
        ["--background-hover" as string]: "var(--background-100)",
      },
    },
  ],
});

export default Button;
