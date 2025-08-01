"use client";

import { ToggleGroup as RadixToggleGroup } from "radix-ui";
import { styled } from "@pigment-css/react";

type FullRadixToggleGroupRootProps = React.ComponentPropsWithoutRef<
  typeof RadixToggleGroup.Root
>;
type RadixToggleGroupProps = Extract<FullRadixToggleGroupRootProps, { type: "single" }>;

export default function ToggleGroup({
  ...delegated
}: Omit<RadixToggleGroupProps, "type" | "defaultValue">) {
  return (
    <ToggleGroupRoot type="single" defaultValue="2" {...delegated}>
      <ToggleGroupItem value="1" aria-label="Maximize">
        Maximize Used Ingredients
      </ToggleGroupItem>
      <ToggleGroupItem value="2" aria-label="Minimize">
        Minimize Missing Ingredients
      </ToggleGroupItem>
    </ToggleGroupRoot>
  );
}

const ToggleGroupRoot = styled(RadixToggleGroup.Root)({
  width: "400px",
  height: "80px",
  display: "inline-flex",
  borderRadius: "150px",
  boxShadow: "0 2px 10px var(--gray-300)",
});

const ToggleGroupItem = styled(RadixToggleGroup.Item)({
  width: "200px",
  borderRadius: "150px",
  display: "flex",
  fontSize: `${16 / 16}rem`,
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",

  "&:first-child": {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  "&:last-child": {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  '&[data-state="on"]': {
    backgroundColor: "var(--background-200)",
    color: "var(--text-950)",
  },

  '&[data-state="off"]': {
    backgroundColor: "transparent",
    color: "var(--gray-500)",
  },

  '&[data-state="on"][data-disabled]': {
    backgroundColor: "var(--background-100)",
    color: "var(--gray-500)",
  },
});
