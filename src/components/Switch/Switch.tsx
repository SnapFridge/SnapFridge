import { Switch as RadixSwitch } from "radix-ui";
import { styled } from "@pigment-css/react";
import { useId } from "react";

interface Props extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  labelText?: string;
}

export default function Switch({ labelText, ...delegated }: Props) {
  const id = useId();

  return (
    <Container>
      {labelText && <Label htmlFor={id}>{labelText}</Label>}
      <SwitchRoot id={id} {...delegated}>
        <SwitchThumb />
      </SwitchRoot>
    </Container>
  );
}

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Label = styled("label")({
  paddingRight: 15,
});

const SwitchRoot = styled(RadixSwitch.Root)({
  width: "42px",
  height: "25px",
  backgroundColor: "var(--secondary-300)",
  borderRadius: "9999px",
  position: "relative",
  boxShadow: "0 2px 10px var(--gray-300)",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",

  "&:focus": {
    boxShadow: "0 0 0 2px var(--secondary-600)",
  },

  '&[data-state="checked"]': {
    backgroundColor: "var(--secondary-500)",
  },

  "&[data-disabled]": {
    backgroundColor: "var(--secondary-200)",
  },
});

const SwitchThumb = styled(RadixSwitch.Thumb)({
  display: "block",
  width: "20px",
  height: "20px",
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: "0 2px 2px var(--gray-300)",
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",

  '&[data-state="checked"]': {
    transform: "translateX(19px)",
  },

  "[data-disabled]": {
    backgroundColor: "var(--gray-500)",
  },
});
