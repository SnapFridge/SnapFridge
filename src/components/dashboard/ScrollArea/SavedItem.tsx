import { styled, css } from "@pigment-css/react";
import Image from "next/image";
import { type SavedRecipe } from "@utils";

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

export default function SavedItem({ id, name, imageType }: SavedRecipe) {
  return (
    <Container href={`/recipe/${id}`}>
      <Image
        src={`https://img.spoonacular.com/recipes/${id}-${IMG_SIZE}.${imageType}`}
        alt="hi"
        className={ImgCSS}
        width={width}
        height={height}
      />
      <RecipeName>{name}</RecipeName>
    </Container>
  );
}

const Container = styled("a")({
  width: `${width / 2}px`,
  height: `${height}px`,
  position: "relative",
  borderRadius: "4px",
  overflow: "hidden",
});

const ImgCSS = css({
  objectFit: "cover",
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  transition: "all .25s",

  [`${Container}:hover > &`]: {
    transform: "scale(1.1)",
    opacity: 0.4,
  },
});

const RecipeName = styled("p")({
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
  opacity: 0,
  transition: "all .25s, visibility 0 .25s",

  [`${Container}:hover > &`]: {
    transition: "all .25s, visibility 0s",
    opacity: 1,
  },
});
