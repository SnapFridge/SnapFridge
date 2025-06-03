import React from "react";
import Button from "@components/Button";
import Link from "@components/Link";
import Image from "next/image";
import RecipeSection from "@components/RecipeSection";
import { styled, css } from "@pigment-css/react";

export default function Page() {
  return (
      <Main>
        <Header>
          <h1>SnapFridge</h1>
          {/* Remember to add that thing where it removes excellent and types a different word */}
          <h2>Excellent recipes right from your fridge.</h2>
          <div>
            <Link href="/about"><Button type="primary">About Us</Button></Link>
            <Link href="/"><Button type="secondary">Get Started</Button></Link>
          </div>
        </Header>


        {/* TODO: Somehow make the fridge responsive so it doesn't take up 90% of the screen */}
        <ImageWrapper>
          <Image
            src="/FridgeL.png"
            alt="Fridge"
            width={848}
            height={1470}
            sizes="(min-width) 100vw, 600px"
          />
        </ImageWrapper>

        <RecipeSection />

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
          <Link href="/appidk"><Button className={CoAButtonCSS}>Get Started</Button></Link>
        </CallToActionSection>
      </Main>
  );
}

const Main = styled('main')({
  display: "flex",
  flexDirection: "column",
});

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
  backgroundColor: "#000",
});

const ImageWrapper = styled('div')({

});


const StatisticsSection = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "64px",
  color: "var(--text-950)",
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
  width: "100%",
  padding: "32px 111px",
  display: "flex",
  justifyContent: "space-between",

  "&> img": {
    borderRadius: "6px",
  },
});

const BottomStatistics2 = styled('div')({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",

  "&> h2": {
    fontSize: `${48 / 16}rem`,
    fontWeight: "500",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  "&> h2 > strong": {
    fontSize: `${50 / 16}rem`,
  }
});


const CallToActionSection = styled('div')({
  padding: "96px",
  gap: "24px",
  marginBottom: "96px",
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
  backgroundColor: "var(--background-600)",
  borderRadius: "8px",
});
