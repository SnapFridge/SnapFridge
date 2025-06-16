import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { styled } from "@pigment-css/react";

type ButtonProps<C extends ElementType> = {
  as?: C;
  styling?: "primary" | "secondary";
} & Omit<ComponentPropsWithoutRef<C>, "as">;
// The default link has an "as" attribute, overriding that with our "as"

function Button<C extends ElementType = "button">({
  styling,
  children,
  ...delegated
}: ButtonProps<C>) {
  return (
    <StyledButton styling={styling} {...delegated}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled("button")<{ styling: string | undefined }>({
  textAlign: "center",
  textDecoration: "none",
  fontSize: `${16 / 16}rem`,
  padding: `${10 / 16}rem`,
  borderRadius: "8px",
  border: "none",

  "&:hover": {
    backgroundColor: "var(--background-hover)",
  },

  variants: [
    {
      props: { styling: "primary" },
      style: {
        background: "var(--primary-500)",
        color: "#000000",
        ["--background-hover" as string]: "var(--primary-600)",
      },
    },
    {
      props: { styling: "secondary" },
      style: {
        background: "var(--secondary-300)",
        color: "var(--text-950)",
        ["--background-hover" as string]: "var(--secondary-400)",
      },
    },
  ],
});

export default Button;
