"use client";

import { styled } from "@pigment-css/react";
import { ON_DESKTOP, ON_MOBILE } from "@utils";
import { ToggleGroup } from "radix-ui";
import type { ComponentPropsWithoutRef } from "react";

type FullToggleGroupRootProps = ComponentPropsWithoutRef<typeof ToggleGroup.Root>;
type ToggleGroupProps = Extract<FullToggleGroupRootProps, { type: "single" }>;

function AppToggleGroup({
  ...delegated
}: Omit<ToggleGroupProps, "type" | "defaultValue">) {
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

const ToggleGroupRoot = styled(ToggleGroup.Root)({
  width: "100%",
  maxWidth: "400px",
  height: "fit-content",
  display: "flex",
  [ON_MOBILE]: {
    flexDirection: "column",
    boxShadow: "var(--shadow)",
    border: "1px solid var(--text-400)",
  },
});

const ToggleGroupItem = styled(ToggleGroup.Item)({
  padding: "5px",
  display: "flex",
  flex: "1 1 0",
  fontSize: `${16 / 16}rem`,
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  [ON_DESKTOP]: {
    boxShadow: "var(--shadow)",
    border: "1px solid var(--text-400)",
    "&:first-child": {
      borderRight: 0,
      borderRadius: "150px 0 0 150px",
    },
    "&:last-child": {
      borderLeft: 0,
      borderRadius: "0 150px 150px 0",
    },
  },
  "&[data-state=on]": {
    background: "var(--background-200)",
    color: "var(--text-950)",
  },
  "&[data-state=off], &[data-disabled]": {
    background: "transparent",
    color: "var(--gray-600)",
  },
});

export default AppToggleGroup;
