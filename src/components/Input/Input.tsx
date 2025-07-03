import { styled } from "@pigment-css/react";
import {
  useId,
  type ChangeEvent,
  type ChangeEventHandler,
  type ComponentProps,
} from "react";
import Autosuggest from "react-autosuggest";

interface Props extends ComponentProps<"input"> {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function Input({ label, value, onChange, ...delegated }: Props) {
  const id = useId();
  return (
    <>
      <div>
        <Label htmlFor={id}>{label}</Label>
        <InputElem id={id} value={value} onChange={onChange} {...delegated}></InputElem>
      </div>
    </>
  );
}

const Label = styled("label")({
  display: "block",
  width: "100%",
  textAlign: "left",
});

const InputElem = styled("input")({});
export { Input };
