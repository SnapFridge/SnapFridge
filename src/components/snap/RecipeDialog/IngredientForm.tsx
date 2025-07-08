"use client";
import { useInputState } from "../InputProvider";
import { useState } from "react";
import useSWR from "swr";
import SuggestedInput from "@components/SuggestedInput";
import Input from "@components/Input";
import Button from "@components/Button";
import { css } from "@pigment-css/react";

const textFetcher = (url: string) =>
  fetch(url)
    .then((r) => r.text())
    .then((text) => text.split("\n"));

function IngredientForm() {
  const { dispatch } = useInputState();

  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("");

  const { data: allIngredients } = useSWR("/ingredients.txt", textFetcher, {
    suspense: true,
  });
  const { data: allUnits } = useSWR("/units.txt", textFetcher, { suspense: true });

  return (
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
        className={LimitedWidth}
      />
      <Input
        label="Enter Amount:"
        type="number"
        value={isNaN(amount) || amount < 1 ? "" : amount.toString()}
        onChange={(newVal) => {
          setAmount(Number(newVal));
        }}
        required
        className={LimitedWidth}
      />
      <SuggestedInput
        value={unit}
        label="Enter Unit (leave blank for unitless):"
        suggestions={allUnits}
        onChange={(newVal: string) => {
          setUnit(newVal);
        }}
        className={LimitedWidth}
      />
      <Button type="submit" variant="secondary">
        New Ingredient...
      </Button>
    </form>
  );
}

const LimitedWidth = css({
  maxWidth: "100%",
  marginBottom: "10px",
});

export default IngredientForm;
