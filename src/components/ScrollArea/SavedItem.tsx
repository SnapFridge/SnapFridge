"use client";

import { styled, css } from "@pigment-css/react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";

type Props = {
  recipeID: number;
  recipeName: string;
  imageType: string;
};

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
const MotionLink = motion.create(Link);

// src={`https://img.spoonacular.com/recipes/${recipeID}-${IMG_SIZE}.${IMG_TYPE}`}
export default function SavedItem({ recipeID, recipeName, imageType }: Props) {
  // change href to switch based on environment
  return (
    <Container whileHover="hover" href={`http://127.0.0.1:3000/recipe/${recipeID}`}>
      <MotionImage
        src={`https://img.spoonacular.com/recipes/${recipeID}-${IMG_SIZE}.${imageType}`}
        alt="hi"
        className={ImgCSS}
        width={width}
        height={height}
        variants={ImgVariants}
      />
      <RecipeName variants={NameVariants} initial="initial" whileHover="hover">
        {recipeName}
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
    transition: {
      duration: 0.2,
      delay: 0,
      ease: "linear",
    },
  },
};

// ?? for some reason getting this error despite clarifying both dimensions
// Image with src "https://img.spoonacular.com/recipes/1-480x360.jpg" has either width or height modified, but not the other.
// If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the
// aspect ratio.
const ImgCSS = css({
  objectFit: "cover",
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  transition: "transform 0.3s ease-in-out",

  "&:hover": {
    transform: "scale(1.2)",
  },
});

const Container = styled(MotionLink)({
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
  backgroundColor: "rgba(0,0,0,0.6)",
  borderRadius: "inherit",
  fontWeight: "bold",
  color: "var(--text-950)",

  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});
