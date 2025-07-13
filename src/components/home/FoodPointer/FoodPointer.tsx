import { ON_MOBILE } from "@components/Global";
import { styled } from "@pigment-css/react";
import { type PropsWithChildren } from "react";

export default function FoodPointer({ children, ...delegated }: PropsWithChildren) {
  return (
    <Pointer {...delegated}>
      <FitContent>
        <Txt>{children}</Txt>
      </FitContent>
    </Pointer>
  );
}
const FitContent = styled("div")({
  width: "fit-content",
});

const Txt = styled("span")({
  marginLeft: "-50%",
  textAlign: "center",
  background: "var(--background-0)",
  padding: "0 2px 1px",
});

const Pointer = styled("div")({
  fontSize: "var(--1rem)",
  position: "absolute",
  borderStyle: "solid",
  borderColor: "var(--text-950)",
  zIndex: 1,
  borderWidth: "2px 2px 0 0",
  height: "1.5%",
  left: "10px",

  [ON_MOBILE]: {
    borderWidth: "1px 1px 0 0",
  },
});
