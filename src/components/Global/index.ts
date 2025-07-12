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
  image: string;

  // Unused
  unusedIngredients?: Ingredient[];
  id?: number;
  imageType?: string;
  likes?: number;
};

export const recipesExample: Recipe[] = [
  {
    title: "Simple Whole Wheat Crepes",
    image: "https://img.spoonacular.com/recipes/716407-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 1,
    missedIngredients: [
      {
        amount: 1,
        unit: "Tablespoon",
        name: "maple syrup",
      },
    ],
    usedIngredients: [
      {
        amount: 3,
        unit: "Tablespoons",
        name: "butter",
      },
      {
        amount: 3,
        unit: "",
        name: "eggs",
      },
      {
        amount: 1,
        unit: "cup",
        name: "milk",
      },
    ],
  },
  {
    title: "Dutch Baby",
    image: "https://img.spoonacular.com/recipes/641759-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 1,
    missedIngredients: [
      {
        amount: 2,
        unit: "",
        name: "lemons",
      },
    ],
    usedIngredients: [
      {
        amount: 3,
        unit: "",
        name: "eggs",
      },
      {
        amount: 1,
        unit: "cup",
        name: "milk",
      },
      {
        amount: 2,
        unit: "tablespoons",
        name: "butter",
      },
    ],
  },
  {
    title: "Lemon Cupcakes",
    image: "https://img.spoonacular.com/recipes/649593-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 1,
    missedIngredients: [
      {
        amount: 2.5,
        unit: "teaspoons",
        name: "lemon zest",
      },
    ],
    usedIngredients: [
      {
        amount: 2,
        unit: "",
        name: "eggs",
      },
      {
        amount: 0.75,
        unit: "cup",
        name: "milk",
      },
      {
        amount: 10,
        unit: "tablespoons",
        name: "butter",
      },
    ],
  },
  {
    title: "Lemon Delicious Pudding",
    image: "https://img.spoonacular.com/recipes/649609-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 1,
    missedIngredients: [
      {
        amount: 2,
        unit: "",
        name: "lemons",
      },
    ],
    usedIngredients: [
      {
        amount: 60,
        unit: "grams",
        name: "butter",
      },
      {
        amount: 3,
        unit: "",
        name: "eggs",
      },
      {
        amount: 1.5,
        unit: "cups",
        name: "milk",
      },
    ],
  },
  {
    title: "Classic scones",
    image: "https://img.spoonacular.com/recipes/639637-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
      {
        amount: 4,
        unit: "servings",
        name: "strawberry jam and cream",
      },
    ],
    usedIngredients: [
      {
        amount: 0.75,
        unit: "cup",
        name: "milk",
      },
      {
        amount: 50,
        unit: "g",
        name: "butter",
      },
    ],
  },
  {
    title: "Nutella Buttercream Cupcakes with Hidden Cadbury Egg",
    image: "https://img.spoonacular.com/recipes/991625-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
      {
        amount: 1,
        unit: "tsp",
        name: "vanilla",
      },
    ],
    usedIngredients: [
      {
        amount: 4,
        unit: "",
        name: "eggs",
      },
      {
        amount: 1,
        unit: "cup",
        name: "milk",
      },
    ],
  },
  {
    title: "Bread Omlette",
    image: "https://img.spoonacular.com/recipes/635964-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
      {
        amount: 1,
        unit: "cup",
        name: "bread crumbs",
      },
    ],
    usedIngredients: [
      {
        amount: 4,
        unit: "",
        name: "eggs",
      },
      {
        amount: 1,
        unit: "cup",
        name: "milk",
      },
    ],
  },
  {
    title: "Baked Custard",
    image: "https://img.spoonacular.com/recipes/633574-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
      {
        amount: 0.5,
        unit: "teaspoon",
        name: "vanilla",
      },
    ],
    usedIngredients: [
      {
        amount: 4,
        unit: "",
        name: "eggs",
      },
      {
        amount: 2,
        unit: "cups",
        name: "milk",
      },
    ],
  },
  {
    title: "Blueberry Loaf With Blueberry Syrup",
    image: "https://img.spoonacular.com/recipes/635492-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 2,
    missedIngredients: [
      {
        amount: 3,
        unit: "cups",
        name: "blueberries",
      },
      {
        amount: 1,
        unit: "teaspoon",
        name: "lemon zest",
      },
    ],
    usedIngredients: [
      {
        amount: 0.5,
        unit: "tablespoon",
        name: "butter",
      },
      {
        amount: 2,
        unit: "large",
        name: "eggs",
      },
      {
        amount: 0.75,
        unit: "cup",
        name: "milk",
      },
    ],
  },
  {
    title: "Organic Pumpkin Whoopie Pies",
    image: "https://img.spoonacular.com/recipes/654055-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 2,
    missedIngredients: [
      {
        amount: 1,
        unit: "cup",
        name: "pumpkin puree",
      },
      {
        amount: 1,
        unit: "package",
        name: "spiced cake mix",
      },
    ],
    usedIngredients: [
      {
        amount: 1,
        unit: "cup",
        name: "butter",
      },
      {
        amount: 2,
        unit: "large",
        name: "eggs",
      },
      {
        amount: 0.5,
        unit: "cup",
        name: "milk",
      },
    ],
  },
];
