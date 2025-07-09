"use client";

import { styled } from "@pigment-css/react";
import { type Variants, useAnimate, AnimatePresence } from "motion/react";
import { button, li, div } from "motion/react-client";
import { useState, useEffect } from "react";
import { type Ingredient } from "@components/Global";
import Icon from "@components/Icon";
import { useInputState } from "../InputProvider";

type Props = {
  ingredient: Ingredient;
};

function IngredientBox({ ingredient }: Props) {
  const { dispatch } = useInputState();

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
        {isActive && (
          <ActionContainer
            initial="initial"
            animate="enter"
            exit="exit"
            variants={ContainerVariants}
          >
            <ActionBtn
              variants={DeleteVariants}
              whileHover="hover"
              onClick={() => {
                dispatch({ type: "removeIngredient", ingredient });
              }}
            >
              <Icon
                icon="Trash2"
                color="var(--warn-500)"
                description={`Delete ${ingredient.name}`}
              />
            </ActionBtn>
            <ActionBtn variants={DeleteVariants} whileHover="hover">
              <Icon
                icon="PencilLine"
                color="var(--gray-950)"
                description={`Edit ${ingredient.name}`}
              />
            </ActionBtn>
          </ActionContainer>
        )}
      </AnimatePresence>
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

const Wrapper = styled(li)({
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

const HiddenButton = styled("button")({
  width: "100%",
  height: "100%",
  position: "absolute",
  opacity: 0,
});

const IngredientElement = styled(div)({
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

const ActionBtn = styled(button)({
  background: "transparent",
  padding: "4px",
  border: 0,
});

const ContainerVariants: Variants = {
  initial: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
};
const DeleteVariants: Variants = {
  hover: {
    y: -5,
  },
};

// Used so it's easier to click the buttons
const ActionContainer = styled(div)({
  zIndex: 1,
  position: "absolute",
  top: "-42px",
  margin: "auto",
  left: 0,
  right: 0,
  width: "fit-content",
  height: "fit-content",
  background: "var(--gray-200)",
  borderRadius: "4px",
  boxShadow: "var(--shadow)",
});

export default IngredientBox;
