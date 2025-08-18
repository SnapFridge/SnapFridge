import { css, styled } from "@pigment-css/react";
import { ON_MOBILE, type Recipe } from "@utils";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function RecipeCard({ recipe }: { recipe: Recipe | undefined }) {
  if (!recipe) {
    return (
      <Card as="li" style={{ border: 0 }}>
        <SkeletonTheme
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
        >
          <Skeleton containerClassName={RecipeTitle} />
          <FoodImgSkeleton>
            <Skeleton width="100%" height="100%" />
          </FoodImgSkeleton>
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
    );
  }
  return (
    <li>
      <Card href={`/recipe/${recipe.id}`}>
        <h3 className={RecipeTitle}>{recipe.title}</h3>
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={636}
          height={393}
          quality={100}
          className={FoodImg}
        />
        <Ingredients>
          {recipe.usedIngredientCount > 0 && (
            <>
              <h4 className={IngredientTitle}>Ingredients</h4>
              <Capitalized>
                {recipe.usedIngredients.map((i) => i.name).join(", ")}
              </Capitalized>
            </>
          )}
        </Ingredients>
        <MissedIngredients>
          {recipe.missedIngredientCount > 0 && (
            <>
              <h4 className={IngredientTitle}>Missing Ingredients</h4>
              <Capitalized>
                {recipe.missedIngredients.map((i) => i.name).join(", ")}
              </Capitalized>
            </>
          )}
        </MissedIngredients>
      </Card>
    </li>
  );
}

const Card = styled("a")({
  color: "inherit",
  textDecoration: "inherit",
  border: "1px solid var(--accent-950)",
  borderRadius: "12px",
  padding: "24px",
  margin: "0 1% 28px",
  boxShadow: "var(--shadow)",
  maxWidth: "800px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 2fr 2fr",
  columnGap: "24px",
  alignItems: "center",
  transition: "transform .25s",

  "&:hover": {
    transform: "scale(1.02)",
  },

  "&:last-child": {
    margin: "0 1% max(28px, 1%)",
  },

  [ON_MOBILE]: {
    display: "block",

    "& > :not(:first-child)": {
      margin: "16px 0 0",
    },

    "& > *": {
      textAlign: "center",
    },
  },
});

const RecipeTitle = css({
  gridArea: "1 / 1 / 2 / 3",
  width: "100%",
  fontSize: "var(--1-25rem)",
});

const FoodImg = css({
  gridArea: "2 / 1 / 4 / 2",
  borderRadius: "24px",
  minWidth: 0,
  flex: "1 1 300px",
  width: "100%",
  height: "auto",
});

const FoodImgSkeleton = styled("div")({
  display: "block",
  gridArea: "2 / 1 / 4 / 2",
  width: "100%",
  aspectRatio: 1.351,
});

const Ingredients = styled("div")({
  gridArea: "2 / 2 / 3 / 3",
  width: "100%",
});

const MissedIngredients = styled("div")({
  gridArea: "3 / 2 / 4 / 3",
  width: "100%",
  color: "var(--warn-500)",
});

const IngredientTitle = css({
  width: "100%",
  fontSize: "var(--1-25rem)",
});

const Capitalized = styled("p")({
  textTransform: "capitalize",
});

const IngredientNames = css({
  fontSize: "var(--1rem)",
});

export default RecipeCard;
