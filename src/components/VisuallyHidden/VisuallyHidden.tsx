import { styled } from "@pigment-css/react";
import { type ComponentPropsWithoutRef } from "react";

function VisuallyHidden({ children, ...delegated }: ComponentPropsWithoutRef<"span">) {
  return <Hidden {...delegated}>{children}</Hidden>;
}

const Hidden = styled("span")({
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
});

export default VisuallyHidden;
