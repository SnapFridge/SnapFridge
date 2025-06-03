import Icon from "@components/Icon";
import { styled, css } from "@pigment-css/react";

type DescriptionsType = Record<string, string>;

const Descriptions: DescriptionsType = {
    "Rylex Phan":
        `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
        `,
    "Andrew Kim":
        `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
        `,
    "Andrew Trinh":
        `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
        `,
}


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
            <CardContainer>
                {Object.keys(Descriptions).map((name) => {
                    return (
                        <Card key={name}>
                            <h1>{name}</h1>
                            <p>{Descriptions[name]}</p>
                        </Card>
                    )
                })}
            </CardContainer>
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

const Card = styled("li")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    padding: "24px",
    width: "300px",
    border: "1px solid var(--accent-950)",
    borderRadius: "12px",
    boxShadow: `var(--shadow)`,

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
