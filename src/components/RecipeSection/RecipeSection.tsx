"use client";

import { useInputState } from "@components/snap/InputProvider";
import { styled } from "@pigment-css/react";
import { type Recipe, scaleClamped } from "@utils";
import { ChefHat, Sparkles } from "lucide-react";
import { useState } from "react";
import Pagination from "./Pagination";
import RecipeCard from "./RecipeCard";

interface Props {
  headerTxt?: string;
  recipes_?: "pending" | Recipe[];
  countPerPage?: number;
}

function RecipeSection({
  headerTxt = "Recipes Found",
  countPerPage = 2,
  recipes_,
}: Props) {
  const { state } = useInputState();
  const recipes = recipes_ || state.recipes;
  function getPendingCards() {
    const cards = [];
    for (let i = 0; i < countPerPage; ++i) {
      cards.push(<RecipeCard key={i} recipe={undefined} />);
    }
    return cards;
  }
  const [page, setPage] = useState(0);

  function getPageCards() {
    const cards = [];
    const start = page * countPerPage;
    const end = Math.min(start + countPerPage, recipes.length);
    for (let i = start; i < end; ++i) {
      const r = recipes[i] as Recipe;
      cards.push(<RecipeCard key={r.id} recipe={r} />);
    }
    return cards;
  }
  return (
    <>
      <Header>
        <HeaderTxt>{headerTxt}</HeaderTxt>
        <Sparkles size={50} aria-hidden />
      </Header>
      {recipes === "pending" ? (
        <ul>{getPendingCards()}</ul>
      ) : recipes.length < 1 ? (
        <EmptySectionContainer>
          <EmptySectionContent>
            <ChefHat size={50} color="var(--gray-600)" />
            <p>
              Looks like your recipes is empty! Start by adding some ingredients or
              uploading an image!
            </p>
          </EmptySectionContent>
        </EmptySectionContainer>
      ) : (
        <>
          <Pagination
            pageCount={Math.ceil(recipes.length / countPerPage)}
            page={page}
            onChange={(newPage) => setPage(newPage)}
          />
          <ul>{getPageCards()}</ul>
        </>
      )}
    </>
  );
}

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  margin: "0 0 12px",
});

const HeaderTxt = styled("h2")({
  fontSize: scaleClamped(24, 36),
});

const EmptySectionContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  maxWidth: "600px",
  color: "var(--gray-600)",
});

const EmptySectionContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  margin: "0 0 36px",
});

export default RecipeSection;
