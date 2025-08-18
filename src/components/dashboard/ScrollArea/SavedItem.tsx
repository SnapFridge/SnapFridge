import { css, styled } from "@pigment-css/react";
import { type SavedRecipe } from "@utils";
import Image from "next/image";
import Link from "next/link";

export default function SavedItem({ id, name, imageType }: SavedRecipe) {
  return (
    <Container href={`/recipe/${id}`}>
      <Image
        src={`https://img.spoonacular.com/recipes/${id}-312x231.${imageType}`}
        alt="hi"
        className={ImgCSS}
        width={312}
        height={231}
        quality={100}
      />
      <RecipeName>{name}</RecipeName>
    </Container>
  );
}

const Container = styled(Link)({
  width: "312px",
  height: "231px",
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
  fontWeight: 700,
  fontSize: `${24 / 16}rem`,
  color: "var(--text-950)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  opacity: 0,
  transition: "all .25s",

  [`${Container}:hover > &`]: {
    opacity: 1,
  },
});
