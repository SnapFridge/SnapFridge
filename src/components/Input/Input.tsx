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

type Props<T extends keyof Input2ValueMap> = {
  label: ReactNode;
  onChange: (newValue: Input2ValueMap[T]) => void | Promise<void>;
  type: T;
} & Omit<ComponentProps<"input">, "onChange" | "type">;

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
  color: "var(--gray-500)",
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
  border: "1px solid var(--accent-500)",
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
        WebkitAppearance: "none",
        appearance: "none",
        background: "var(--accent-100)",
        width: `${18 / 16}rem`,
        height: `${18 / 16}rem`,
      },
    },
    {
      props: { type: "checkbox" },
      style: {
        "&:checked": {
          backgroundColor: "var(--accent-300)",
          backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCA2IDkgMTdsLTUtNSIvPjwvc3ZnPg==")`,
        },
      },
    },
    {
      props: { type: "radio" },
      style: {
        borderRadius: "50%",
        "&:checked": {
          backgroundImage: "ci",
        },
      },
    },
  ],
});

export default Input;
