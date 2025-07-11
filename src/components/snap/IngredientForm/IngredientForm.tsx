"use client";
import { useState } from "react";
import useSWR from "swr";
import SuggestedInput from "@components/SuggestedInput";
import Input from "@components/Input";
import Button from "@components/Button";
import { useInputState } from "../InputProvider";
import { css } from "@pigment-css/react";

interface Props extends React.PropsWithChildren {
  defaultIngredient?: string;
  defaultAmount?: number;
  defaultUnit?: string;
  onSubmitSuccess: () => void;
}

interface AddProps extends Props {
  variant: "addIngredient";
}

interface EditProps extends Props {
  variant: "editIngredient";
}

const textFetcher = (url: string) =>
  fetch(url)
    .then((r) => r.text())
    .then((text) => text.split("\n"));

function IngredientForm({
  defaultIngredient,
  defaultAmount,
  defaultUnit,
  variant,
  onSubmitSuccess,
}: AddProps | EditProps) {
  const { dispatch } = useInputState();

  const [ingredient, setIngredient] = useState(defaultIngredient ?? "");
  const [amount, setAmount] = useState(defaultAmount ?? 1);
  const [unit, setUnit] = useState(defaultUnit ?? "");

  const { data: allIngredients } = useSWR("/ingredients.txt", textFetcher, {
    suspense: true,
  });
  const { data: allUnits } = useSWR("/units.txt", textFetcher, { suspense: true });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (variant === "addIngredient") {
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
        disabled={variant === "editIngredient"}
        className={LimitedWidth}
      />
      <Button type="submit" variant="secondary">
        {variant === "addIngredient" ? "New Ingredient" : "Edit Ingredient"}
      </Button>
    </form>
  );
}

const LimitedWidth = css({
  maxWidth: "100%",
  margin: "0 0 10px",
});

export default IngredientForm;
