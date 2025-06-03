import React from "react";
import { styled, css } from "@pigment-css/react";
import Button from "@components/Button";
import AdjectiveRecipes from "@components/AdjectiveRecipes";
import RecipeSection from "@components/RecipeSection";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Hero>
        <MaxWidthWrapper>
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
        </MaxWidthWrapper>
      </Hero>
      {/* The content underneath the hero */}
      <MaxWidthWrapper>
        <Image
          className={Fridge}
          src="/FridgeL.png"
          alt="Fridge"
          width={848}
          height={1470}
        />

        <RecipeSection />
      </MaxWidthWrapper>
    </>
  );
}

const MaxWidthWrapper = styled("div")({
  height: "100%",
  padding: "0 96px",
  position: "relative",
});

const Hero = styled("div")({
  height: `calc(${500 / 16}rem + var(--nav-height) + var(--nav-margin))`,
  position: "relative",
  background: `
      radial-gradient(circle at top left, var(--hero-radial-1) 0%, var(--hero-radial-2) 63%, var(--hero-radial-3) 100%),
      linear-gradient(var(--hero-linear-1) 0%, var(--hero-linear-2) 96%, var(--background-50) 100%)
    `,
  backgroundBlendMode: "multiply",
  marginTop: "calc(-1 * var(--nav-height) - var(--nav-margin))",
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

const Fridge = css({
  position: "absolute",
  right: 0,
  top: 0,
});
