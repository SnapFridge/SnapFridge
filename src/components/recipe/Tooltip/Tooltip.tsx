"use client";

import { styled } from "@pigment-css/react";
import { Flower, Leaf, Salad, Sprout, Trophy } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Tooltip } from "radix-ui";
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
      <Tooltip.Root open={isOpen} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <Button>
            <Icon aria-hidden color={color} size={36} />
          </Button>
        </Tooltip.Trigger>
        <AnimatePresence>
          {isOpen && (
            <Tooltip.Portal forceMount>
              <Tooltip.Content sideOffset={5} asChild>
                <ContentContainer
                  variants={Variants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  This recipe is {type}!
                  <Arrow />
                </ContentContainer>
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

const Variants: Variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      type: "spring",
    },
  },
};

const Button = styled("button")({
  height: "fit-content",
  width: "fit-content",
  background: "none",
  border: 0,
  padding: 0,
});

const ContentContainer = styled(motion.div)({
  borderRadius: "4px",
  padding: "10px 15px",
  lineHeight: 1,
  fontSize: `${18 / 16}rem`,
  backgroundColor: "white",
  boxShadow: "var(--shadow)",
  color: "black",
  userSelect: "none",
});

const Arrow = styled(Tooltip.Arrow)({
  fill: "white",
});
