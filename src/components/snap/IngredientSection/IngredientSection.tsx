"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import { type Ingredient } from "@components/Global";
import IngredientBox from "./Ingredient";
import { motion } from "motion/react";
import { useDispatch, useIngredients } from "../InputSection/InputManager";
import Button from "@components/Button";
import { useState } from "react";

function IngredientSection() {
  const ingredients = useIngredients();
  const [ingredient, setIngredient] = useState("");

  const dispatch = useDispatch();
  return (
    <>
      {ingredients.length < 1 ? (
        <NoIngredientsContainer>
          <Icon icon="Archive" size={36} color="var(--hero-linear-1)" />
          <IngredientsTitle>Your ingredients will appear here</IngredientsTitle>
        </NoIngredientsContainer>
      ) : (
        <IngredientsContainer layout transition={{ duration: 0.3, ease: "easeInOut" }}>
          {ingredients.map((ingredient: Ingredient) => (
            <IngredientBox key={ingredient.name} ingredient={ingredient}></IngredientBox>
          ))}
        </IngredientsContainer>
      )}
      {/* These are temporary inputs for testing */}
      <input
        value={ingredient}
        onChange={(event) => {
          setIngredient(event.target.value);
        }}
      ></input>
      <Button
        variant="secondary"
        onClick={() => {
          dispatch({
            type: "addIngredient",
            ingredient: {
              name: ingredient,
              amount: 3,
              unit: "tsp"
            }
          });
        }}
      >
        New Ingredient...
      </Button>
    </>
  );
}

const NoIngredientsContainer = styled(motion.ul)({
  margin: "36px 0 12px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "24px",
  borderRadius: "8px",
  minHeight: "220px",
  height: "fit-content",

  flexDirection: "column",
  border: "1px solid var(--hero-linear-1)",
  color: "var(--hero-linear-1)",
  maxWidth: "450px",
  width: "100%"
});

const IngredientsTitle = styled("h1")({
  fontSize: `${18 / 16}rem`,
  fontWeight: "400",
  textAlign: "center"
});

const IngredientsContainer = styled(NoIngredientsContainer)({
  flexDirection: "row",
  flexWrap: "wrap",
  border: "1px solid var(--accent-400)",
  color: "var(--text-950)",
  maxWidth: "600px",
  minWidth: "450px",
  width: "fit-content",
  listStyleType: "none"
});

export default IngredientSection;
