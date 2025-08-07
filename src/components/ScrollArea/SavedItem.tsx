"use client";

import { styled, css } from "@pigment-css/react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import type { SavedRecipe } from "@utils";

// https://spoonacular.com/food-api/docs#Show-Images
const IMG_SIZE:
  | "90x90"
  | "240x150"
  | "312x150"
  | "312x231"
  | "480x360"
  | "556x370"
  | "636x393" = "480x360";

const width = parseInt(IMG_SIZE.split("x")[0] ?? "0");
const height = parseInt(IMG_SIZE.split("x")[1] ?? "0");

const MotionImage = motion.create(Image);

export default function SavedItem({ id, name, imageType }: SavedRecipe) {
  return (
    <Container whileHover="hover" href={`/recipe/${id}`}>
      <MotionImage
        src={`https://img.spoonacular.com/recipes/${id}-${IMG_SIZE}.${imageType}`}
        alt="hi"
        className={ImgCSS}
        width={width}
        height={height}
        variants={ImgVariants}
      />
      <RecipeName variants={NameVariants} initial="initial" whileHover="hover">
        {name}
      </RecipeName>
    </Container>
  );
}

const NameVariants: Variants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
};

const ImgVariants: Variants = {
  hover: {
    scale: 1.1,
    opacity: 0.4,
    transition: {
      duration: 0.2,
      delay: 0,
      ease: "linear",
    },
  },
};

const ImgCSS = css({
  objectFit: "cover",
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});

const Container = styled(motion.a)({
  width: `${width / 2}px`,
  height: `${height}px`,
  position: "relative",
  borderRadius: "4px",
  overflow: "hidden",
});

const RecipeName = styled(motion.p)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  padding: "8px",
  borderRadius: "inherit",
  fontWeight: "bold",
  fontSize: `${24 / 16}rem`,
  color: "var(--text-950)",

  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});
