"use client";
import { useState, type PropsWithChildren } from "react";
import useSWR from "swr";
import SuggestedInput from "@components/SuggestedInput";
import Input from "@components/Input";
import Button from "@components/Button";
import { useInputState } from "../InputProvider";
import { css } from "@pigment-css/react";

interface Props extends PropsWithChildren {
  defaultIngredient?: string;
  defaultAmount?: number;
  defaultUnit?: string;
  variant: "add" | "edit";
  onSubmitSuccess: () => void;
}

async function fetcher(url: string) {
  const r = await fetch(url);
  const text = await r.text();
  const map = new Map<string, string[]>();
  for (const entry of text.split("\n")) {
    const [ingredient, unitsStr] = entry.split(";");
    map.set(ingredient!, unitsStr!.split(","));
  }
  return map;
}

function IngredientForm({
  defaultIngredient,
  defaultAmount,
  defaultUnit,
  variant,
  onSubmitSuccess,
}: Props) {
  const { dispatch } = useInputState();
  const [ingredient, setIngredient] = useState(defaultIngredient ?? "");
  const [amount, setAmount] = useState(defaultAmount ?? 1);
  const [unit, setUnit] = useState(defaultUnit ?? "");
  const { data: ingredient_units } = useSWR("/functions/ingredient-unit.csv", fetcher, {
    suspense: true,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (variant === "add") {
          dispatch({
            type: "addIngredient",
            ingredient: {
              name: ingredient,
              amount: amount || 0,
              unit,
            },
          });
          onSubmitSuccess();
        } else {
          dispatch({
            type: "editIngredient",
            old: {
              name: defaultIngredient || "",
              amount: defaultAmount || 0,
              unit: defaultUnit || "",
            },
            new: {
              name: ingredient,
              amount: amount || 0,
              unit,
            },
          });
          onSubmitSuccess();
        }
      }}
    >
      <SuggestedInput
        autoFocus
        value={ingredient}
        label="Enter Ingredient Name:"
        suggestions={[...ingredient_units.keys()]}
        onChange={(newVal: string) => {
          setIngredient(newVal);
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
        suggestions={ingredient_units.get(ingredient) ?? []}
        onChange={(newVal: string) => {
          setUnit(newVal);
        }}
        disabled={variant === "edit"}
        className={LimitedWidth}
      />
      <Button type="submit" variant="secondary">
        {variant === "add" ? "New Ingredient" : "Edit Ingredient"}
      </Button>
    </form>
  );
}

const LimitedWidth = css({
  maxWidth: "100%",
  margin: "0 0 10px",
});

export default IngredientForm;
