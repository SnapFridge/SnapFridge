import Icon from "@components/Icon";
import { styled, css } from "@pigment-css/react";
import AboutUsCards from "@components/AboutUsCards";

function Page() {
    return (
        <Main>
            <div>
                <Icon className={Logo} icon="logo" size={300} />
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

const Main = styled("main")({
    width: "85%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: `${16 / 16}rem`,
    gap: "32px",
    color: "var(--text-950)"
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

const CardContainer = styled("ul")({
    display: "flex",
    justifyContent: "space-evenly",
    listStyleType: "none",
    padding: 0,
    gap: "24px",
});

export default Page;
