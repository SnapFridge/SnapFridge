import Link from "@components/Link";
import { styled } from "@pigment-css/react";

function AboutUsCards() {
  return (
    <CardContainer>
      <Card>
        <h1>Rylex Phan</h1>
        <p>
          I'm a senior at Cypress High School with a strong passion for Physics, Math, and
          an incredible addiction to coding. I've built several projects, including{" "}
          <Link href="https://github.com/msqr1/Vosklet">Vosklet</Link> and{" "}
          <Link href="https://github.com/msqr1/importizer">importizer</Link>. I enjoy
          diving deep into research and contributing to libraries like Kaldi, Emscripten,
          Glaze, or any other tools I use in my work. I prefer backend over frontend!
        </p>
      </Card>
      <Card>
        <h1>Andrew "Andru" Kim</h1>
        <p>
          With two Andrews working on SnapFridge, Rylex has a hard time referring to one
          specifically, so he gave each a nickname. I'm a senior from Cypress also. I like
          coding a lot, although I started later compared to the other two guys.
        </p>
      </Card>
      <Card>
        <h1>Andrew "Xandrew" Kim</h1>
        <p>
          I am the last Andrew from SnapFridge. Rylex called me Xandrew because he likes
          the XAND operation (it doesn't actually exists). I love Josh W. Comeau, signing
          up for his new blog post notification. I know React, Next.js, Astro, Svelte and
          many others. I built many website with these like{" "}
          <Link href="https://minesweeping.netlify.app/">Minesweeping</Link> I do frontend
          stuff most of the time but I also do a bit of backend
        </p>
      </Card>
    </CardContainer>
  );
}

const CardContainer = styled("ul")({
  display: "flex",
  justifyContent: "space-around",
  listStyleType: "none",
  gap: "24px",
  contentVisibility: "auto",

  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

const Card = styled("li")({
  flex: "1 1 0",
  alignItems: "center",
  padding: "24px",
  border: "1px solid var(--accent-950)",
  borderRadius: "12px",
  boxShadow: `var(--shadow)`,
  textAlign: "center",
});

export default AboutUsCards;
