"use client";

import Button from "@components/Button";
import Image from "next/image";
import { styled, css } from "@pigment-css/react";
import { ON_MOBILE } from "@components/Global";
import React from "react";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";

interface Ingredient {
  aisle: string;
  amount: number;
  id: number;
  image: string;
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
  unitLong: string;
  unitShort: string;
}
interface Recipe {
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  title: string;
  unusedIngredients: Ingredient[];
  usedIngredientCount: number;
  usedIngredients: Ingredient[];
}
interface RecipeProps {
  recipe: Recipe;
  RecipeVariants: Variants;
}

function RecipeCard({ recipe, RecipeVariants }: RecipeProps) {
  let usedIngredientString: any = recipe.usedIngredients
    .map((ingredient: Ingredient) => {
      // split ingredient name into an array
      return ingredient.name
        .split(" ")
        .map((ingredientWord: string) => {
          // capitalize every word
          return (
            ingredientWord.charAt(0).toUpperCase() + ingredientWord.slice(1)
          );
        })
        .join(" "); // join the array together with a space before returning it
    })
    .join(", "); // then join the array of ingredient names together with a comma

  let missedIngredientString: any = recipe.missedIngredients
    .map((ingredient: Ingredient) => {
      // split ingredient name into an array
      return ingredient.name
        .split(" ")
        .map((ingredientWord: string) => {
          // capitalize every word
          return (
            ingredientWord.charAt(0).toUpperCase() + ingredientWord.slice(1)
          );
        })
        .join(" "); // join the array together with a space before returning it
    })
    .join(", "); // then join the array of ingredient names together with a comma

  return (
    <Card
      variants={RecipeVariants}
      initial="offscreen"
      whileInView="onscreen"
      whileHover="hover"
    >
      <RecipeTitle>{recipe.title}</RecipeTitle>
      <MainContent>
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={312}
          height={231}
          className={ImageCSS}
        />

        <MainInformation>
          {recipe.usedIngredientCount !== 0 && (
            <>
              <IngrediantsTitle>Ingredients</IngrediantsTitle>
              <p>{usedIngredientString}</p>
            </>
          )}
          {recipe.missedIngredientCount !== 0 && (
            <>
              <IngrediantsTitle className={WarningCSS}>
                Missing Ingredients
              </IngrediantsTitle>
              <p className={WarningCSS}>{missedIngredientString}</p>
            </>
          )}
          <Button
            styling="secondary"
            className={ViewButton}
            as="a"
            href={`/recipe`}
          >
            View
          </Button>
        </MainInformation>
      </MainContent>
    </Card>
  );
}

export const RecipeCardVariant = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
};

const ViewButton = css({
  position: "absolute",
  bottom: 0,
  right: 0,
  padding: "8px 36px",
  backgroundColor: "var(--background-50)",
  boxShadow: "var(--shadow)",

  "&:hover": {
    backgroundColor: "var(--background-100)",
  },

  [ON_MOBILE]: {
    position: "static",
    marginTop: "12px",
  },
});

const ImageCSS = css({
  borderRadius: "24px",
  minWidth: 0,
  flex: "1 1 300px",
});

const WarningCSS = css({
  color: "var(--warning)",
});

const Card = styled(motion.li)({
  border: "1px solid var(--accent-950)",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "var(--shadow)",
  maxWidth: "800px",

  [ON_MOBILE]: {
    padding: "12px",
    maxWidth: "fit-content",
  },
});

const MainContent = styled("div")({
  display: "flex",
  width: "fit-content",
  gap: "32px",

  [ON_MOBILE]: {
    marginLeft: 0,
    flexDirection: "column",
    alignItems: "center",
    width: "fit-content",
  },
});

const MainInformation = styled("div")({
  flex: "2 999999999 550px",
  display: "flex",
  flexDirection: "column",
  width: "fit-content",
  position: "relative",
  overflow: "hidden",
  "&> p": {
    fontSize: `${20 / 16}rem`,
    marginLeft: "18px",
    marginBottom: "32px",
  },

  [ON_MOBILE]: {
    alignItems: "center",
    justifyContent: "space-evenly",

    "&> p": {
      margin: 0,
    },
  },
});

const RecipeTitle = styled("h3")({
  width: "fit-content",
  [ON_MOBILE]: {
    textAlign: "center",
  },
});

const IngrediantsTitle = styled("h4")({
  width: "fit-content",
  fontSize: `${24 / 16}rem`,
});

export default RecipeCard;
