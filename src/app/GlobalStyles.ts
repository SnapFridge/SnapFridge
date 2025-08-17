/* eslint-disable @typescript-eslint/no-unused-expressions */

import { globalCss } from "@pigment-css/react";
import { MAX_SUPPORTED_WIDTH, scaleClamped } from "@utils";

globalCss`
  :root {
    --nav-height: 5rem;  /* 80px / 16 */
    --nav-margin: 1.25rem;  /* 20px / 16 */
    --page-margin: ${scaleClamped(15, 110)};
    --1rem: ${scaleClamped(14, 22)};
    --1-25rem: ${scaleClamped(17, 27)};
    
    @media (pointer: coarse) {
      --click-target-minimum: 44px;
    }
  }

  body {
    font-weight: 410;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background: var(--background-0);
    color: var(--text-950);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;

    @media (min-width: ${MAX_SUPPORTED_WIDTH}px) {
      width: ${MAX_SUPPORTED_WIDTH}px;
      margin: auto;
    }
  }

  main {
    flex: 1;
  }

  /* Global Resets */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
  }

  /* Element Defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    text-wrap: balance;
  }

  ul {
    list-style: none;
  }

  /* Input Styling */
  input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
