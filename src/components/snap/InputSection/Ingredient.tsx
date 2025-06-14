"use client";

import { styled } from "@pigment-css/react";
import { motion, type Variants, useAnimate } from "motion/react";
import { useState, useEffect } from "react";


interface Ingredient {
  name: string,
  quantity: number,
  measurement: string,
}

interface Props {
  ingredientInfo: Ingredient,
}

function Ingredient({ ingredientInfo }: Props) {
  const [isActive, setActive] = useState(false);
  const [scope, animate] = useAnimate();
  
  useEffect(() => {
    void (async () => {
      await animate(scope.current, 
        isActive ? {
          y: -5,
        } :
        {
          y: 0,
        }
      );
    })();
  }, [isActive]);

  function handleHoverEnter() {
    setActive(true);
  }

  function handleHoverLeave() {
    setActive(false);
  }

  function handleClick() {
    setActive(!isActive)
  }

  return (
    <IngredientElement
      variants={IngredientVariants}
      initial="initial"
      animate="enter"

      // desktop
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}

      // mobile
      onClick={handleClick}

      ref={scope}
    >
      <IngredientName>{ingredientInfo.name}</IngredientName>
      <p>{ingredientInfo.quantity} {ingredientInfo.measurement}</p>
    </IngredientElement>
  )
}

const IngredientVariants: Variants = {
  "initial": {
    y: 10,
    opacity: 0,
  },
  "enter": {
    y: 0,
    opacity: 1,
  },
}

const IngredientElement = styled(motion.li)({
  display: "flex",
  gap: "8px",
  backgroundColor: "var(--accent-200)",
  padding: "6px 12px",
  borderRadius: "999px",
  height: "38px",

  width: "fit-content",
  border: "2px solid var(--accent-400)",
  boxShadow: "var(--shadow)",
});

const IngredientName = styled('p')({
  maxWidth: '150px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export default Ingredient;
