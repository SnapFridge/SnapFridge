"use client";

import { styled } from "@pigment-css/react";
import Icon from "@components/Icon";
import IngredientBox from "./Ingredient";
import { useInputState } from "../InputProvider";
import Button from "@components/Button";
import { useState } from "react";
import RecipeDialog from "../RecipeDialog";
import Input from "@components/Input";
import { ul } from "motion/react-client";

function IngredientSection() {
  const { state } = useInputState();
  const { ingredients } = state;

  const [includePantry, setIncludePantry] = useState(true);
  const [ranking, setRanking] = useState(2);

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
      <form>
        <Input
          type="checkbox"
          label="Include Typical Pantry Items (water, salt, flour, etc)"
          onChange={(newVal: boolean) => setIncludePantry(newVal)}
          checked={includePantry}
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
