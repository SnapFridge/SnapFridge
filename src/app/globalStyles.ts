/* eslint-disable @typescript-eslint/no-unused-expressions */

import { MAX_SUPPORTED_WIDTH, scaleClamped } from "@components/Global";
import { globalCss } from "@pigment-css/react";

// CSS variables
globalCss`
  :root {
    --nav-height: ${80 / 16}rem;
    --nav-margin: ${20 / 16}rem;
    --page-margin: ${scaleClamped(30, 120)};
    --1rem: ${scaleClamped(14, 22)};
    --1-25rem: ${scaleClamped(17, 27)};

    @media (pointer: coarse) {
      --click-target-minimum: 44px;
    }
  }
`;

// Horizontally unscrollable
globalCss`
  html, body {
    width: 100%;
    @media (min-width: ${MAX_SUPPORTED_WIDTH}px) {
      width: ${MAX_SUPPORTED_WIDTH}px;
      margin: auto;
    }
  }
`;

// CSS reset
globalCss`
  html, body {
    height: 100%;
  }
  /* 1. Use a more-intuitive box-sizing model */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* 2. Remove default margin */
  * {
    margin: 0;
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

  /* 9. Improve line wrapping */
  p {
    text-wrap: pretty;
  }
  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
  }

  /* 10. Create a root stacking context */
  #root, #__next {
    isolation: isolate;
  }

  /* 11. Unstyled list */
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;
