import { styled } from "@pigment-css/react";

export const MOBILE_BREAKPOINT = 576;
const MIN_SUPPORTED_WIDTH = 320;
export const MAX_SUPPORTED_WIDTH = 1920;

export const ON_MOBILE = `@media (max-width: ${MOBILE_BREAKPOINT / 16}rem)`;

export const PageMargin = styled("div")({
  margin: "0 var(--page-margin)",
});

// Sizes are from Figma

function round(num: number, places = 4) {
  const factor = Math.pow(10, places);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}
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

  // Unused
  unusedIngredients?: Ingredient[];
  id?: number;
  image: string;
  imageType: string;
  likes?: number;
};
