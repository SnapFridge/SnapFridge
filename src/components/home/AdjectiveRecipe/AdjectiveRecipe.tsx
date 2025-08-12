"use client";

import { styled } from "@pigment-css/react";
import { ON_MOBILE } from "@utils";
import useTypewriter from "./typewritter.helper";

const ADJECTIVES = ["Delicious", "Excellent", "Wonderful", "Amazing", "Incredible"];

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
