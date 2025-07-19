"use client";

import { Tooltip } from "radix-ui";
import Icon from "@components/Icon";
import { styled } from "@pigment-css/react";
import { motion, type Variants, AnimatePresence } from "motion/react";
import { useState } from "react";
import { type IconType } from "@components/Icon";

type Props = {
  type: "vegan" | "vegetarian" | "sustainable" | "healthy" | "popular";
};

export default function AppTooltip({ type }: Props) {
  const [isOpen, setOpen] = useState(false);

  let iconName: IconType;
  let color: string;

  switch (type) {
    case "vegan":
      iconName = "Leaf";
      color = "#57904B";
      break;
    case "vegetarian":
      iconName = "Sprout";
      color = "#5EC064";
      break;
    case "sustainable":
      iconName = "Flower";
      color = "#D27FE1";
      break;
    case "healthy":
      iconName = "Salad";
      color = "#79EDB3";
      break;
    case "popular":
      iconName = "Trophy";
      color = "#ABC40D";
      break;
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={isOpen} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <Button>
            <Icon icon={iconName} color={color} size={36} />
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
  color: "inherit",
  border: "none",
  padding: "0",
  font: "inherit",
  cursor: "pointer",
  outline: "inherit",
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
