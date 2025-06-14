"use client";

import { useState } from "react";
import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";

interface Ingredient {
  name: string,
  quantity: number,
  measurement: string,
}

function IngredientUpload() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  function addIngredient() {
    setIngredients([...ingredients, { name: 'ingredient', quantity: 3, measurement: "tsp" }]);
  }

  if (!ingredients.length) {
    return (
      <>
        <NoIngredientsContainer>
          <Icon icon="Archive" size={36} color="var(--hero-linear-1)" />
          <IngredientsTitle>Your ingredients will appear here</IngredientsTitle>
        </NoIngredientsContainer>   

        <button onClick={addIngredient}>Add</button>   
      </>

    )
  }

  return (
    <>
      <IngredientsContainer>
        {ingredients.map((ingredient: Ingredient, index: number) => (
          <Ingredient key={`${ingredient.name}${index}`}>
            <p>{ingredient.name}</p>
            <p>{ingredient.quantity} {ingredient.measurement}</p>
          </Ingredient>          
        ))}
      </IngredientsContainer>  

      <button onClick={addIngredient}>Add</button>   
    </>
  )
}

const NoIngredientsContainer = styled('div')({
  marginTop: "36px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  gap: "12px",
  padding: "24px",
  border: "1px solid var(--hero-linear-1)",
  borderRadius: "8px",
  color: "var(--hero-linear-1)",

  maxWidth: "450px",
  width: "100%",
  height: "fit-content",
  minHeight: "220px",
}); 

const IngredientsTitle = styled('h1')({
  fontSize: `${18 /16}rem`,
  fontWeight: "400",
});


const IngredientsContainer = styled('ul')({
  marginTop: "36px",

  display: "flex",
  flexWrap: "wrap",

  gap: "12px",
  padding: "24px",
  border: "1px solid var(--accent-400)",
  borderRadius: "8px",
  color: "var(--text-950)",

  maxWidth: "450px",
  width: "100%",
  height: "fit-content",
  minHeight: "220px",

  listStyleType: "none",
});

const Ingredient = styled('li')({
  display: "flex",
  gap: "8px",
  backgroundColor: "var(--accent-200)",
  padding: "8px 12px",
  borderRadius: "999px",
  height: "38px",

  width: "fit-content",
  border: "2px solid var(--accent-400)",
  boxShadow: "var(--shadow)",
});



export default IngredientUpload;