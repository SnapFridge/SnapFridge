import { styled } from "@pigment-css/react";
import {
  useId,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
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

type Props<T extends keyof Input2ValueMap> = {
  label: ReactNode;
  onChange: (newValue: Input2ValueMap[T]) => void | Promise<void>;
  type: T;
} & Omit<ComponentPropsWithoutRef<"input">, "onChange" | "type">;

function Input<T extends keyof Input2ValueMap>({
  label,
  onChange,
  type = "text" as T,
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
  color: "var(--gray-700)",
});

function hasValueBox(type: HTMLInputTypeAttribute): boolean {
  for (const t of [
    "text",
    "password",
    "number",
    "email",
    // "search",
    // "tel",
    // "url",
    //  "date",
    //  "datetime-local",
    //  "month",
    //  "time",
    //  "week",
    //  "color",
  ]) {
    if (t === type) {
      return true;
    }
  }
  return false;
}

export const InputElement = styled("input")({
  width: "100%",
  border: "2px solid var(--accent-500)",
  variants: [
    {
      props: ({ type }) => hasValueBox(type!),
      style: {
        background: "var(--accent-100)",
        borderRadius: "8px",
        height: `${38 / 16}rem`,
        color: "var(--text-950)",
        padding: "5px 8px",
      },
    },
    {
      props: ({ type }) => type === "checkbox" || type === "radio",
      style: {
        background: "var(--accent-100)",
        width: `${20 / 16}rem`,
        height: `${20 / 16}rem`,
        "&:disabled": {
          opacity: 0.75,
        },
        "&:checked": {
          background: "var(--accent-500)",
          boxShadow: "0 0 0 3px var(--accent-100) inset",
        },
      },
    },
    {
      props: { type: "radio" },
      style: {
        borderRadius: "50%",
      },
    },
  ],
});

export default Input;
