"use client";
import RecipeSection from "@components/RecipeSection";
import { useInputState } from "../InputProvider";

function RecipeHolder() {
  const { state } = useInputState();

  return (
    <>
      <RecipeSection recipes={state.recipes} />
      <RecipeSection headerTxt="Previous Snaps" />
    </>
  );
}

export default RecipeHolder;
