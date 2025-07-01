import { styled } from "@pigment-css/react";
import { useId, type ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  name: string;
  suggestions?: string[];
}

function Input({ name, type, ...delegated }: Props) {
  const id = useId();
  const realId = `${name}-${id}`;

  return (
    <>
      <Label htmlFor={realId}>{name}</Label>
      <InputElem id={realId} type={type} {...delegated}></InputElem>
    </>
  );
}

const Label = styled("label")({});

const InputElem = styled("input")({});
export default Input;
