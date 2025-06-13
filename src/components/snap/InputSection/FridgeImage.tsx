"use client";

import { motion, AnimatePresence, useAnimate, type Variants } from "motion/react";
import Image from "next/image";
import Icon from "@components/Icon";
import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@pigment-css/react";

interface OurImage {
  src: string;
  key: string;
}

interface Props {
  src: string;
  imageKey: string;
  images: OurImage[];
  setImages: (_: OurImage[]) => void;
}

function FridgeImage({ src, imageKey, images, setImages }: Props) {
  const [isActive, setActive] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    void (async () => {
     if (isActive) {
        await animate(scope.current, 
          {
            y: -5,
            scale: 1.05,
          }
        );
      }
      else {
        await animate(scope.current, 
          {
            y: 0,
            scale: 1,
          }
        );
      } 
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

  function handleDelete() {
    setImages(images.filter(image => image.key !== imageKey));
  }

  return (
    <ImageContainer
      // for desktop
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}

      // mobile
      onClick={handleClick}

      variants={ContainerVariants}
      ref={scope}
      initial="initial"
      animate="enterAnim"
    > 
      <AnimatePresence initial={false}>
        {isActive ?
          (
              <DeleteContainer
                onClick={handleDelete}
                variants={DeleteVariants}
                whileHover="hover"
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <Icon icon="Trash2" color="var(--warning)" />
              </DeleteContainer>            
          )
          : undefined
        }
      </AnimatePresence>
      <Image 
        width={150}
        height={150}
        src={src}
        alt=""
      />
    </ImageContainer>
  )
}

const ContainerVariants: Variants = {
  "initial": {
    y: 10,
    opacity: 0,
  },
  "enterAnim": {
    y: 0,
    opacity: 1,
  },
}

const ImageContainer = styled(motion.div)({
  zIndex: 1,
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",

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
  "initial": {
    y: 5,
    opacity: 0,
  },
  "enter": {
    y: 0,
    opacity: 1,
  },
  "exit": {
    y: -5,
    opacity: 0,
  },
  "hover": {
    y: -2,
  },

}

export default FridgeImage;