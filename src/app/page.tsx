import React from "react";
import { styled, css } from "@pigment-css/react";
import Button from "@components/Button";
import Link from "@components/Link";
import AdjectiveRecipes from "@components/AdjectiveRecipes";
import RecipeSection from "@components/RecipeSection";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Header>
        <Title>SnapFridge</Title>
        <AdjectiveRecipes />
        <ButtonWrapper>
          <Link href="/about">
            <Button styling="primary">About Us</Button>
          </Link>
          <Link href="/">
            <Button styling="secondary">Get Started</Button>
          </Link>
        </ButtonWrapper>
      </Header>
      {/* The content underneath the header */}
      <PageMargin>
        <FridgeSection>
          <FridgeDescSection>
            <div><h2>An app, built just for your fridge</h2></div>
            <div><h2>that scans your food automatically</h2></div>
            <div><h2>to help you prepare meal and reduce food waste</h2></div>
          </FridgeDescSection>
          <Image
            className={Fridge}
            src="/FridgeL.png"
            alt="Fridge"
            width={848}
            height={1470}
          />
        </FridgeSection>
        <RecipeSection className={RecipeSectionCSS}/>
        <StatisticsSection>
          <TopStatistics>
            <h2>Around 30-40% of food gets wasted every year</h2>
            <small>According to the USDA</small>
          </TopStatistics>
          <BottomStatistics>
            <BottomStatistics2>
              <h2>That's <strong>60 Million</strong> tons</h2>
              <h2>Or <strong>120 Billion</strong> pounds</h2>
            </BottomStatistics2>
            <Image
              src='/Landfill.png'
              alt="A landfill worker in a neon vest clearing through a landfill of fruit waste"
              height={700}
              width={700}
            />
          </BottomStatistics>
        </StatisticsSection>
        <CallToActionSection>
            <h2>Join the Fight Against Food Waste Today</h2>
            <Link href="/appidk"><Button styling="primary" className={CoAButtonCSS}>Get Started</Button></Link>
        </CallToActionSection>
      </PageMargin>
    </>
  );
}

const Header = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "12px",
  padding: "20px 89px",
  background:
  `
    linear-gradient(
      120deg,
      hsl(230deg 34% 69% / 0.2) 0%,
      hsl(209deg 27% 49% / 0.2) 20%,
      hsl(197deg 43% 31% / 0.2) 40%,
      hsl(190deg 56% 19% / 0.2) 60%,
      hsl(185deg 50% 12% / 0.2) 80%,
      hsl(176deg 68% 5% / 0.2) 100%
    )
  `,
});

const Title = styled("h1")({
  fontSize: `${80 / 16}rem`,
});

const ButtonWrapper = styled("div")({
  display: "flex",
  gap: "20px",
});

const FridgeSection = styled("div")({
  display: "flex"
});

const FridgeDescSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  
  "&> div": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  "&> div > h2": {
    textAlign: "center",
    fontSize: `${36 / 16}rem`,
  },
});

const Fridge = css({
  marginRight: 0
});

const PageMargin = styled('div')({
  width: "85%",
  alignSelf: "center",
});

const StatisticsSection = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "64px",
  color: "var(--text-950)",

  "&> h2": {
    fontSize: `${50 / 16}rem`,
  },
});

const TopStatistics = styled('div')({
  width: "50%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  "&> h2": {
    fontSize: `${50 / 16}rem`,
  },
  "&> small": {
    fontSize: `${16 / 16}rem`,
    color: ``
  }
});

const BottomStatistics = styled('div')({
  marginTop: "64px",
  width: "100%",
  display: "flex",

  "&> img": {
    borderRadius: "6px",
  },
});

const BottomStatistics2 = styled('div')({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly ",

  "&> h2": {
    fontSize: `${48 / 16}rem`,
    fontWeight: "500",
    textAlign: "center",
  },

  "&> h2 > strong": {
    fontSize: `${50 / 16}rem`,
    display: "block",
  }
});

const CallToActionSection = styled('div')({
  gap: "24px",
  marginTop: "96px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "&> h2": {
    fontSize: `${50 / 16}rem`,
  }
});

const CoAButtonCSS = css({
  width: "185px",
  height: "55px",
  color: "var(--text-100)",
  fontSize: `${20 / 16}rem`,
  borderRadius: "8px",
});

const RecipeSectionCSS = css({
  marginTop: "64px",
});