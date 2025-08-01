import { styled, css } from "@pigment-css/react";
import AboutUsCards from "@components/about/AboutUsCards";
import { PageMargin, scaleClamped } from "@utils";
import Icon from "@components/Icon";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About - SnapFridge",
  description: "Our mission is to reduce foodwaste and help clueless fridge gazers.",
};

export default function Page() {
  return (
    <Main>
      <Icon icon="Logo" size={300} className={Logo} />
      <Picture />
      <HeaderTxt>
        "Ever stared into your fridge, clueless about what to cook? We've all been there.
        That's why we built SnapFridge - to turn fridge-gazing into meal-making!"
      </HeaderTxt>
      <AboutUsCards />
    </Main>
  );
}

const Main = styled(PageMargin)({
  width: "85%",
  alignSelf: "center",
  justifyItems: "center",
  fontSize: "var(--1rem)",

  "& > :not(:first-child)": {
    marginTop: "32px",
  },
});

const Logo = css({
  margin: "0 auto 20px",
});

const Picture = styled("div")({
  backgroundColor: "var(--text-500)",
  width: "100%",
  height: "300px",
  borderRadius: "12px",
  margin: "auto",
});

const HeaderTxt = styled("h2")({
  fontSize: scaleClamped(20, 36),
  textAlign: "center",
});
