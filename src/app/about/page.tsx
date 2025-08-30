import AboutUsCards from "@components/about/AboutUsCards";
import Icon from "@components/Icon";
import { css, styled } from "@pigment-css/react";
import { PageMargin, scaleClamped } from "@utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Our mission is to reduce foodwaste and help clueless fridge gazers.",
};

export default function Page() {
  return (
    <Main>
      <Icon icon="Logo" size={300} className={Logo} />
      <Header>
        "Ever stared into your fridge, clueless about what to cook? We've all been there.
        That's why we built SnapFridge - to turn fridge-gazing into meal-making!"
      </Header>
      <AboutUsCards />
    </Main>
  );
}

const Main = styled(PageMargin)({
  fontSize: "var(--1rem)",

  "& > :not(:first-child)": {
    margin: "32px 0 0",
  },
});

const Logo = css({
  margin: "0 auto 20px",
});

const Header = styled("h2")({
  fontSize: scaleClamped(20, 36),
  textAlign: "center",
});
