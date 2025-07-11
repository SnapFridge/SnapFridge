"use client";

import { styled } from "@pigment-css/react";
import useTypewriter from "./typewritter.helper";
import { ON_MOBILE } from "@components/Global";

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
  color: "hsl(198 100% 65%)",
  fontWeight: "bold",
});

export default AdjectiveRecipes;
