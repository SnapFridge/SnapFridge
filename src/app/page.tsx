import React from "react";
import { styled, css } from "@pigment-css/react";
import Button from "@components/Button";
import AdjectiveRecipes from "@components/home/AdjectiveRecipe";
import RecipeSection from "@components/RecipeSection";
import Counter from "@components/home/Counter";
import Image from "next/image";
import {
  scaleClamped,
  scaleClampedMobile,
  scaleClampedDesktop,
  ON_MOBILE,
  PageMargin,
  MOBILE_BREAKPOINT,
} from "@components/Global";
import FoodPointer from "@components/home/FoodPointer";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Hero>
        <PageMargin className={MobileCenter}>
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
      {/* The content underneath the header */}
      <PageMargin>
        <FridgeSection className={MobileFlexCol}>
          <FridgeSideTxt>An app, built just for your fridge</FridgeSideTxt>
          <FridgeSideTxt>that scans your food automatically</FridgeSideTxt>
          <FridgeSideTxt className={MobileOrderLast}>
            to help you prepare meals and reduce food waste
          </FridgeSideTxt>
          <div className={FridgeAndPointers}>
            <Butter>Butter</Butter>
            <Milk>Milk</Milk>
            <Egg>Egg</Egg>
            <Carrot>Carrot</Carrot>
            <Image
              width={1700}
              height={2848}
              src="/FridgeL.avif"
              alt="Fridge"
              className={FridgeImg}
              priority
              sizes={`(max-width: ${MOBILE_BREAKPOINT}) 50vw, 1300px`}
            />
          </div>
        </FridgeSection>
        <RecipeSection />
        <StatisticsSection>
          <TopStatistics>
            <h2>Around 30-40% of food gets wasted every year</h2>
            <small>According to the USDA</small>
          </TopStatistics>
          <BottomStatistics className={MobileFlexCol}>
            <h2>
              That's
              <strong>
                <Counter startingValue={0} endingValue={60} duration={3} delay={0.25} />{" "}
                Million
              </strong>
              tons
            </h2>
            <h2 className={MobileOrderLast}>
              Or
              <strong>
                <Counter startingValue={0} endingValue={120} duration={3} delay={0.25} />{" "}
                Billion
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
  paddingTop: `calc(var(--nav-height) + var(--nav-margin) + var(--content-padding))`,
  paddingBottom: `var(--content-padding)`,
  background: `radial-gradient(circle at top left, var(--hero-radial-1) 0%, var(--hero-radial-2) 63%, var(--hero-radial-3) 100%),
    linear-gradient(var(--hero-linear-1) 0%, var(--hero-linear-2) 96%, var(--background-50) 100%)
    `,
  backgroundBlendMode: "multiply",
  marginTop: "calc(-1 * (var(--nav-height) + var(--nav-margin)))",
});

const Title = styled("h1")({
  fontSize: scaleClamped(36, 85),
});

const ButtonWrapper = styled("div")({
  display: "flex",
  gap: scaleClamped(10, 20),
});

const FridgeAndPointers = css({
  position: "relative",
  gridRowStart: 1,
  gridRowEnd: 4,
  width: "100%",

  [ON_MOBILE]: {
    margin: "25px 0",
  },
});

const Butter = styled(FoodPointer)({
  width: scaleClampedDesktop(110, 340),
  top: scaleClampedDesktop(165, 650),

  [ON_MOBILE]: {
    top: scaleClampedMobile(88, 175),
    width: scaleClampedMobile(155, 270),
  },
});

const Milk = styled(FoodPointer)({
  width: scaleClampedDesktop(195, 630),
  top: scaleClampedDesktop(270, 890),

  [ON_MOBILE]: {
    top: scaleClampedMobile(130, 250),
    width: scaleClampedMobile(198, 358),
  },
});

const Egg = styled(FoodPointer)({
  width: scaleClampedDesktop(250, 830),
  top: scaleClampedDesktop(315, 1130),

  [ON_MOBILE]: {
    top: scaleClampedMobile(160, 312),
    width: scaleClampedMobile(228, 415),
  },
});

const Carrot = styled(FoodPointer)({
  width: scaleClampedDesktop(180, 580),
  top: scaleClampedDesktop(390, 1370),

  [ON_MOBILE]: {
    top: scaleClampedMobile(200, 390),
    width: scaleClampedMobile(190, 330),
  },
});

// Image is set to be 66% wide of the page without margin
const FridgeImg = css({
  height: "auto",
  position: "relative",
  left: "var(--page-margin)",
  width: "100%",

  [ON_MOBILE]: {
    justifySelf: "flex-end",
    width: "66%", // Set here
  },
});
const FridgeSection = styled("section")({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "34% 66%", // And here
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
  color: "var(--text-100)",
  fontSize: "var(--1rem)",
  display: "block",
  alignContent: "center",
  textAlign: "center",
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
