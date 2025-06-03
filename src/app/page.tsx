import React from "react";
import { styled } from "@pigment-css/react";
import Button from "@components/Button";
import AdjectiveRecipes from "@components/AdjectiveRecipes";

export default function Page() {
  return (
    <Main>
      <Hero>
        <TitleWrapper>
          <Title>SnapFridge</Title>
          <AdjectiveRecipes />
          <ButtonWrapper>
            <Button
              as="a"
              href="/about"
              style={{ textDecoration: "none" }}
              styling="secondary"
            >
              About Us
            </Button>
            <Button
              as="a"
              href="/"
              style={{ textDecoration: "none" }}
              styling="primary"
            >
              Get Started
            </Button>
          </ButtonWrapper>
        </TitleWrapper>
      </Hero>
    </Main>
  );
}

const Main = styled("div")({
  padding: "0 96px",
  color: "var(--text-950)",
});

const Hero = styled("div")({
  height: `${500 / 16}rem`,
  position: "relative",
});

const TitleWrapper = styled("div")({
  height: "fit-content",
  position: "absolute",
  top: 0,
  bottom: 0,
  margin: "auto",
});

const Title = styled("h1")({
  fontSize: `${80 / 16}rem`,
});

const ButtonWrapper = styled("div")({
  display: "flex",
  gap: "20px",
});
