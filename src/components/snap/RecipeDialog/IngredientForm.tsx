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

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);
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
            name,
            amount,
            unit: unit || "count",
          },
        });
      }}
    >
      <SuggestedInput
        value={name}
        label="Enter Ingredient Name:"
        suggestions={allIngredients}
        onChange={(newVal: string) => {
          setName(newVal);
        }}
        required
        className={LimitedWidth}
      />
      <Input
        label="Enter Amount:"
        type="number"
        value={`${amount}`}
        onChange={(newVal) => {
          const num = Number(newVal);
          if (Number.isNaN(num) || num < 1 || !Number.isInteger(num)) {
            return;
          }
          setAmount(num);
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
