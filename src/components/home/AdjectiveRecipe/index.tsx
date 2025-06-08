"use client";

import { styled } from "@pigment-css/react";
import useTypewriter from "./typewritter.helper";
import { scaledClamp } from '@components/Global';

const ADJECTIVES = ["Delicious", "Excellent", "Wonderful", "Amazing", "Incredible"];

export default function AdjectiveRecipes() {
  const adjective = useTypewriter(ADJECTIVES);

  return (
    <Description>
      <Adjective>{adjective}</Adjective> recipes right from your fridge
    </Description>
  );
}

const Description = styled("p")({
  fontSize: scaledClamp(18, 22),
  marginTop: "8px",
  marginBottom: "16px",
});

const Adjective = styled("span")({
  color: "hsl(198 100% 65%)",
  fontWeight: "bold",
});
