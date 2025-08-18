import { styled } from "@pigment-css/react";
import { ON_MOBILE, scaleClamped } from "@utils";
import { type PropsWithChildren } from "react";

function FoodPointer({ children, ...delegated }: PropsWithChildren) {
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
  fontSize: scaleClamped(12, 20),
  marginLeft: "-50%",
  textAlign: "center",
  background: "var(--background-0)",
  borderRadius: "2px",
  padding: "0 2px 1px",
  [ON_MOBILE]: {
    marginLeft: "-75%",
  },
});

const Pointer = styled("div")({
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

export default FoodPointer;
