"use client";

import { css, styled } from "@pigment-css/react";
import {
  motion,
  type Variants,
  useAnimate,
  AnimatePresence,
} from "motion/react";
import { useState, useEffect } from "react";
import { type Ingredient } from '@components/Global';
import Icon from "@components/Icon";
import Button from "@components/Button";

type Props = {
  ingredientInfo: Ingredient;
  removeIngredient: (arg: string) => void;
}

function IngredientBox({ ingredientInfo, removeIngredient }: Props) {
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
        // mobile
        onClick={handleClick}
      />
      <AnimatePresence>
        {isActive ? (
          <ActionContainer>
            <Button
              className={DeleteContainer}
              as={motion.button}
              variants={DeleteVariants}
              initial="initial"
              animate="enter"
              whileHover="hover"
              exit="exit"
              onClick={() => {
                removeIngredient(ingredientInfo.name);
              }}
            >
              <Icon icon="Trash2" color="var(--warn-500)" 
                description={`Delete ${ingredientInfo.name}`}/>
            </Button>
            <Button
              className={EditContainer}
              as={motion.button}
              variants={EditVariants}
              initial="initial"
              animate="enter"
              whileHover="hover"
              exit="exit"
            >
              <Icon icon="PencilLine" color="white" 
                description={`Edit ${ingredientInfo.name}`}/>
            </Button>
          </ActionContainer>
        ) : null}
      </AnimatePresence>
      <IngredientElement
        variants={IngredientVariants}
        initial="initial"
        animate="enter"
        ref={scope}
      >
        <IngredientName>{ingredientInfo.name}</IngredientName>
        <p>
          {ingredientInfo.amount} {ingredientInfo.unit}
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

const DeleteContainer = css({
  position: "absolute",
  zIndex: 1,
  top: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: "4px",
  borderRadius: "4px",
  ["--background-hover" as string]: "var(--background-50)",
});

const EditContainer = css({
  position: "absolute",
  zIndex: 1,
  top: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: "4px",
  borderRadius: "4px",
});

const DeleteVariants: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  hover: {
    y: -5,
  },
  exit: {
    opacity: 0,
  },
};

const EditVariants: Variants = {
  initial: {
    x: 32,
    opacity: 0,
  },
  enter: {
    y: 0,
    x: 32,
    opacity: 1,
  },
  hover: {
    y: -5,
  },
  exit: {
    opacity: 0,
  },
};

// Used so it's easier to click the buttons
const ActionContainer = styled("div")({
  zIndex: 1,
  position: "absolute",
  top: "-42px",
  left: 0,
  right: 0,
  margin: "auto",
  width: "64px",
  height: "36px",
});

export default IngredientBox;
