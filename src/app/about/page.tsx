import { styled, css } from "@pigment-css/react";
import AboutUsCards from "@components/about/AboutUsCards";
import { PageMargin } from "@components/Global";
import Icon from "@components/Icon";

export default function Page() {
  return (
    <Main>
      <Icon icon="Logo" size={300} className={Logo} />
      <Title>SnapFridge</Title>
      <Picture></Picture>
      <HeaderText>
        “We built SnapFridge for absolutely no reason other than the Congressional App
        Challenge, still gotta say it's a cool idea tho.”
      </HeaderText>
      <AboutUsCards></AboutUsCards>
    </Main>
  );
}

const Main = styled(PageMargin)({
  width: "85%",
  alignSelf: "center",
  justifyItems: "center",
  fontSize: "var(--1rem)",
  color: "var(--text-950)",

  "&> :not(:first-child)": {
    marginTop: "32px"
  }
});

const Title = styled("h1")({
  fontSize: `${36 / 16}rem`,
  textAlign: "center"
});

const Logo = css({
  margin: "auto"
});

const Picture = styled("div")({
  backgroundColor: "var(--text-500)",
  width: "700px",
  height: "300px",
  borderRadius: "12px",
  margin: "auto"
});

const HeaderText = styled("h2")({
  fontSize: `${32 / 16}rem`,
  textAlign: "center"
});
