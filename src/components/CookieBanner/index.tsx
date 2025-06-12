"use client";

import { styled, css } from "@pigment-css/react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Button from "@components/Button";
import { ON_MOBILE } from "@components/Global";

export default function CookieBanner() {
  const [visible, setVisibility] = useState(true);

  useEffect(() => {
    const hasAcknowledged = localStorage.getItem('acknowledgedCookie');

    if (hasAcknowledged) {
      setVisibility(false);
    }
  }, []);

  function acknowledgeCookies() {
    localStorage.setItem('acknowledgedCookie', 'true');
    setVisibility(false);
  }


  return (
    <AnimatePresence>
      {visible ? (
          <CookieBannerContainer
            variants={ContainerVariants}
            transition={{ type: "spring" }}
            initial="starting"
            animate="enter"
            exit="exit"
            whileHover="hover"
          >
            <Title>Cookie Acknowledgement</Title>
            <CookieBannerContent>
              SnapFridge uses cookies only to remember your login and support secure authentication with Firebase. 
              No tracking or analytics cookies are used.
            </CookieBannerContent>
            <Button
              onClick={acknowledgeCookies}
              className={ButtonCSS}
            >
              Acknowledge
            </Button>
          </CookieBannerContainer>         
      ) : null }
    </AnimatePresence>
  )
}

const ContainerVariants = {
  starting: {
    opacity: 0,
    y: 50,    
  },
  enter: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
  hover: {
    scale: 1.02,
  },
}

const CookieBannerContainer = styled(motion.div)({
  zIndex: 3,
  width: "400px",
  height: "auto",
  position: "fixed",
  bottom: 24,
  right: 24,
  backgroundColor: "var(--accent-100)",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center",

  "&> *": {
    marginTop: "12px",
  },

  [ON_MOBILE]: {
    bottom: 0,
    right: 0,
    left: 0,
    width: "100vw",
    padding: "12px",
  }
});

const Title = styled('h1')({
  fontSize: `${24 / 16}rem`
});

const CookieBannerContent = styled('p')({

});

const ButtonCSS = css({
  backgroundColor: "var(--primary-200)",

  "&:hover": {
    backgroundColor: "var(--primary-300)"
  },
});