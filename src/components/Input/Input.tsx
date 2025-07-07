import { styled } from "@pigment-css/react";
import { useId, type ComponentProps } from "react";

type Input2ValueMap = {
  checkbox: boolean;
  radio: boolean;

  // Everything else is just a string
  [key: string]: string | boolean;
};

type Props<T extends keyof Input2ValueMap> = {
  label: string;
  onChange: (newValue: Input2ValueMap[T]) => void;
  type: T;
} & Omit<ComponentProps<"input">, "onChange" | "type">;

function Input<T extends keyof Input2ValueMap>({
  label,
  value,
  onChange,
  type,
  ...delegated
}: Props<T>) {
  const id = useId();
  return (
    <>
      <div>
        <Label htmlFor={id}>{label}</Label>
        <InputElement
          id={id}
          value={value}
          onChange={(e) => {
            switch (type) {
              case "checkbox":
              case "radio":
                onChange(e.target.checked);
                break;
              default:
                onChange(e.target.value);
            }
          }}
          {...delegated}
        />
      </div>
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
  paddingLeft: "8px",
});

export default Input;
