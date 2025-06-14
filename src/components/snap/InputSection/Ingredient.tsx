"use client";

import { styled } from "@pigment-css/react";
import { motion, type Variants, useAnimate, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Icon from "@components/Icon";

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
      <AnimatePresence>    
        {
          isActive ? (
          <ActionContainer> 
            <DeleteContainer
              variants={DeleteVariants}
              initial="initial"
              animate="enter"
              whileHover="hover"
              exit="exit"
            >
              <Icon icon="Trash2" size={24} color="#fda920" />            
            </DeleteContainer>         
            <EditContainer
              variants={EditVariants}
              initial="initial"
              animate="enter"
              whileHover="hover"
              exit="exit"
            >
              <Icon icon="PencilLine" size={24} color="white" />
            </EditContainer>
          </ActionContainer>
        ) :
          null
        }
      </AnimatePresence>
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

  position: "relative"
});

const IngredientName = styled('p')({
  maxWidth: '150px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});


const DeleteContainer = styled(motion.div)({
  position: "absolute",
  zIndex: 1,
  top: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: "4px",
  borderRadius: "4px",
});

const EditContainer = styled(motion.div)({
  position: "absolute",
  zIndex: 1,
  top: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: "4px",
  borderRadius: "4px",
});

const DeleteVariants: Variants = {
  "initial": {
    opacity: 0,
  },
  "enter": {
    opacity: 1,
  },
  "hover": {
    y: -5,
  },
  "exit": {
    opacity: 0,
  }
}

const EditVariants: Variants = {
  "initial": {
    x: 32,
    opacity: 0,
  },
  "enter": {
    y: 0,
    x: 32,
    opacity: 1,
  },
  "hover": {
    y: -5,
  },
  "exit": {
    opacity: 0,
  }
}

// Used so it's easier to click the buttons
const ActionContainer = styled('div')({
  zIndex: 1,
  position: "absolute",
  top: "-36px",
  width: "64px",
  height: "36px",
});

export default Ingredient;
