"use client";

import * as React from "react";
import { styled } from "@pigment-css/react";
import useTypewriter from "./typewritter.helper";

const ADJECTIVES = ["Delicious", "Excellent", "Wonderful", "Amazing", "Supercalifragilisticexpialidocious"];

function AdjectiveRecipes() {
  const adjective = useTypewriter(ADJECTIVES);

  return (
    <Description>
      <Adjective>{adjective}</Adjective> recipes from your fridge
    </Description>
  );
}

const Description = styled("p")({
  fontSize: `${18 / 16}rem`,
  marginTop: "8px",
  marginBottom: "16px",
});

const Adjective = styled("span")({
  color: "hsl(198 100% 65%  )",
  fontWeight: "bold",
});

export default AdjectiveRecipes;
