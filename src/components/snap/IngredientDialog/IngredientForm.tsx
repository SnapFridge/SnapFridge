"use client";
import { useState } from "react";
import useSWR from "swr";
import SuggestedInput from "@components/SuggestedInput";
import Input from "@components/Input";
import Button from "@components/Button";
import { useInputState } from "../InputProvider";
import { css } from "@pigment-css/react";
import { Close } from "@radix-ui/react-dialog";

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

<<<<<<<< HEAD:src/components/snap/IngredientDialog/IngredientForm.tsx
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState("");
========
  const [ingredient, setIngredient] = useState(defaultIngredient ?? "");
  const [amount, setAmount] = useState(defaultAmount ?? 0);
  const [unit, setUnit] = useState(defaultUnit ?? "");
>>>>>>>> 0cedff9 (Edit Dialog):src/components/snap/IngredientForm/IngredientForm.tsx

  const { data: allIngredients } = useSWR("/Ingredients.txt", textFetcher, {
    suspense: true,
  });
  const { data: allUnits } = useSWR("/Units.txt", textFetcher, { suspense: true });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
<<<<<<<< HEAD:src/components/snap/IngredientDialog/IngredientForm.tsx
        dispatch({
          type: "addIngredient",
          ingredient: {
            name,
            amount,
            unit: unit || "count",
          },
        });
========
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
>>>>>>>> 0cedff9 (Edit Dialog):src/components/snap/IngredientForm/IngredientForm.tsx
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
        disabled={variant === "editIngredient"}
        className={LimitedWidth}
      />
<<<<<<<< HEAD:src/components/snap/IngredientDialog/IngredientForm.tsx
      <Button as={Close} type="submit" variant="secondary">
        New Ingredient...
========
      <Button type="submit" variant="secondary">
        {variant === "addIngredient" ? "New Ingredient" : "Edit Ingredient"}
>>>>>>>> 0cedff9 (Edit Dialog):src/components/snap/IngredientForm/IngredientForm.tsx
      </Button>
    </form>
  );
}

const LimitedWidth = css({
  maxWidth: "100%",
  marginBottom: "10px",
});

export default IngredientForm;
