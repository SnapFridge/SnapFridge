import { styled } from "@pigment-css/react";

export const MOBILE_BREAKPOINT = 576;
const MIN_SUPPORTED_WIDTH = 320;
export const MAX_SUPPORTED_WIDTH = 1920;

export const ON_MOBILE = `@media (max-width: ${MOBILE_BREAKPOINT / 16}rem)`;
export const ON_DESKTOP = ON_MOBILE.replace("max", "min");

export const PageMargin = styled("div")({
  margin: "0 var(--page-margin)",
});

export const devEnv = process.env.NODE_ENV === "development";

export function round(num: number, places = 4) {
  const factor = Math.pow(10, places);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

// Sizes are from Figma
export function scaleClamped(
  sizeAtMin: number,
  sizeAtMax: number,
  rem: boolean = true,
  min = MIN_SUPPORTED_WIDTH,
  max = MAX_SUPPORTED_WIDTH
) {
  if (rem) {
    sizeAtMax /= 16;
    sizeAtMin /= 16;
  }
  const slope = (sizeAtMax - sizeAtMin) / (max - min);
  const yIntercept = round(sizeAtMin - slope * min);
  const unit = rem ? "rem" : "px";
  return `clamp(${round(sizeAtMin)}${unit}, ${round(slope * (rem ? 1600 : 100))}vw + ${yIntercept}${unit}, ${round(sizeAtMax)}${unit})`;
}

export type Ingredient = {
  name: string;
  amount: number;
  unit: string;

  // Unused
  aisle?: string;
  id?: number;
  image?: string;
  meta?: string[];
  original?: string;
  originalName?: string;
  extendedName?: string;
  unitLong?: string;
  unitShort?: string;
};

export type Recipe = {
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  title: string;
  usedIngredientCount: number;
  usedIngredients: Ingredient[];
  image: string;
  id: number;

  // Unused
  unusedIngredients?: Ingredient[];
  imageType?: string;
  likes?: number;
};

export type SavedRecipe = {
  id: number;
  name: string;
  imageType: string;
};

// Rounding logic for recipe ingredient/nutrient list
export function roundNumber(num: number) {
  // rounding function to handle stuff like .25 cups and weird measurements
  // like 178.958 ml

  if (num < 1) {
    return parseFloat(num.toFixed(2));
  }

  return Math.round(num);
}
