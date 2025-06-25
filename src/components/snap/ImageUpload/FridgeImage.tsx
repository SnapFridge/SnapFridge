"use client";

import {
  motion,
  AnimatePresence,
  useAnimate,
  type Variants,
} from "motion/react";
import Image from "next/image";
import Icon from "@components/Icon";
import React from "react";
import { useState, useEffect } from "react";
import { css, styled } from "@pigment-css/react";

type Props = {
  src: string;
  removeImage: (arg: string) => void;
};

function FridgeImage({ src, removeImage }: Props) {
  const [isActive, setActive] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    void (async () => {
      await animate(
        scope.current,
        isActive
          ? {
              y: -5,
              scale: 1.05,
            }
          : {
              y: 0,
              scale: 1,
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
    <ImageContainer
      // desktop
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
      // mobile
      onClick={handleClick}
      variants={ContainerVariants}
      ref={scope}
      initial="initial"
      animate="enterAnim"
      layout
    >
      <AnimatePresence initial={false}>
        {isActive ? (
          <DeleteContainer
            onClick={() => {
              removeImage(src);
            }}
            variants={DeleteVariants}
            whileHover="hover"
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Icon icon="Trash2" color="var(--warn-500)" />
          </DeleteContainer>
        ) : undefined}
      </AnimatePresence>
      <Image className={FridgeImg} width={150} height={150} src={src} alt="" />
    </ImageContainer>
  );
}

const ContainerVariants: Variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  enterAnim: {
    y: 0,
    opacity: 1,
  },
};

const ImageContainer = styled(motion.div)({
  zIndex: 1,
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
  flex: 1,
  minWidth: "125px",
  maxWidth: "300px",
  "&:hover": {
    boxShadow: "var(--shadow)",
  },
});

const DeleteContainer = styled(motion.div)({
  zIndex: 2,
  position: "absolute",
  right: "8px",
  top: "8px",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderRadius: "4px",
  padding: "4px",
});

const DeleteVariants: Variants = {
  initial: {
    y: 5,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -5,
    opacity: 0,
  },
  hover: {
    y: -2,
  },
};

const FridgeImg = css({
  width: "auto",
  height: "auto",
  aspectRatio: "1 / 1",
  objectFit: "cover",
});

export default FridgeImage;
