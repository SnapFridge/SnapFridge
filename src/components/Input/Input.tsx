import { styled } from "@pigment-css/react";
import {
  useId,
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
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <InputElement
        id={id}
        onChange={(e) => {
          switch (type) {
            case "checkbox":
            case "radio":
              void onChange(e.target.checked);
              break;
            case "file": {
              const files = e.target.files!;
              if (files.length > 0) {
                void onChange(files);
                e.target.value = "";
              }
              break;
            }
            default:
              void onChange(e.target.value);
          }
        }}
        type={type}
        {...delegated}
      />
    </div>
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
  paddingLeft: "8px",
});

export default Input;
