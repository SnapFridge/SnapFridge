"use client";
import RecipeSection from "@components/RecipeSection";
import { useInputState } from "../InputProvider";
import Button from "@components/Button";
import { useState } from "react";

function RecipeHolder() {
  const { state } = useInputState();
  const [visibleRecipes, setVisibleRecipes] = useState(3);

  function handleViewMore() {
    let newVisible = visibleRecipes + 3;

    if (newVisible > state.recipes.length) {
      // TODO: Figure out how to fetch more recipes from spoonacular
      setVisibleRecipes(state.recipes.length);
    } else {
      setVisibleRecipes(newVisible);
    }
  }

  return (
    <>
      <div>
        <RecipeSection recipes={state.recipes.slice(0, visibleRecipes)} />
        {state.recipes.length > 0 && (
          <Button variant="primary" onClick={handleViewMore}>
            View More
          </Button>
        )}
      </div>

      <RecipeSection headerTxt="Previous Snaps" />
    </>
  );
}

export default RecipeHolder;
