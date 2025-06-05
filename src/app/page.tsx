import React from "react";
import { styled, css } from "@pigment-css/react";
import Button from "@components/Button";
import AdjectiveRecipes from "@components/AdjectiveRecipes";
import RecipeSection from "@components/RecipeSection";
import Image from "next/image";
import Counter from "@components/Counter";
import { linearClamp, ON_MOBILE } from "@components/Global"

export default function Page() {
  return (
    <>
      <Hero>
        <PageMargin className={MobileCenter}>
          <Title>SnapFridge</Title>
          <AdjectiveRecipes />
          <ButtonWrapper>
            <Button as="a" href="/about" styling="primary">
              About Us
            </Button>
            <Button as="a" href="/" styling="secondary">
              Get Started
            </Button>
          </ButtonWrapper>
        </PageMargin>
      </Hero>
      {/* The content underneath the header */}
      <PageMargin>
        <FridgeSection>
          <FridgeDescSection>
            <FridgeSideText>An app, built just for your fridge</FridgeSideText>
            <FridgeSideText>that scans your food automatically</FridgeSideText>
            <FridgeSideText>
              to help you prepare meal and reduce food waste
            </FridgeSideText>
          </FridgeDescSection>
          <Image
            src="/FridgeL.png"
            className={FridgeImage}
            alt="Fridge"
            width={848}
            height={1470}
          />
        </FridgeSection>
        <RecipeSection className={RecipeSectionCSS} />
        <StatisticsSection>
          <TopStatistics>
            <h2>Around 30-40% of food gets wasted every year</h2>
            <small>According to the USDA</small>
          </TopStatistics>
          <BottomStatistics>
            <BottomStatistics2>
              <h2>
                That's{" "}
                <strong>
                  <Counter
                    startingValue={0}
                    endingValue={60}
                    duration={3}
                    delay={0.25}
                  />{" "}
                  Million
                </strong>{" "}
                tons
              </h2>
              <h2>
                Or{" "}
                <strong>
                  <Counter
                    startingValue={0}
                    endingValue={120}
                    duration={3}
                    delay={0.25}
                  />{" "}
                  Billion
                </strong>{" "}
                pounds
              </h2>
            </BottomStatistics2>
            <Image
              src="/Landfill.png"
              alt="A landfill worker in a neon vest clearing through a landfill of fruit waste"
              height={700}
              width={700}
            />
          </BottomStatistics>
        </StatisticsSection>

        <CallToActionSection>
          <h2>Join the Fight Against Food Waste Today</h2>
          <Button
            as="a"
            href="/appidk"
            styling="primary"
            className={CoAButtonCSS}
          >
            Get Started
          </Button>
        </CallToActionSection>
      </PageMargin>
    </>
  );
}

const Hero = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  "--content-padding": linearClamp(75, 125),
  paddingTop: `calc(var(--nav-height) + var(--nav-margin) + var(--content-padding))`,
  paddingBottom: `var(--content-padding)`,
  background: `radial-gradient(circle at top left, var(--hero-radial-1) 0%, var(--hero-radial-2) 63%, var(--hero-radial-3) 100%),
    linear-gradient(var(--hero-linear-1) 0%, var(--hero-linear-2) 96%, var(--background-50) 100%)
    `,
  backgroundBlendMode: "multiply",
  marginTop: "calc(-1 * (var(--nav-height) + var(--nav-margin)))"
});

const Title = styled("h1")({
  fontSize: linearClamp(36, 80),
});

const ButtonWrapper = styled("div")({
  display: "flex",  
  gap: linearClamp(10, 20),
});

const FridgeImage = css({
  position: "relative",
  left: "var(--page-margin)",
});

const FridgeSection = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const FridgeDescSection = styled("div")({
  marginTop: "180px",
  display: "flex",
  flexDirection: "column",
  gap: "380px",
});

const FridgeSideText = styled("span")({
  fontSize: `${36 / 16}rem`,
  fontWeight: "bold",
});

const PageMargin = styled("div")({
  width: "calc(100vw - 2 * var(--page-margin))",
  margin: "auto",
});

const MobileCenter = css({
  [ON_MOBILE]: {
    justifyItems: "center",
  }
})

const StatisticsSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "64px",
  color: "var(--text-950)",

  "&> h2": {
    fontSize: `${50 / 16}rem`,
  },
});

const TopStatistics = styled("div")({
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
    color: ``,
  },
});

const BottomStatistics = styled("div")({
  marginTop: "64px",
  width: "100%",
  display: "flex",

  "&> img": {
    borderRadius: "6px",
  },
});

const BottomStatistics2 = styled("div")({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly ",

  "&> h2": {
    fontSize: linearClamp(32, 48),
    fontWeight: "500",
    textAlign: "center",
  },

  "&> h2 > strong": {
    fontSize: `${50 / 16}rem`,
    display: "block",
  },
});

const CallToActionSection = styled("div")({
  gap: "24px",
  marginTop: "96px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "&> h2": {
    fontSize: `${50 / 16}rem`,
  },
});

const CoAButtonCSS = css({
  width: `${185 / 16}rem`,
  height: `${55 / 16}rem`,
  color: "var(--text-100)",
  fontSize: `${20 / 16}rem`,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  borderRadius: "8px",
});

const RecipeSectionCSS = css({
  marginTop: "64px",
});
