/* eslint-disable @typescript-eslint/no-unused-expressions */

import { globalCss } from "@pigment-css/react";
import { MAX_SUPPORTED_WIDTH, scaleClamped } from "@utils";

// CSS variables
globalCss`
  :root {
    background: var(--background-0);
    color: var(--text-950);

    --nav-height: ${80 / 16}rem;
    --nav-margin: ${20 / 16}rem;
    --page-margin: ${scaleClamped(25, 120)};
    --1rem: ${scaleClamped(14, 22)};
    --1-25rem: ${scaleClamped(17, 27)};

    @media (pointer: coarse) {
      --click-target-minimum: 44px;
    }
  }
`;

// Horizontally unscrollable
globalCss`
  body {
    display: flex;
    flex-direction: column;
    font-weight: 410;
    width: 100%;
    min-height: 100%;
    @media (min-width: ${MAX_SUPPORTED_WIDTH}px) {
      width: ${MAX_SUPPORTED_WIDTH}px;
      margin: auto;
    }
  }
`;

// CSS reset
globalCss`
  /* 1. Use a more-intuitive box-sizing model */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* 2. Remove default margin, padding, and borders */
  * {
    border: 0;
    margin: 0;
    padding: 0;
  }

  /* 3. Enable keyword animations */
  @media (prefers-reduced-motion: no-preference) {
    html {
      interpolate-size: allow-keywords;
    }
  }

  body {
    /* 4. Add accessible line-height */
    line-height: 1.5;
    /* 5. Improve text rendering */
    -webkit-font-smoothing: antialiased;
  }

  /* 6. Improve media defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /* 7. Inherit fonts for form controls */
  input, button, textarea, select {
    font: inherit;
  }

  /* 8. Avoid text overflows */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  h1, h2, h3, h4, h5, h6, p {
    text-wrap: balance;
  }

  /* 9. Improve line wrapping, though sometimes not supported so it fallbacks to the one above */
  p {
    text-wrap: pretty;
  }

  /* 11. Unstyled list */
  ul {
    list-style: none;
  }

  /* Unstyled input */
  input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input[type=number] {
    -moz-appearance:textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
