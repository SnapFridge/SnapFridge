"use client";

import { styled } from "@pigment-css/react";
import { motion } from "motion/react";
import { useRef } from "react";
import { ON_MOBILE } from "@components/Global";

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


function AboutUsCards() {
  return (
  <CardContainer>
    {Object.keys(Descriptions).map((name) => {
    const constraintsRef = useRef(null);

    return (
      <div
      ref={constraintsRef}
      key={name}
      >
      <Card
        variants={CardAnimations}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        whileTap="click"

        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
      >
        <h1>{name}</h1>
        <p>{Descriptions[name]}</p>
      </Card>      
      </div>

    )
    })}
  </CardContainer>
  )
}

const CardAnimations = {
  visible: {  
    y: 0,
    opacity: 1,
  transition: {
    duration: 0.6,
    ease: "easeOut",
    delay: 0.2,
  }
  },
  hidden: { 
    y: 100,
    opacity: 0,
  },
  hover: {
    y: -10,
    scale: 1.01,
  },
  click: {
    scale: 0.9,
  }
}


const CardContainer = styled(motion.ul)({
  display: "flex",
  justifyContent: "space-evenly",
  listStyleType: "none",
  padding: 0,
  gap: "24px",

  [ON_MOBILE]: {
  flexDirection: "column",
  },
});

const Card = styled(motion.li)({
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

export default AboutUsCards;

