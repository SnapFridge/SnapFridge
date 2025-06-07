import React from "react";
import { styled, css } from "@pigment-css/react";
import Button from "@components/Button";
import AdjectiveRecipes from "@components/home/AdjectiveRecipe";
import RecipeSection from "@components/RecipeSection";
import Counter from "@components/home/Counter";
import Image from "next/image";
import { linearClamp, ON_MOBILE, PageMargin } from "@components/Global";

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
        <FridgeSection className={MobileFlexCol}>
          <FridgeSideTxt>An app, built just for your fridge</FridgeSideTxt>
          <FridgeSideTxt >that scans your food automatically</FridgeSideTxt>
          <FridgeSideTxt className={MobileOrderLast}>
            to help you prepare meal and reduce food waste
          </FridgeSideTxt>
          <Image
            width={1700}
            height={2848}
            src="/FridgeL.avif"
            className={FridgeImg}
            alt="Fridge"
          />
        </FridgeSection>
        <RecipeSection/>
        <StatisticsSection>
          <TopStatistics>
            <h2>Around 30-40% of food gets wasted every year</h2>
            <small>According to the USDA</small>
          </TopStatistics>
          <BottomStatistics className={MobileFlexCol}>
            <h2>
              That's
              <strong>
                <Counter
                  startingValue={0}
                  endingValue={60}
                  duration={3}
                  delay={0.25}
                /> Million
              </strong>
              tons
            </h2>
            <h2 className={MobileOrderLast}>
              Or
              <strong>
                <Counter
                  startingValue={0}
                  endingValue={120}
                  duration={3}
                  delay={0.25}
                /> Billion
              </strong>
              pounds
            </h2>
            <Image
              width={692}
              height={689}
              className={LandfillImg}
              src="/Landfill.avif"
              alt="A landfill worker in a neon vest clearing through a landfill of fruit waste"
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
  ["--content-padding" as string]: linearClamp(75, 125),
  paddingTop: `calc(var(--nav-height) + var(--nav-margin) + var(--content-padding))`,
  paddingBottom: `var(--content-padding)`,
  background: `radial-gradient(circle at top left, var(--hero-radial-1) 0%, var(--hero-radial-2) 63%, var(--hero-radial-3) 100%),
    linear-gradient(var(--hero-linear-1) 0%, var(--hero-linear-2) 96%, var(--background-50) 100%)
    `,
  backgroundBlendMode: "multiply",
  marginTop: "calc(-1 * (var(--nav-height) + var(--nav-margin)))",
});

const Title = styled("h1")({
  fontSize: linearClamp(36, 80),
});

const ButtonWrapper = styled("div")({
  display: "flex",
  gap: linearClamp(10, 20),
});

// Image is set to be 60% wide of the page without margin
const FridgeImg = css({
  gridRowStart: 1,
  gridRowEnd: 4,
  position: "relative",
  left: "var(--page-margin)",
  width: "100%",
  
  [ON_MOBILE]: {
    margin: "25px 0",
    alignSelf: "end",
    width: "60%", // Set here
  },
  height: "auto",
});

const FridgeSection = styled("div")({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "40% 60%", // And here
  gridAutoFlow: "column",
  alignItems: "center",
  marginBottom: "35px",

  [ON_MOBILE]: {
    marginTop: "35px",
  }
});

const FridgeSideTxt = styled("span")({
  fontSize: linearClamp(20, 36),
  fontWeight: "bold",
  textAlign: "center",
});

const StatisticsSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "64px",
});

const TopStatistics = styled("div")({
  width: "75%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  [ON_MOBILE]: {
    width: "100%",
  },

  "&> h2": {
    fontSize: linearClamp(28, 50),
  },

  "&> small": {
    fontSize: `${16 / 16}rem`,
  },
});

const BottomStatistics = styled("div")({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "40% 60%",
  gridAutoFlow: "column",

  marginTop: "64px",
  alignItems: "center",
  rowGap: linearClamp(15, 25),

  "&> img": {
    borderRadius: "6px",
  },

  "&> h2": {
    fontSize: linearClamp(29, 48),
    fontWeight: "500",
    textAlign: "center",
    whiteSpace: "pre-wrap"
  },

  "&> h2 > strong": {
    fontSize: linearClamp(33, 52),
    display: "block",
  },
});

const LandfillImg = css({
  gridRowStart: 1,
  gridRowEnd: 3,
  width: "100%",
  height: "auto",
});

const CallToActionSection = styled("div")({
  gap: "24px",
  marginTop: "96px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "&> h2": {
    fontSize: linearClamp(30, 50),
    textAlign: "center",
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

const MobileCenter = css({
  [ON_MOBILE]: {
    justifyItems: "center",
  },
});

const MobileOrderLast = css({
  [ON_MOBILE]: {
    order: 1, 
  },
});

const MobileFlexCol = css({
  [ON_MOBILE]: {
    display: "flex",
    flexDirection: "column",
  },
});