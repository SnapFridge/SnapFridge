import { styled } from "@pigment-css/react";
import { type ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  name: string;
  suggestions?: string[];
}

function Input({ name, type }: Props) {
  return (
    <>
      <Label htmlFor={name}>{name}</Label>
      <InputElem id={name} type={type}></InputElem>
    </>
  );
}

const Label = styled("label")({});

const InputElem = styled("input")({});
export default Input;
