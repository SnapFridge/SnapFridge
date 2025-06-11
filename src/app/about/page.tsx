import { styled, css } from "@pigment-css/react";
import AboutUsCards from "@components/about/AboutUsCards";
import { PageMargin } from '@components/Global';
import Image from "next/image"

export default function Page() {
  return (
    <Main>
      <div>
        <Image
          priority
          src="/Logo.avif"
          alt="Logo"
          width={300}
          height={216}
          className={Logo}
        />
        <Title>SnapFridge</Title>
      </div>
      <Picture></Picture>
      <HeaderText>
        “We built SnapFridge for absolutely no reason other than the 
        Congressional App Challenge, still gotta say it's a cool idea tho.”
      </HeaderText>
      <AboutUsCards></AboutUsCards>
    </Main>
  )
}

const Main = styled(PageMargin)({
  width: "85%",
  alignSelf: "center",
  justifyItems: "center",
  fontSize: "var(--1rem)",
  color: "var(--text-950)",

  "&> :not(:first-child)": {
    marginTop: "32px",
  }
})

const Title = styled("h1")({
  marginTop: "-90px",
  fontSize: `${36 / 16}rem`,
  textAlign: "center",
});

const Logo = css({
  margin: "auto",
});

const Picture = styled("div")({
  backgroundColor: "var(--text-500)",
  width: "700px",
  height: "300px",
  borderRadius: "12px",
});

const HeaderText = styled("h2")({
  fontSize: `${32 / 16}rem`,
  textAlign: "center",
});