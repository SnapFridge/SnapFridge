"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import IngredientBox from "./Ingredient";
import { useInputState } from "../InputProvider";
import Button from "@components/Button";
import { useState, type FormEvent } from "react";
import IngredientDialog from "../IngredientDialog";
import Input from "@components/Input";
import { motion } from "motion/react";
import getRecipesJSON from "./actions";
import { type Recipe } from "@utils";
import Switch from "@components/Switch";

function IngredientSection() {
  const { state, dispatch } = useInputState();
  const { ingredients, recipes } = state;

  const [ignorePantry, setIgnorePantry] = useState(true);
  const [ranking, setRanking] = useState(2);

  async function fetchSpoonacular(e: FormEvent) {
    e.preventDefault();
    if (ingredients.size === 0) {
      return;
    }
    dispatch({
      type: "setPendingSpoonacular",
    });

    let ingredientsStr = "";
    for (const [, ingredient] of ingredients) {
      ingredientsStr += ingredient.name;
      ingredientsStr += ",";
    }
    const query = new URLSearchParams({
      ingredients: ingredientsStr,
      ranking: `${ranking}`,
      ignorePantry: `${ignorePantry}`,
    }).toString();
    const json = await getRecipesJSON(query);
    dispatch({
      type: "addRecipes",
      recipes: JSON.parse(json) as Recipe[],
    });
  }

  return (
    <>
      {ingredients.size < 1 ? (
        <NoIngredientContainer>
          <IngredientDialog />
          <Icon icon="Archive" size={36} color="var(--gray-500)" />
          <IngredientTitle>Your ingredients will appear here</IngredientTitle>
        </NoIngredientContainer>
      ) : (
        <IngredientContainer
          as={motion.ul}
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <IngredientDialog />
          {Array.from(ingredients).map(([k, v]) => (
            <IngredientBox key={k} ingredient={v} />
          ))}
        </IngredientContainer>
      )}
      <form onSubmit={(e) => void fetchSpoonacular(e)}>
        <Switch
          labelText="Ignore Typical Pantry Items (water, flour, etc)"
          checked={ignorePantry}
          onCheckedChange={setIgnorePantry}
          disabled={recipes === "pending"}
        />

        <Input
          type="radio"
          label="Maximize used ingredients"
          name="ranking"
          value={1}
          checked={ranking === 1}
          onChange={() => setRanking(1)}
          disabled={recipes === "pending"}
        />
        <Input
          type="radio"
          label="Minimize missing ingredients"
          name="ranking"
          value={2}
          checked={ranking === 2}
          onChange={() => setRanking(2)}
          disabled={recipes === "pending"}
        />

        <div>
          <Button variant="secondary" type="submit">
            Get recipe from spoonacular
          </Button>
        </div>
      </form>
    </>
  );
}
const IngredientTitle = styled("h1")({
  color: "var(--gray-500)",

  fontSize: `${18 / 16}rem`,
  fontWeight: "400",
  textAlign: "center",
  padding: "0 24px",
});

const BothContainer = styled("div")({
  position: "relative",
  margin: "36px 0 12px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  borderRadius: "8px",
  minHeight: "220px",
  height: "fit-content",
  width: "min(100%, 500px)",
});

const NoIngredientContainer = styled(BothContainer)({
  flexDirection: "column",
  border: "1px solid var(--gray-500)",
});

const IngredientContainer = styled(BothContainer)({
  flexDirection: "row",
  flexWrap: "wrap",
  border: "1px solid var(--accent-400)",
  opacity: 1,
  maxHeight: "50vh",
  overflow: "auto",
});

export default IngredientSection;
