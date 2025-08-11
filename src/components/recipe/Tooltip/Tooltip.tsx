"use client";

import VisuallyHidden from "@components/VisuallyHidden";
import { styled } from "@pigment-css/react";
import { Flower, Leaf, Salad, Sprout, Trophy } from "lucide-react";
import { useId } from "react";
import { Tooltip } from "react-tooltip";

type Props = {
  type: "vegan" | "vegetarian" | "sustainable" | "healthy" | "popular";
};

export default function AppTooltip({ type }: Props) {
  let Icon;
  let color: string;
  const id = useId();

  switch (type) {
    case "vegan":
      Icon = Leaf;
      color = "#57904B";
      break;
    case "vegetarian":
      Icon = Sprout;
      color = "#5EC064";
      break;
    case "sustainable":
      Icon = Flower;
      color = "#D27FE1";
      break;
    case "healthy":
      Icon = Salad;
      color = "#79EDB3";
      break;
    case "popular":
      Icon = Trophy;
      color = "#ABC40D";
      break;
  }

  return (
    <>
      <Button id={id}>
        <Icon size={44} color={color} aria-hidden />
        <VisuallyHidden>This recipe is {type}!</VisuallyHidden>
      </Button>
      <Tooltip
        anchorSelect={"#" + id}
        opacity={1}
        variant="light"
        style={{
          fontSize: `${16 / 16}rem`,
          background: "white",
          color: "black",
          boxShadow: "var(--shadow)",
          padding: "8px",
          borderRadius: "4px",
          lineHeight: 1,
        }}
      >
        This recipe is {type}!
      </Tooltip>
    </>
  );
}

const Button = styled("button")({
  height: "fit-content",
  width: "fit-content",
  background: "none",
});
