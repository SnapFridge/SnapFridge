"use client";

import { ToggleGroup as RadixToggleGroup } from "radix-ui";
import { styled } from "@pigment-css/react";
import { ON_DESKTOP, ON_MOBILE } from "@utils";

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
        Maximize Used Ingredients (wipe that fridge!)
      </ToggleGroupItem>
      <ToggleGroupItem value="2" aria-label="Minimize">
        Minimize Missing Ingredients
      </ToggleGroupItem>
    </ToggleGroupRoot>
  );
}

const ToggleGroupRoot = styled(RadixToggleGroup.Root)({
  width: "100%",
  maxWidth: "400px",
  height: "fit-content",
  display: "flex",

  [ON_MOBILE]: {
    flexDirection: "column",
    boxShadow: "var(--shadow)",
    border: "1px solid var(--text-950)",
  },
});

const ToggleGroupItem = styled(RadixToggleGroup.Item)({
  padding: "5px",
  flex: "1 1 0",
  display: "flex",
  fontSize: `${16 / 16}rem`,
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",

  [ON_DESKTOP]: {
    boxShadow: "var(--shadow)",
    "&:first-child": {
      borderTopLeftRadius: "150px",
      borderBottomLeftRadius: "150px",
    },

    "&:last-child": {
      borderTopRightRadius: "150px",
      borderBottomRightRadius: "150px",
    },
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
