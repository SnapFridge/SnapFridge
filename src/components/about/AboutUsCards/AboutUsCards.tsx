"use client";

import { styled } from "@pigment-css/react";
import { motion, type Variants } from "motion/react";

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
        <Card
          key={name}
          variants={CardAnimations}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1>{name}</h1>
          <p>{description}</p>
        </Card>
      ))}
    </CardContainer>
  );
}

const CardAnimations: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
  hidden: {
    y: 100,
    opacity: 0,
  },
  hover: {
    y: -10,
    scale: 1.01,
  },
};

const CardContainer = styled(motion.ul)({
  display: "flex",
  justifyContent: "space-evenly",
  listStyleType: "none",
  padding: 0,
  gap: "24px",

  "@media (max-width: 768px)": {
    display: "block",

    "&> :not(:first-child)": {
      marginTop: "24px",
    },
  },
});

const Card = styled(motion.li)({
  alignItems: "center",
  padding: "24px",
  border: "1px solid var(--accent-950)",
  borderRadius: "12px",
  boxShadow: `var(--shadow)`,
  textAlign: "center",
});

export default AboutUsCards;
