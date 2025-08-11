"use client";

import VisuallyHidden from "@components/VisuallyHidden";
import { styled } from "@pigment-css/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Flower, Leaf, Salad, Sprout, Trophy } from "lucide-react";
import { useState } from "react";

type Props = {
  type: "vegan" | "vegetarian" | "sustainable" | "healthy" | "popular";
};

export default function AppTooltip({ type }: Props) {
  const [isOpen, setOpen] = useState(false);
  let Icon;
  let color: string;

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
    <Tooltip.Provider>
      <Tooltip.Root open={isOpen} delayDuration={350} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <Button>
            <Icon aria-hidden color={color} size={36} />
            <VisuallyHidden>This recipe is {type}!</VisuallyHidden>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal forceMount>
          <Tooltip.Content sideOffset={5} asChild>
            <Content className={isOpen ? "open" : undefined}>
              This recipe is {type}!
              <Arrow />
            </Content>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

const Button = styled("button")({
  height: "fit-content",
  width: "fit-content",
  background: "none",
});

const Content = styled("div")({
  borderRadius: "4px",
  padding: "10px 15px",
  lineHeight: 1,
  fontSize: `${18 / 16}rem`,
  backgroundColor: "white",
  boxShadow: "var(--shadow)",
  color: "black",

  opacity: 0,
  visibility: "hidden",
  transition: "opacity .25s, visibility 0s .25s",

  "&.open": {
    transition: "opacity .25s, visibility 0s",
    opacity: 1,
    visibility: "unset",
  },
});

const Arrow = styled(Tooltip.Arrow)({
  fill: "white",
});
