import { styled } from "@pigment-css/react";
import {
  useId,
  type ChangeEvent,
  type ComponentProps,
  type HTMLInputTypeAttribute,
  type ReactNode,
} from "react";

type Input2ValueMap = {
  checkbox: boolean;
  radio: boolean;
  file: FileList;
} & {
  [K in Exclude<HTMLInputTypeAttribute, "checkbox" | "radio" | "file">]: string;
};

type Props<T extends keyof Input2ValueMap = "text"> = {
  label: ReactNode;
  onChange: (newValue: Input2ValueMap[T]) => void | Promise<void>;
  type: T;
} & Omit<ComponentProps<"input">, "onChange" | "type">;

function Input<T extends keyof Input2ValueMap>({
  label,
  onChange,
  type,
  ...delegated
}: Props<T>) {
  const id = useId();
  function onChangeAdapter(e: ChangeEvent<HTMLInputElement>) {
    const t = e.target;
    switch (type) {
      case "checkbox":
      case "radio":
        void onChange(t.checked as Input2ValueMap[T]);
        break;
      case "file": {
        const files = t.files!;
        if (files.length > 0) {
          void onChange(files as Input2ValueMap[T]);
          t.value = "";
        }
        break;
      }
      default:
        void onChange(t.value as Input2ValueMap[T]);
    }
  }
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <InputElement id={id} onChange={onChangeAdapter} type={type} {...delegated} />
    </>
  );
}

export const Label = styled("label")({
  fontSize: `${16 / 16}rem`,
  display: "block",
  width: "100%",
  textAlign: "left",
  color: "var(--gray-500)",
});

export const InputElement = styled("input")({
  background: "var(--accent-100)",
  border: "1px solid var(--accent-400)",
  borderRadius: "8px",
  height: `${38 / 16}rem`,
  color: "var(--text-950)",
  padding: "5px 8px",
});

export default Input;
