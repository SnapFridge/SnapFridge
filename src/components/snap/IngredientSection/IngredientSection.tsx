"use client";

import { useRef, useState } from "react";
import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import { type Ingredient } from '@components/Global';
import IngredientBox from "./Ingredient";
import { motion } from "motion/react";
import Button from '@components/Button';

type IngredientSectionData = {
  ingredients: Ingredient[],
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>,
};

function IngredientSection({ ingredients, setIngredients }: IngredientSectionData) {
  const [input, setInput] = useState<string>("");
  function addIngredient() {
    if (input !== "") {
      setIngredients([
        ...ingredients,
        { name: input, amount: 3, unit: "tsp" },
      ]);
      setInput("");
    }
  }
  return (
    <>
    {
      ingredients.length < 1 ? 
      <NoIngredientsContainer>
        <Icon icon="Archive" size={36} color="var(--hero-linear-1)" />
        <IngredientsTitle>Your ingredients will appear here</IngredientsTitle>
      </NoIngredientsContainer>
      :
      <IngredientsContainer
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {ingredients.map((ingredient: Ingredient) => (
          <IngredientBox
            key={ingredient.name}
            ingredient={ingredient}
          ></IngredientBox>
        ))}
      </IngredientsContainer>
    }
     <form>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        required
      />
      <NewIngredientBtn variant="secondary" onClick={addIngredient}>New Ingredient...</NewIngredientBtn>
    </form>
    
    </>
  );
}

const BothIngredientContainer = {
  margin: "36px 0 12px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "24px",
  borderRadius: "8px",
  minHeight: "220px",
  height: "fit-content",
};

const NoIngredientsContainer = styled("div")({
  ...BothIngredientContainer,

  flexDirection: "column",
  border: "1px solid var(--hero-linear-1)",
  color: "var(--hero-linear-1)",
  maxWidth: "450px",
  width: "100%",
});

const IngredientsTitle = styled("h1")({
  fontSize: `${18 / 16}rem`,
  fontWeight: "400",
  textAlign: "center",
});

const IngredientsContainer = styled(motion.ul)({
  ...BothIngredientContainer,

  flexWrap: "wrap",
  border: "1px solid var(--accent-400)",
  color: "var(--text-950)",
  maxWidth: "600px",
  minWidth: "450px",
  width: "fit-content",
  listStyleType: "none",
});

const NewIngredientBtn = styled(Button)({

});

export default IngredientSection;
