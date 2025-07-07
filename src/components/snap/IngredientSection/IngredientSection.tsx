"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import IngredientBox from "./Ingredient";
import { useInputState } from "../InputProvider";
import Button from "@components/Button";
import { useState, type FormEvent } from "react";
import RecipeDialog from "../RecipeDialog";
import Input from "@components/Input";
import { ul } from "motion/react-client";
import getRecipesJSON from "./actions";

function IngredientSection() {
  const { state } = useInputState();
  const { ingredients } = state;

  const [allIngredients, setAllIngredients] = useState<string[]>([]);
  const [allUnits, setAllUnits] = useState<string[]>([]);

  const [ingredient, setIngredient] = useState("");
  const [unit, setUnit] = useState("");
  const [amount, setAmount] = useState(0);

  const [ignorePantry, setIgnorePantry] = useState(true);
  const [ranking, setRanking] = useState(2);
  const [pending, setPending] = useState(false);

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

  async function fetchSpoonacular(e: FormEvent) {
    setPending(true);
    e.preventDefault();
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
    await getRecipesJSON(query);
    setPending(false);
  }

  return (
    <>
      {ingredients.size < 1 ? (
        <NoIngredientContainer>
          <RecipeDialog />
          <Icon icon="Archive" size={36} color="var(--text-950)" />
          <IngredientTitle>Your ingredients will appear here</IngredientTitle>
        </NoIngredientContainer>
      ) : (
        <IngredientContainer
          as={ul}
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <RecipeDialog />
          {Array.from(ingredients).map(([k, v]) => (
            <IngredientBox key={k} ingredient={v} />
          ))}
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
      <form onSubmit={(e) => fetchSpoonacular(e)}>
        <Input
          type="checkbox"
          label="Ignore typical pantry Items (water, salt, flour, etc)"
          onChange={(newVal: boolean) => setIgnorePantry(newVal)}
          checked={ignorePantry}
        />
        <Input
          type="radio"
          label="Maximize used ingredients"
          name="ranking"
          value={1}
          checked={ranking === 1}
          onChange={() => setRanking(1)}
        />
        <Input
          type="radio"
          label="Minimize missing ingredients"
          name="ranking"
          value={2}
          checked={ranking === 2}
          onChange={() => setRanking(2)}
        />
        <Button variant="secondary" type="submit">
          Get recipe from spoonacular
        </Button>
      </form>
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
const BothContainer = styled("div")({
  position: "relative",
  margin: "36px 0 12px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "24px",
  borderRadius: "8px",
  minHeight: "220px",
  height: "fit-content",
});

const NoIngredientContainer = styled(BothContainer)({
  flexDirection: "column",
  border: "1px solid var(--text-950)",
  opacity: 0.55,
  maxWidth: "450px",
  width: "100%",
});

const IngredientContainer = styled(BothContainer)({
  flexDirection: "row",
  flexWrap: "wrap",
  border: "1px solid var(--accent-400)",
  maxWidth: "600px",
  minWidth: "450px",
  width: "fit-content",
});

export default IngredientSection;
