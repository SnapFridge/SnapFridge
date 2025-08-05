"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import IngredientBox from "./Ingredient";
import { useInputState } from "../InputProvider";
import Button from "@components/Button";
import { useState, type FormEvent } from "react";
import IngredientDialog from "../IngredientDialog";
import { motion } from "motion/react";
import getRecipesJSON from "./actions";
import { scaleClamped, type Recipe } from "@utils";
import Switch from "@components/Switch";
import ToggleGroup from "./ToggleGroup";

function IngredientSection() {
  const { state, dispatch } = useInputState();
  const { ingredients, recipes } = state;

  const [ignorePantry, setIgnorePantry] = useState(true);
  const [ranking, setRanking] = useState("2");

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
          <Icon icon="Archive" size={36} color="var(--gray-600)" />
          <IngredientTitle>Your ingredients will appear here</IngredientTitle>
        </NoIngredientContainer>
      ) : (
        <IngredientContainer>
          <IngredientDialog />
          <IngredientList layout>
            {Array.from(ingredients).map(([k, v]) => (
              <IngredientBox key={k} ingredient={v} />
            ))}
          </IngredientList>
        </IngredientContainer>
      )}
      <SpoonacularForm onSubmit={(e) => void fetchSpoonacular(e)}>
        <Switch
          label="Ignore Typical Pantry Items (water, flour, etc)"
          checked={ignorePantry}
          onCheckedChange={setIgnorePantry}
          disabled={recipes === "pending"}
        />
        <ToggleGroup
          onValueChange={(value) => {
            if (value) setRanking(value);
          }}
          value={ranking}
          disabled={recipes === "pending"}
        />
        <SpoonacularButton variant="primary" type="submit">
          Find Recipes
        </SpoonacularButton>
      </SpoonacularForm>
    </>
  );
}

const IngredientTitle = styled("h1")({
  color: "var(--gray-600)",
  fontSize: `${18 / 16}rem`,
  fontWeight: "400",
  textAlign: "center",
  padding: "0 24px",
});

const BothContainer = styled("div")({
  position: "relative",
  margin: "24px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  borderRadius: "8px",
  minHeight: "220px",
  height: "fit-content",
  width: "100%",
});

const NoIngredientContainer = styled(BothContainer)({
  flexDirection: "column",
  border: "1px solid var(--gray-600)",
});

const IngredientContainer = styled(BothContainer)({
  border: "1px solid var(--accent-400)",
});

const IngredientList = styled(motion.ul)({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  padding: "44px 20px 20px",
  rowGap: "13px",
  justifyContent: "space-around",
  maxHeight: "50vh",
  overflow: "auto",
});

const SpoonacularForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "& > *": {
    marginBottom: "24px",
  },
});

const SpoonacularButton = styled(Button)({
  background: "var(--primary-700)",
  color: "var(--text-50)",
  width: "200px",

  "&:hover:not(:disabled)": {
    background: "var(--primary-600)",
  },
});

export default IngredientSection;
