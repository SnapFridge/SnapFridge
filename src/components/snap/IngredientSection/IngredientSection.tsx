"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import IngredientBox from "./Ingredient";
import { useInputState } from "../InputProvider";
import Button from "@components/Button";
import { useState, useEffect } from "react";
import AppDialog from "@components/Dialog";
import { Input, SuggestedInput } from "@components/Input";
import { ul } from "motion/react-client";

function IngredientSection() {
  const { state, dispatch } = useInputState();
  const { ingredients } = state;

  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("");
  const [allIngredients, setAllIngredients] = useState<string[]>([]);
  const [allUnits, setAllUnits] = useState<string[]>([]);

  // Only fetch ingredients for now, units will come later
  async function fetchData() {
    const opts: RequestInit = {
      cache: "force-cache",
    };
    const urls = ["/Ingredients.txt", "/Units.txt"];
    const promises = urls.map((url) =>
      fetch(url, opts)
        .then((r) => r.text())
        .then((text) => text.split("\n"))
    );
    const [allIngredients, allUnits] = await Promise.all(promises);
    setAllIngredients(allIngredients!);
    setAllUnits(allUnits!);
  }
  useEffect(() => void fetchData(), []);

  function ingredients2Tags() {
    const tags = [];
    for (const [k, v] of ingredients) {
      tags.push(<IngredientBox key={k} ingredient={v} />);
    }
    return tags;
  }

  async function getRecipes() {
    // Convert the map of ingredients to a string of ingredients separated by commas
    const ingredientsList = [];
    for (const item of ingredients) {
      ingredientsList.push(item[1].name);
    }

    const res = await fetch("/api/spoonacular", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: ingredientsList.join(","),
    });
    const returnedRecipes = await res.json();

    dispatch({
      type: "addRecipes",
      recipes: returnedRecipes,
    });
  }

  return (
    <>
      {ingredients.size < 1 ? (
        <NoIngredientContainer>
          <Icon icon="Archive" size={36} color="var(--text-950)" />
          <IngredientTitle>Your ingredients will appear here</IngredientTitle>
        </NoIngredientContainer>
      ) : (
        <IngredientContainer layout transition={{ duration: 0.3, ease: "easeInOut" }}>
          {ingredients2Tags()}
        </IngredientContainer>
      )}
      {/* These are temporary inputs for testing */}
      <AppDialog
        title="Hello, World!"
        description="Don't trust atoms because they make up everything!"
        trigger={<Button variant="secondary">Open Dialog</Button>}
      >
        <p>This is just a thing lol</p>
      </AppDialog>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: "addIngredient",
            ingredient: {
              name: ingredient,
              amount: amount,
              unit: unit || "count",
            },
          });
        }}
      >
        <SuggestedInput
          value={ingredient}
          label="Enter Ingredient Name:"
          suggestions={allIngredients}
          onChange={(newVal: string) => {
            setIngredient(newVal);
          }}
          required
        />
        <Input
          label="Enter Amount:"
          type="number"
          value={isNaN(amount) || amount < 1 ? "" : amount.toString()}
          onChange={(newVal) => {
            setAmount(Number(newVal));
          }}
          required
        />
        <SuggestedInput
          value={unit}
          label="Enter Unit (leave blank for unitless):"
          suggestions={allUnits}
          onChange={(newVal: string) => {
            setUnit(newVal);
          }}
        />
        <Button type="submit" variant="secondary">
          New Ingredient...
        </Button>
      </form>
      <Button variant="secondary" onClick={getRecipes}>
        Get recipe from spoonacular
      </Button>
    </>
  );
}
const IngredientTitle = styled("h1")({
  color: "var(--text-950)",

  fontSize: `${18 / 16}rem`,
  fontWeight: "400",
  textAlign: "center",
});

// It's different type, I don't think there is any other way
const BothContainer = {
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

const NoIngredientContainer = styled("div")({
  ...BothContainer,
  flexDirection: "column",
  border: "1px solid var(--text-950)",
  opacity: 0.55,
  maxWidth: "450px",
  width: "100%",
});

const IngredientContainer = styled(ul)({
  ...BothContainer,
  flexDirection: "row",
  flexWrap: "wrap",
  border: "1px solid var(--accent-400)",
  maxWidth: "600px",
  minWidth: "450px",
  width: "fit-content",
});

export default IngredientSection;
