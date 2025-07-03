"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import IngredientBox from "./Ingredient";
import { motion } from "motion/react";
import { useInputState } from "../InputProvider";
import Button from "@components/Button";
import { useState, useEffect } from "react";
import AppDialog from "@components/Dialog";
import { Input, SuggestedInput } from "@components/Input";

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
    const allIngredientsStr = await (await fetch("/Ingredients.txt", opts)).text();
    setAllIngredients(allIngredientsStr.split("\n"));
    const allUnits = await (await fetch("/Units.txt", opts)).text();
    setAllUnits(allUnits.split("\n"));
  }

  useEffect(() => void fetchData(), []);

  function ingredients2Tags() {
    const tags = [];
    for (const [k, v] of ingredients) {
      tags.push(<IngredientBox key={k} ingredient={v} />);
    }
    return tags;
  }
  return (
    <>
      {ingredients.size < 1 ? (
        <NoIngredientsContainer>
          <Icon icon="Archive" size={36} color="var(--hero-linear-1)" />
          <IngredientsTitle>Your ingredients will appear here</IngredientsTitle>
        </NoIngredientsContainer>
      ) : (
        <IngredientsContainer layout transition={{ duration: 0.3, ease: "easeInOut" }}>
          {ingredients2Tags()}
        </IngredientsContainer>
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
  width: "100%",
});

const IngredientsTitle = styled("h1")({
  fontSize: `${18 / 16}rem`,
  fontWeight: "400",
  textAlign: "center",
});

const IngredientsContainer = styled(NoIngredientsContainer)({
  flexDirection: "row",
  flexWrap: "wrap",
  border: "1px solid var(--accent-400)",
  color: "var(--text-950)",
  maxWidth: "600px",
  minWidth: "450px",
  width: "fit-content",
  listStyleType: "none",
});

export default IngredientSection;
