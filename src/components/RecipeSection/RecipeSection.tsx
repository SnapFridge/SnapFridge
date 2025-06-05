"use client";

import RecipeCard from "@components/RecipeCard";
import Icon from "@components/Icon";
import { styled } from "@pigment-css/react";
import * as motion from "motion/react-client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { RecipeCardVariant } from "@components/RecipeCard";

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

interface Props {
  headerText?: string;
}

const recipesExample = [
  {
    id: 73420,
    image: "https://img.spoonacular.com/recipes/73420-312x231.jpg",
    imageType: "jpg",
    likes: 0,
    missedIngredientCount: 3,
    missedIngredients: [
      {
        aisle: "Baking",
        amount: 1.0,
        id: 18371,
        image:
          "https://img.spoonacular.com/ingredients_100x100/white-powder.jpg",
        meta: [],
        name: "baking powder",
        original: "1 tsp baking powder",
        originalName: "baking powder",
        unit: "tsp",
        unitLong: "teaspoon",
        unitShort: "tsp",
      },
      {
        aisle: "Spices and Seasonings",
        amount: 1.0,
        id: 2010,
        image: "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg",
        meta: [],
        name: "cinnamon",
        original: "1 tsp cinnamon",
        originalName: "cinnamon",
        unit: "tsp",
        unitLong: "teaspoon",
        unitShort: "tsp",
      },
      {
        aisle: "Milk, Eggs, Other Dairy",
        amount: 1.0,
        id: 1123,
        image: "https://img.spoonacular.com/ingredients_100x100/egg.png",
        meta: [],
        name: "egg",
        original: "1 egg",
        originalName: "egg",
        unit: "",
        unitLong: "",
        unitShort: "",
      },
    ],
    title: "Apple Or Peach Strudel",
    unusedIngredients: [],
    usedIngredientCount: 1,
    usedIngredients: [
      {
        aisle: "Produce",
        amount: 6.0,
        id: 9003,
        image: "https://img.spoonacular.com/ingredients_100x100/apple.jpg",
        meta: [],
        name: "apples",
        original: "6 large baking apples",
        originalName: "baking apples",
        unit: "large",
        unitLong: "larges",
        unitShort: "large",
      },
    ],
  },
  {
    id: 632660,
    image: "https://img.spoonacular.com/recipes/632660-312x231.jpg",
    imageType: "jpg",
    likes: 3,
    missedIngredientCount: 4,
    missedIngredients: [
      {
        aisle: "Milk, Eggs, Other Dairy",
        amount: 1.5,
        extendedName: "unsalted butter",
        id: 1001,
        image:
          "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg",
        meta: ["unsalted", "cold"],
        name: "butter",
        original: "1 1/2 sticks cold unsalted butter cold unsalted butter<",
        originalName: "cold unsalted butter cold unsalted butter<",
        unit: "sticks",
        unitLong: "sticks",
        unitShort: "sticks",
      },
      {
        aisle: "Produce",
        amount: 4.0,
        id: 1079003,
        image:
          "https://img.spoonacular.com/ingredients_100x100/red-delicious-apples.png",
        meta: [
          "red",
          " such as golden delicious, peeled, cored and cut into 1/4-inch-thick slices ",
        ],
        name: "red apples",
        original:
          "4 larges red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
        originalName:
          "s red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
        unit: "large",
        unitLong: "larges",
        unitShort: "large",
      },
      {
        aisle: "Spices and Seasonings",
        amount: 2.0,
        id: 2010,
        image: "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg",
        meta: [],
        name: "cinnamon",
        original: "2 teaspoons cinnamon",
        originalName: "cinnamon",
        unit: "teaspoons",
        unitLong: "teaspoons",
        unitShort: "tsp",
      },
      {
        aisle: "Nut butters, Jams, and Honey",
        amount: 2.0,
        id: 19719,
        image:
          "https://img.spoonacular.com/ingredients_100x100/apricot-jam.jpg",
        meta: ["melted"],
        name: "apricot preserves",
        original: "2 tablespoons apricot preserves, melted and strained",
        originalName: "apricot preserves, melted and strained",
        unit: "tablespoons",
        unitLong: "tablespoons",
        unitShort: "Tbsp",
      },
    ],
    title: "Apricot Glazed Apple Tart",
    unusedIngredients: [
      {
        aisle: "Produce",
        amount: 1.0,
        id: 9003,
        image: "https://img.spoonacular.com/ingredients_100x100/apple.jpg",
        meta: [],
        name: "apples",
        original: "apples",
        originalName: "apples",
        unit: "serving",
        unitLong: "serving",
        unitShort: "serving",
      },
    ],
    usedIngredientCount: 0,
    usedIngredients: [],
  },
];

function RecipeSection({ headerText = "Recipes Found", ...delegated }: Props) {
  const ref = useRef(null);

  return (
    <>
      <Header {...delegated}>
        <h2>{headerText}</h2>
        <Icon icon="Sparkles" color="var(--text-800)" size={50}></Icon>
      </Header>

      <RecipeList
        ref={ref}
        variants={RecipeListVariants}
        initial="staggerOnExit"
        animate="staggerOnEntry"
      >
        {recipesExample.map((recipe) => {
          return (
            <RecipeCard
              recipe={recipe}
              key={recipe.title}
              RecipeVariants={RecipeCardVariant}
            />
          );
        })}
      </RecipeList>
    </>
  );
}

// make this work somehow
const RecipeListVariants = {
  staggerOnEntry: {
    transition: { staggerChildren: 1 },
  },
  staggerOnExit: {
    transition: { staggerChildren: 1 },
  },
};

const RecipeList = styled(motion.ul)({
  listStyleType: "none",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "32px",
});

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  fontSize: `${24 / 16}rem`,
});

export default RecipeSection;
