import React from "react";
import { styled, css } from "@pigment-css/react";
import Button from "@components/Button";
import AdjectiveRecipes from "@components/home/AdjectiveRecipe";
import { InputProvider } from "@components/snap/InputProvider";
import RecipeSection from "@components/RecipeSection";
import Counter from "@components/home/Counter";
import Image from "next/image";
import {
  scaleClamped,
  ON_MOBILE,
  ON_DESKTOP,
  PageMargin,
  MOBILE_BREAKPOINT,
} from "@components/Global";
import FoodPointer from "@components/home/FoodPointer";
import Link from "next/link";
import recipesExample from "@components/home/RecipesExample";

export default function Page() {
  return (
    <>
      <Hero>
        <PageMargin>
          <Title>SnapFridge</Title>
          <AdjectiveRecipes />
          <ButtonWrapper>
            <Button as={Link} href="/about" variant="primary">
              About Us
            </Button>
            <Button as={Link} href="/snap" variant="secondary">
              Get Started
            </Button>
          </ButtonWrapper>
        </PageMargin>
      </Hero>
      <PageMargin>
        <FridgeSection className={MobileFlexCol}>
          <FridgeSideTxt>Your fridge's perfect companion</FridgeSideTxt>
          <FridgeSideTxt>Automatically scans your food</FridgeSideTxt>
          <FridgeSideTxt className={MobileOrderLast}>
            Inspire meals and reduce waste
          </FridgeSideTxt>
          <FridgeAndPointers>
            <Butter>Butter</Butter>
            <Milk>Milk</Milk>
            <Egg>Egg</Egg>
            <Carrot>Carrot</Carrot>
            <Ketchup>Ketchup</Ketchup>
            <StrawberryJam>Strawberry Jam</StrawberryJam>
            <Image
              width={1600}
              height={2689}
              src="/FridgeL.avif"
              alt="Fridge"
              className={FridgeImg}
              priority
              sizes={`50vw, (max-width: ${MOBILE_BREAKPOINT}px) 60vw`}
            />
          </FridgeAndPointers>
        </FridgeSection>
        <InputProvider>
          <RecipeSection recipes_={recipesExample} />
        </InputProvider>
        <StatisticsSection>
          <TopStatistics>
            <h2>Around 30-40% of food gets wasted every year</h2>
            <small>According to the USDA</small>
          </TopStatistics>
          <BottomStatistics className={MobileFlexCol}>
            <h2>
              That's
              <strong>
                <Counter endValue={60} /> Million
              </strong>
              metric tons
            </h2>
            <h2 className={MobileOrderLast}>
              Or
              <strong>
                <Counter endValue={133} /> Billion
              </strong>
              pounds
            </h2>
            <Image
              width={1704}
              height={1704}
              className={LandfillImg}
              src="/Landfill.png"
              alt="Landfill worker clearing through a landfill of fruit waste"
              quality={45}
              sizes={`40vw, (max-width: ${MOBILE_BREAKPOINT}px) 80vw`}
            />
          </BottomStatistics>
        </StatisticsSection>

        <CallToActionSection>
          <h2>Join the Fight Against Food Waste Today</h2>
          <Button as={Link} href="/snap" variant="primary" className={CoAButtonCSS}>
            Get Started
          </Button>
        </CallToActionSection>
      </PageMargin>
    </>
  );
}

const Hero = styled("div")({
  justifyContent: "center",
  ["--content-padding" as string]: scaleClamped(75, 125),
  padding: `calc(var(--nav-height) + var(--nav-margin) + var(--content-padding)) 0 var(--content-padding)`,
  background: `radial-gradient(circle at top left, var(--hero-radial-1) 0%, var(--hero-radial-2) 63%, var(--hero-radial-3) 100%),
    linear-gradient(var(--hero-linear-1) 0%, var(--hero-linear-2) 96%, var(--background-50) 100%)
    `,
  backgroundBlendMode: "multiply",
  margin: "calc(-1 * (var(--nav-height) + var(--nav-margin))) 0 0",
});

const Title = styled("h1")({
  fontSize: scaleClamped(36, 85),

  [ON_MOBILE]: {
    textAlign: "center",
  },
});

const ButtonWrapper = styled("div")({
  display: "flex",
  gap: scaleClamped(10, 20),

  [ON_MOBILE]: {
    justifyContent: "center",
  },
});

const Butter = styled(FoodPointer)({
  width: "calc(17.5% + var(--page-margin))",
  top: "32%",
});

const Milk = styled(FoodPointer)({
  width: "calc(41% + var(--page-margin))",
  top: "46%",
});

const Egg = styled(FoodPointer)({
  width: "calc(57% + var(--page-margin))",
  top: "59%",
});

const Carrot = styled(FoodPointer)({
  width: "calc(39% + var(--page-margin))",
  top: "72%",
});

const StrawberryJam = styled(FoodPointer)({
  width: "calc(28% + var(--page-margin))",
  height: "5%",
  top: "24%",
});

const Ketchup = styled(FoodPointer)({
  width: "calc(92% + var(--page-margin))",
  top: "52%",
});

const FridgeImg = css({
  height: "100%",
  position: "relative",
  left: "var(--page-margin)",
  width: "100%",
});

const FridgeAndPointers = styled("div")({
  position: "relative",
  gridRowStart: 1,
  gridRowEnd: 4,
  width: "100%",

  [ON_MOBILE]: {
    width: "75%", // Set here
    alignSelf: "flex-end",
    margin: "25px 0",
  },
});

const FridgeSection = styled("section")({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "40% 60%", // And here
  gridAutoFlow: "column",
  alignItems: "center",
  marginBottom: "35px",

  [ON_MOBILE]: {
    marginTop: "35px",
  },
});

const FridgeSideTxt = styled("span")({
  fontSize: scaleClamped(20, 40),
  fontWeight: "bold",
  textAlign: "center",
  [ON_DESKTOP]: {
    padding: "0 25px 0 0",
  },
});

const StatisticsSection = styled("section")({
  marginTop: "64px",
});

const TopStatistics = styled("div")({
  width: "75%",
  margin: "auto",

  [ON_MOBILE]: {
    width: "100%",
  },

  "&> h2": {
    width: "100%",
    textAlign: "center",
    fontSize: scaleClamped(29, 52),
  },

  "&> small": {
    display: "block",
    width: "100%",
    textAlign: "center",
    fontSize: "var(--1rem)",
  },
});

const BottomStatistics = styled("div")({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "40% 60%",
  gridAutoFlow: "column",

  marginTop: "64px",
  alignItems: "center",
  rowGap: scaleClamped(15, 25),

  "&> img": {
    borderRadius: "6px",
  },

  "&> h2": {
    fontSize: scaleClamped(29, 52),
    fontWeight: "500",
    textAlign: "center",
    whiteSpace: "pre-wrap",
  },

  "&> h2 > strong": {
    fontSize: scaleClamped(33, 56),
    display: "block",
  },
});

const LandfillImg = css({
  gridRowStart: 1,
  gridRowEnd: 3,
  width: "100%",
  height: "auto",
});

const CallToActionSection = styled("section")({
  display: "flex",
  flexDirection: "column",
  marginTop: "96px",
  alignItems: "center",

  "&> h2": {
    fontSize: scaleClamped(29, 52),
    textAlign: "center",
  },
});

const CoAButtonCSS = css({
  marginTop: "15px",
  width: `${185 / 16}rem`,
  height: `${55 / 16}rem`,
  borderRadius: "8px",
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
