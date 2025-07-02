/* eslint-disable @typescript-eslint/no-unused-expressions */

import { MAX_SUPPORTED_WIDTH, scaleClamped } from "@components/Global";
import { globalCss } from "@pigment-css/react";

// Color scheme
globalCss`
  :root[data-theme="light"] {
    --text-50: #e9fbfa;
    --text-100: #d4f7f5;
    --text-200: #a9efec;
    --text-300: #7ee7e2;
    --text-400: #53dfd8;
    --text-500: #28d7cf;
    --text-600: #20aca5;
    --text-700: #18817c;
    --text-800: #105653;
    --text-900: #082b29;
    --text-950: #041615;

    --background: #FFFFFF;
    --background-50: #eafbfa;
    --background-100: #d4f7f5;
    --background-200: #a9efea;
    --background-300: #7ee7e0;
    --background-400: #54ded5;
    --background-500: #29d6cb;
    --background-600: #21aba2;
    --background-700: #18817a;
    --background-800: #105651;
    --background-900: #082b29;
    --background-950: #041514;

    --primary-50: #eff6f5;
    --primary-100: #deedec;
    --primary-200: #bddbd9;
    --primary-300: #9cc9c6;
    --primary-400: #7bb7b3;
    --primary-500: #5ba4a0;
    --primary-600: #488480;
    --primary-700: #366360;
    --primary-800: #244240;
    --primary-900: #122120;
    --primary-950: #091010;

    --secondary-50: #ebf6fa;
    --secondary-100: #d7eef4;
    --secondary-200: #afdce9;
    --secondary-300: #87cbde;
    --secondary-400: #5fbad3;
    --secondary-500: #37a9c8;
    --secondary-600: #2c87a0;
    --secondary-700: #216578;
    --secondary-800: #164350;
    --secondary-900: #0b2228;
    --secondary-950: #051114;

    --accent-50: #eeeff7;
    --accent-100: #dde0ee;
    --accent-200: #bbc0dd;
    --accent-300: #98a1cd;
    --accent-400: #7682bc;
    --accent-500: #5463ab;
    --accent-600: #434f89;
    --accent-700: #323b67;
    --accent-800: #222744;
    --accent-900: #111422;
    --accent-950: #080a11;

    --shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --dialog-background: #ededed;

    --error-50: #fbeae9;
    --error-100: #f8d5d3;
    --error-200: #f0aba8;
    --error-300: #e9827c;
    --error-400: #e15851;
    --error-500: #da2e25;
    --error-600: #ae251e;
    --error-700: #831c16;
    --error-800: #57120f;
    --error-900: #2c0907;
    --error-950: #160504;

    --warn-50: #fff5e6;
    --warn-100: #feebcd;
    --warn-200: #fed89a;
    --warn-300: #fdc468;
    --warn-400: #fdb035;
    --warn-500: #fc9d03;
    --warn-600: #ca7d02;
    --warn-700: #975e02;
    --warn-800: #653f01;
    --warn-900: #321f01;
    --warn-950: #191000;

    --success-50: #ebf9ef;
    --success-100: #d8f3de;
    --success-200: #b0e8bd;
    --success-300: #89dc9c;
    --success-400: #62d07c;
    --success-500: #3bc45b;
    --success-600: #2f9d49;
    --success-700: #237636;
    --success-800: #174f24;
    --success-900: #0c2712;
    --success-950: #061409;

    --hero-radial-1: #969FCB;
    --hero-radial-2: #3ec1e3;
    --hero-radial-3: #28cac0;
    --hero-linear-1: #b8b8b8;
    --hero-linear-2: #FFFFFF;
    --hero-linear-3: #FFFFFF;

    --skeleton-base: #ebebeb;
    --skeleton-highlight: #f5f5f5;
  }
  :root[data-theme="dark"] {
    --text-50: #041615;
    --text-100: #082b29;
    --text-200: #105653;
    --text-300: #18817c;
    --text-400: #20aca5;
    --text-500: #28d7cf;
    --text-600: #53dfd8;
    --text-700: #7ee7e2;
    --text-800: #a9efec;
    --text-900: #d4f7f5;
    --text-950: #e9fbfa;

    --background: #000000;
    --background-50: #041514;
    --background-100: #082b29;
    --background-200: #105651;
    --background-300: #18817a;
    --background-400: #21aba2;
    --background-500: #29d6cb;
    --background-600: #54ded5;
    --background-700: #7ee7e0;
    --background-800: #a9efea;
    --background-900: #d4f7f5;
    --background-950: #eafbfa;

    --primary-50: #091010;
    --primary-100: #122120;
    --primary-200: #244240;
    --primary-300: #366360;
    --primary-400: #488480;
    --primary-500: #5ba4a0;
    --primary-600: #7bb7b3;
    --primary-700: #9cc9c6;
    --primary-800: #bddbd9;
    --primary-900: #deedec;
    --primary-950: #eff6f5;

    --secondary-50: #051114;
    --secondary-100: #0b2228;
    --secondary-200: #164450;
    --secondary-300: #216778;
    --secondary-400: #2c89a0;
    --secondary-500: #37abc8;
    --secondary-600: #5fbcd3;
    --secondary-700: #87cdde;
    --secondary-800: #afdde9;
    --secondary-900: #d7eef4;
    --secondary-950: #ebf7fa;

    --accent-50: #080a11;
    --accent-100: #111422;
    --accent-200: #222744;
    --accent-300: #323b67;
    --accent-400: #434f89;
    --accent-500: #5463ab;
    --accent-600: #7682bc;
    --accent-700: #98a1cd;
    --accent-800: #bbc0dd;
    --accent-900: #dde0ee;
    --accent-950: #eeeff7;

    --shadow: 0 10px 15px -3px rgb(100 100 100 / 0.2), 0 4px 6px -4px rgb(100 100 100 / 0.2);
    --dialog-background: #131313;

    --error-50: #160504;
    --error-100: #2c0907;
    --error-200: #57120f;
    --error-300: #831c16;
    --error-400: #ae251e;
    --error-500: #da2e25;
    --error-600: #e15851;
    --error-700: #e9827c;
    --error-800: #f0aba8;
    --error-900: #f8d5d3;
    --error-950: #fbeae9;

    --warn-50: #191000;
    --warn-100: #321f01;
    --warn-200: #653f01;
    --warn-300: #975e02;
    --warn-400: #ca7d02;
    --warn-500: #fc9d03;
    --warn-600: #fdb035;
    --warn-700: #fdc468;
    --warn-800: #fed89a;
    --warn-900: #feebcd;
    --warn-950: #fff5e6;

    --success-50: #061409;
    --success-100: #0c2712;
    --success-200: #174f24;
    --success-300: #237636;
    --success-400: #2f9d49;
    --success-500: #3bc45b;
    --success-600: #62d07c;
    --success-700: #89dc9c;
    --success-800: #b0e8bd;
    --success-900: #d8f3de;
    --success-950: #ebf9ef;

    --hero-radial-1: #969FCB;
    --hero-radial-2: #194D5A;
    --hero-radial-3: #041514;
    --hero-linear-1: #535353;
    --hero-linear-2: #10423f;
    --hero-linear-3: #000000;

    --skeleton-base: #333333;
    --skeleton-highlight: #4d4d4d;
  }
`;

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
    overflow-x: clip;
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
