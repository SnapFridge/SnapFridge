"use client";

import Button from "@components/Button";
import Icon from "@components/Icon";
import Switch from "@components/Switch";
import { styled } from "@pigment-css/react";
import { type Recipe } from "@utils";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import IngredientDialog from "../IngredientDialog";
import { useInputState } from "../InputProvider";
import getRecipesJSON from "./actions";
import IngredientBox from "./Ingredient";
import ToggleGroup from "./ToggleGroup";

function IngredientSection() {
  const {
    state: { ingredients, recipes },
    dispatch,
  } = useInputState();

  const [ignorePantry, setIgnorePantry] = useState(true);
  const [ranking, setRanking] = useState("2");

  async function fetchSpoonacular(e: FormEvent) {
    e.preventDefault();
    if (ingredients.length < 1) {
      return;
    }

    dispatch({
      type: "setPendingSpoonacular",
    });

    let ingredientsStr = "";
    for (const ingredient of ingredients) {
      ingredientsStr += ingredient;
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
      <Container>
        <IngredientDialog />
        {ingredients.length < 1 ? (
          <>
            <Icon icon="Archive" size={36} color="var(--gray-600)" />
            <IngredientTitle>Your ingredients will appear here</IngredientTitle>
          </>
        ) : (
          <IngredientList layout>
            {ingredients.map((i) => (
              <IngredientBox key={i} ingredient={i} />
            ))}
          </IngredientList>
        )}
      </Container>
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

const IngredientTitle = styled("p")({
  color: "var(--gray-600)",
  fontSize: `${18 / 16}rem`,
  textAlign: "center",
  padding: "0 24px",
});

const IngredientList = styled(motion.ul)({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  padding: "44px 20px 20px",
  rowGap: "13px",
  columnGap: "6px",
  justifyContent: "space-around",
  maxHeight: "50vh",
  overflow: "auto",
  scrollbarWidth: "none",
});

const Container = styled("div")({
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
  flexDirection: "column",
  border: "1px solid var(--gray-600)",

  [`&:has(${IngredientList})`]: {
    borderColor: "var(--accent-400)",
  },
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
