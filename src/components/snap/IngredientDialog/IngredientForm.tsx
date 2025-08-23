"use client";
import Button from "@components/Button";
import SuggestedInput from "@components/SuggestedInput";
import { css } from "@pigment-css/react";
import { type PropsWithChildren, useState } from "react";
import useSWR from "swr";
import { useInputState } from "../InputProvider";

interface Props extends PropsWithChildren {
  onSubmitSuccess: () => void;
}

async function fetcher(url: string) {
  const r = await fetch(url);
  const text = await r.text();
  return text.split("\n");
}

function IngredientForm({ onSubmitSuccess }: Props) {
  const {
    dispatch,
    state: { ingredients },
  } = useInputState();
  const [ingredient, setIngredient] = useState("");
  const { data: allIngredients } = useSWR("/functions/ingredients.csv", fetcher, {
    suspense: true,
  });
  const choosableIngredients = allIngredients.filter((i) => !ingredients.includes(i));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: "addIngredient",
          ingredient,
        });
        onSubmitSuccess();
      }}
    >
      <SuggestedInput
        autoFocus
        value={ingredient}
        label="Enter Ingredient Name:"
        suggestions={choosableIngredients}
        onChange={(newVal: string) => {
          setIngredient(newVal);
        }}
        required
        className={LimitedWidth}
      />
      <Button className={NewButton} type="submit" variant="secondary">
        New Ingredient
      </Button>
    </form>
  );
}

const LimitedWidth = css({
  maxWidth: "100%",
  margin: "0 0 10px",
});

const NewButton = css({
  margin: "10px 0 0",
});

export default IngredientForm;
