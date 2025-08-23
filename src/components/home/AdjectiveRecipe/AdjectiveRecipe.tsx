"use client";

import { styled } from "@pigment-css/react";
import { ON_MOBILE } from "@utils";
import useTypewriter from "./typewritter.helper";

function shuffle<T>(arr: T[]) {
  let i = arr.length;
  while (i > 0) {
    const j = Math.floor(Math.random() * i--);
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

const ADJECTIVES = shuffle([
  "Delicious",
  "Excellent",
  "Wonderful",
  "Amazing",
  "Incredible",
  "Fantastic",
  "Superb",
  "Marvelous",
  "Magnificent",
  "Spectacular",
  "Fabulous",
  "Brilliant",
  "Exceptional",
  "Remarkable",
  "Splendid",
  "Stunning",
]);

function AdjectiveRecipes() {
  const adjective = useTypewriter(ADJECTIVES);

  return (
    <Description>
      <Adjective>{adjective}</Adjective> recipes right from your fridge
    </Description>
  );
}

const Description = styled("p")({
  fontSize: "var(--1rem)",
  margin: "8px 0 16px",
  [ON_MOBILE]: {
    textAlign: "center",
  },
});

const Adjective = styled("span")({
  color: "#4dc9ff",
  fontWeight: 700,
});

export default AdjectiveRecipes;
