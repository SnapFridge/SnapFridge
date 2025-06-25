"use client";

import { css, styled } from "@pigment-css/react";
import {
  motion,
  type Variants,
  useAnimate,
} from "motion/react";
import { useState, useEffect } from "react";
import { type Ingredient } from '@components/Global';
import Button from "@components/Button";

type Props = {
  ingredient: Ingredient;
}

function IngredientBox({ ingredient }: Props) {
  const [isActive, setActive] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    void (async () => {
      await animate(
        scope.current,
        isActive
          ? {
              y: -5,
            }
          : {
              y: 0,
            }
      );
    })();
  }, [isActive, animate, scope]);

  function handleHoverEnter() {
    setActive(true);
  }

  function handleHoverLeave() {
    setActive(false);
  }

  function handleClick() {
    setActive(!isActive);
  }

  return (
    <Wrapper onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} layout>
      {/* Ended up using a HiddenButton instead of a ButtonWrapper
      since a ButtonWrapper would encapsulate another button which is bad HTML */}
      <HiddenButton
        onClick={handleClick}
      />
      <IngredientElement
        variants={IngredientVariants}
        initial="initial"
        animate="enter"
        ref={scope}
      >
        <IngredientName>{ingredient.name}</IngredientName>
        <p>
          {ingredient.amount} {ingredient.unit}
        </p>
      </IngredientElement>
    </Wrapper>
  );
}

const Wrapper = styled(motion.li)({
  height: "38px",
  width: "fit-content",
  position: "relative",
  isolation: "isolate",
});

const IngredientVariants: Variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
};

const HiddenButton = styled(Button)({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  margin: "auto",
  opacity: 0,
  appearance: "none",
  zIndex: 2,
});

const IngredientElement = styled(motion.div)({
  display: "flex",
  gap: "8px",
  backgroundColor: "var(--accent-200)",
  padding: "6px 12px",
  borderRadius: "999px",
  height: "100%",

  width: "fit-content",
  border: "2px solid var(--accent-400)",
  boxShadow: "var(--shadow)",

  [`${HiddenButton}:focus + &`]: {
    outline: [
      "medium auto currentColor",
      "medium auto invert",
      "5px auto -webkit-focus-ring-color",
    ],
    outlineOffset: "4px",
  },
});

const IngredientName = styled("p")({
  maxWidth: "150px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export default IngredientBox;
