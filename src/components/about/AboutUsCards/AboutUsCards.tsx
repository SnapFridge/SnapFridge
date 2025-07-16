import { styled } from "@pigment-css/react";

const Descriptions = {
  "Rylex Phan": `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    `,
  "Andrew Kim": `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    `,
  "Andrew Trinh": `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    `,
};

function AboutUsCards() {
  return (
    <CardContainer>
      {Object.entries(Descriptions).map(([name, description]) => (
        <Card key={name}>
          <h1>{name}</h1>
          <p>{description}</p>
        </Card>
      ))}
    </CardContainer>
  );
}

const CardContainer = styled("ul")({
  display: "flex",
  justifyContent: "space-evenly",
  listStyleType: "none",
  gap: "24px",
  contentVisibility: "auto",

  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

const Card = styled("li")({
  alignItems: "center",
  padding: "24px",
  border: "1px solid var(--accent-950)",
  borderRadius: "12px",
  boxShadow: `var(--shadow)`,
  textAlign: "center",
});

export default AboutUsCards;
