import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { styled } from "@pigment-css/react";

type ButtonProps<C extends ElementType> = {
  as?: C;
  variant?: "primary" | "secondary" | "icon";
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

const StyledButton = styled("button")<{ variant: string | undefined }>({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  fontSize: "var(--1rem)",
  padding: `${10 / 16}rem`,
  borderRadius: "8px",
  border: "none",
  // Hidden dependency relied upon by the trickery we use later
  position: "relative",

  "&:hover": {
    backgroundColor: "var(--background-hover)",
  },

  // Apple recommends a minimum 44x44 tapping size
  // Do a little trickery (Thank you Kevin)
  "&:after": {
    ["--insent-by" as string]:
      "min(0px, calc((100% - var(--click-target-minimum, 100%)) / 2))",
    content: "",
    position: "absolute",
    top: "var(--inset-by)",
    left: "var(--inset-by)",
    right: "var(--inset-by)",
    bottom: "var(--inset-by)",
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
        color: "var(--text-950)",
        ["--background-hover" as string]: "var(--secondary-400)",
      },
    },
    {
      props: { variant: "icon" },
      style: {
        backgroundColor: "transparent",
        ["--background-hover" as string]: "var(--background-100)",
      },
    },
  ],
});

export default Button;
