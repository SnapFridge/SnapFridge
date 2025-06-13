import Image from "next/image";
import { css, styled } from "@pigment-css/react";
import { ON_MOBILE } from "@components/Global";
import React from "react";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { type Recipe, ingredients2Str } from "./functions.helper";

interface RecipeProps {
  recipe: Recipe;
  recipeVariants: Variants;
}

function RecipeCard({ recipe, recipeVariants }: RecipeProps) {
  return (
    <Card
      variants={recipeVariants}
      initial="offscreen"
      whileInView="onscreen"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
    >
      <RecipeTitle>{recipe.title}</RecipeTitle>
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={312}
        height={231}
        className={FoodImg}
      />
      <Ingredients>
        {recipe.usedIngredientCount > 0 && (
          <>
            <IngredientTitle>Ingredients</IngredientTitle>
            <p>{ingredients2Str(recipe.usedIngredients)}</p>
          </>
        )}
      </Ingredients>
      <MissedIngredients>
        {recipe.missedIngredientCount > 0 && (
          <>
            <IngredientTitle>Missing Ingredients</IngredientTitle>
            <p>{ingredients2Str(recipe.missedIngredients)}</p>
          </>
        )}
      </MissedIngredients>
    </Card>
  );
}

const Card = styled(motion.li)({
  border: "1px solid var(--accent-950)",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "var(--shadow)",
  maxWidth: "800px",

  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 2fr 2fr",
  columnGap: "24px",
  alignItems: "center",

  [ON_MOBILE]: {
    display: "block",

    "&> :not(:first-child)": {
      marginTop: "16px",
    },
  },
});

const RecipeTitle = styled("h3")({
  gridArea: "1 / 1 / 2 / 3",
  width: "100%",
  fontSize: "var(--1-25rem)",

  [ON_MOBILE]: {
    textAlign: "center",
  },
});

const FoodImg = css({
  gridArea: "2 / 1 / 4 / 2",
  borderRadius: "24px",
  minWidth: 0,
  flex: "1 1 300px",
  width: "100%",
  height: "auto",
});

const Ingredients = styled("div")({
  gridArea: "2 / 2 / 3 / 3",
  width: "100%",
  color: "var(--text-950)",
  fontSize: "var(--1rem)",

  [ON_MOBILE]: {
    textAlign: "center",
    justifyItems: "center",
  },
});

const MissedIngredients = styled("div")({
  gridArea: "3 / 2 / 4 / 3",
  width: "100%",
  color: "var(--warning)",
  fontSize: "var(--1rem)",

  [ON_MOBILE]: {
    textAlign: "center",
    justifyItems: "center",
  },
});

const IngredientTitle = styled("h4")({
  width: "fit-content",
  fontSize: "var(--1-25rem)",
});

export default RecipeCard;
