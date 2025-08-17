import { styled } from "@pigment-css/react";
import { scaleClamped } from "@utils";
import { Switch } from "radix-ui";
import { useId, type ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<typeof Switch.Root> {
  label: string;
}

function AppSwitch({ label, ...delegated }: Props) {
  const id = useId();

  return (
    <Container>
      <label htmlFor={id}>{label}</label>
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

const SwitchRoot = styled(Switch.Root)({
  marginLeft: scaleClamped(5, 18),
  minWidth: "42px",
  height: "25px",
  background: "var(--secondary-300)",
  borderRadius: "calc(infinity * 1px)",
  position: "relative",
  boxShadow: "0 2px 10px var(--gray-300)",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",

  "&:focus": {
    boxShadow: "0 0 0 2px var(--secondary-600)",
  },

  '&[data-state="checked"]': {
    background: "var(--secondary-500)",
  },

  "&[data-disabled]": {
    background: "var(--secondary-200)",
  },
});

const SwitchThumb = styled(Switch.Thumb)({
  display: "block",
  width: "20px",
  height: "20px",
  background: "white",
  borderRadius: "50%",
  boxShadow: "0 2px 2px var(--gray-300)",
  transition: "transform .1s",
  transform: "translateX(2px)",

  '&[data-state="checked"]': {
    transform: "translateX(19px)",
  },

  "&[data-disabled]": {
    background: "var(--gray-500)",
  },
});

export default AppSwitch;
