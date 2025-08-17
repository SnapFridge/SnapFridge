"use client";

import Button from "@components/Button";
import { styled } from "@pigment-css/react";
import { ON_MOBILE } from "@utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function CookieBanner() {
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("acknowledgedCookie") === null) {
      setVisibility(true);
    }
  }, []);

  function acknowledgeCookies() {
    localStorage.setItem("acknowledgedCookie", "");
    setVisibility(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <Container
          variants={ContainerVariants}
          transition={{ type: "spring" }}
          initial="starting"
          animate="enter"
          exit="exit"
        >
          <Title>Cookie Acknowledgement</Title>
          <p>
            SnapFridge uses cookies only to remember your login and support secure
            authentication with Supabase. No tracking or analytics cookies are used.
          </p>
          <Button onClick={acknowledgeCookies} variant="secondary">
            Acknowledge
          </Button>
        </Container>
      )}
    </AnimatePresence>
  );
}

const ContainerVariants = {
  starting: {
    opacity: 0,
    y: 50,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

const Container = styled(motion.section)({
  display: "flex",
  flexDirection: "column",
  zIndex: 2,
  width: "400px",
  height: "auto",
  position: "fixed",
  bottom: "24px",
  right: "24px",
  background: "var(--accent-100)",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center",

  "& > *": {
    margin: "12px 0 0",
  },

  [ON_MOBILE]: {
    bottom: "12px",
    right: 0,
    left: 0,
    margin: "auto",
    width: "calc(100% - var(--page-margin))",
    padding: "12px",
  },
});

const Title = styled("h1")({
  fontSize: `${24 / 16}rem`,
});

export default CookieBanner;
