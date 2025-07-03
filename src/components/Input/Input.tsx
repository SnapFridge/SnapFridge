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

export function Input<T extends keyof Input2ValueMap>({
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
        <InputElem
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

const Label = styled("label")({
  display: "block",
  width: "100%",
  textAlign: "left",
});

export const InputElem = styled("input")({
  paddingLeft: "8px",
});
