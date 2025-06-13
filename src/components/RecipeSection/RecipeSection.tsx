"use client";

import RecipeCard from "@components/RecipeCard";
import { styled, css } from "@pigment-css/react";
import * as motion from "motion/react-client";
import { scaleClamped } from "@components/Global";
import Icon from "@components/Icon";
import { useState } from "react";
import { Skeleton, Box, Heading } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { ON_MOBILE } from "@components/Global";
import { type Variants } from "motion/react";


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

function RecipeSection({ headerText = "Recipes Found" }: Props) {
  const [loading, setLoading] = useState(true);

  function switchLoading() {
    setLoading(!loading);
  }

  if (loading) {
    return (
      <>
        <button onClick={switchLoading}>switch loading</button>
        <Header>
          <HeaderTxt>{headerText}</HeaderTxt>
          <Icon icon="Sparkles" size={50}></Icon>
        </Header>

        <RecipeList>
          <SkeletonContainer
            variants={SkeletonCardVariant}
            initial="offscreen"
            whileInView="onscreen"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Heading className={SkeletonTitle} >
              <Skeleton>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</Skeleton>
            </Heading>
            
            <Skeleton className={ImageCSS}>
              <Box width="312px" height="231px"></Box>
            </Skeleton>

            <IngredientsContainer>
              <Heading>
                <Skeleton>Ingredients</Skeleton>
              </Heading>

              <Text>
                <Skeleton>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Skeleton>
              </Text>
            </IngredientsContainer>


            <MissedIngredientsContainer>
              <Heading>
                <Skeleton> Missed Ingredients</Skeleton>
              </Heading>

              <Text>
                <Skeleton>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Skeleton>
              </Text>
            </MissedIngredientsContainer>
          </SkeletonContainer>  

          <SkeletonContainer
            variants={SkeletonCardVariant}
            initial="offscreen"
            whileInView="onscreen"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Heading className={SkeletonTitle} >
              <Skeleton>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</Skeleton>
            </Heading>
            
            <Skeleton className={ImageCSS}>
              <Box width="312px" height="231px"></Box>
            </Skeleton>

            <IngredientsContainer>
              <Heading>
                <Skeleton>Ingredients</Skeleton>
              </Heading>

              <Text>
                <Skeleton>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Skeleton>
              </Text>
            </IngredientsContainer>


            <MissedIngredientsContainer>
              <Heading>
                <Skeleton> Missed Ingredients</Skeleton>
              </Heading>

              <Text>
                <Skeleton>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Skeleton>
              </Text>
            </MissedIngredientsContainer>
          </SkeletonContainer>            
        </RecipeList>
   
      </>
    )
  }



  return (
    <>
      <button onClick={switchLoading}>switch loading</button>
      <Header>
        <HeaderTxt>{headerText}</HeaderTxt>
        <Icon icon="Sparkles" size={50}></Icon>
      </Header>

      <RecipeList>
        {recipesExample.map(recipe => (
          <RecipeCard
            recipe={recipe}
            key={recipe.id}
          />
        ))}
      </RecipeList>
    </>
  );
}

const RecipeList = styled(motion.ul)({
  listStyleType: "none",
  padding: 0,

  "& > :not(:first-child)": {
    marginTop: "28px",
  },
});

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "12px",
});

const HeaderTxt = styled("h2")({
  fontSize: scaleClamped(24, 36),
});


const SkeletonContainer = styled(motion.li)({
  padding: "24px",
  maxWidth: "800px",

  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 2fr 2fr",
  columnGap: "24px",
  alignItems: "center",

  [ON_MOBILE]: {
    display: "flex",
    flexDirection: "column",

    "&> :not(:first-child)": {
      marginTop: "16px",
    },
  },
});

const SkeletonCardVariant: Variants = {
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




const SkeletonTitle = css({
  gridArea: "1 / 1 / 2 / 3",
  width: "100%",

  [ON_MOBILE]: {
    textAlign: "center",
  },
});

const ImageCSS = css({
  gridArea: "2 / 1 / 4 / 2",
  borderRadius: "24px",
  minWidth: 0,
  flex: "1 1 300px",
  width: "100%",
  height: "auto",
});

const IngredientsContainer = styled('div')({
  gridArea: "2 / 2 / 3 / 3",
  width: "100%",

  [ON_MOBILE]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
  },
});

const MissedIngredientsContainer = styled('div')({
  gridArea: "3 / 2 / 4 / 3",
  width: "100%",

  [ON_MOBILE]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});


export default RecipeSection;
