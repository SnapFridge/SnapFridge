import Image from "next/image";
import { css, styled } from "@pigment-css/react";
import { ON_MOBILE, type Recipe } from "@components/Global";
import React from "react";
import * as motion from "motion/react-client";
import { type Variants } from "motion/react";
import ingredients2Str from "./functions.helper";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function RecipeCard({ recipe }: { recipe: Recipe | undefined }) {
  return recipe === undefined ? (
    <Card
      variants={CardVariant}
      initial="offscreen"
      whileInView="onscreen"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      style={{ border: 0 }}
    >
      <SkeletonTheme
        baseColor="var(--skeleton-base)"
        highlightColor="var(--skeleton-highlight)"
      >
        <Skeleton containerClassName={RecipeTitle} />
        <div className={FoodImgSkeleton}>
          <Skeleton width="100%" height="100%" />
        </div>
        <Ingredients>
          <Skeleton containerClassName={IngredientTitle} count={0.4} />
          <Skeleton containerClassName={IngredientNames} count={1.5} />
        </Ingredients>
        <MissedIngredients>
          <Skeleton containerClassName={IngredientTitle} count={0.66} />
          <Skeleton containerClassName={IngredientNames} count={1.8} />
        </MissedIngredients>
      </SkeletonTheme>
    </Card>
  ) : (
    <Card
      variants={CardVariant}
      initial="offscreen"
      whileInView="onscreen"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h3 className={RecipeTitle}>{recipe.title}</h3>
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
            <h4 className={IngredientTitle}>Ingredients</h4>
            <p>{ingredients2Str(recipe.usedIngredients)}</p>
          </>
        )}
      </Ingredients>
      <MissedIngredients>
        {recipe.missedIngredientCount > 0 && (
          <>
            <h4 className={IngredientTitle}>Missing Ingredients</h4>
            <p className={IngredientNames}>{ingredients2Str(recipe.missedIngredients)}</p>
          </>
        )}
      </MissedIngredients>
    </Card>
  );
}

const CardVariant: Variants = {
  offscreen: {
    y: 100,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      duration: 0.5
    }
  }
};

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
      marginTop: "16px"
    }
  }
});

const RecipeTitle = css({
  gridArea: "1 / 1 / 2 / 3",
  width: "100%",
  fontSize: "var(--1-25rem)",

  [ON_MOBILE]: {
    textAlign: "center"
  }
});

const FoodImg = css({
  gridArea: "2 / 1 / 4 / 2",
  borderRadius: "24px",
  minWidth: 0,
  flex: "1 1 300px",
  width: "100%",
  height: "auto"
});

const FoodImgSkeleton = css({
  display: "block",
  gridArea: "2 / 1 / 4 / 2",
  width: "100%",
  aspectRatio: "312 / 231"
});

const Ingredients = styled("div")({
  gridArea: "2 / 2 / 3 / 3",
  width: "100%",
  color: "var(--text-950)",
  fontSize: "var(--1rem)",

  [ON_MOBILE]: {
    textAlign: "center",
    justifyItems: "center"
  }
});

const MissedIngredients = styled("div")({
  gridArea: "3 / 2 / 4 / 3",
  width: "100%",
  color: "var(--warn-500)",
  fontSize: "var(--1rem)",

  [ON_MOBILE]: {
    textAlign: "center",
    justifyItems: "center"
  }
});

const IngredientTitle = css({
  width: "fit-content",
  fontSize: "var(--1-25rem)"
});

const IngredientNames = css({
  width: "fit-content",
  fontSize: "var(--1rem)"
});

export default RecipeCard;
