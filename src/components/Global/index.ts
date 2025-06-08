import { styled } from '@pigment-css/react';

export const MIN_SUPPORTED_WIDTH = 320
export const MAX_SUPPORTED_WIDTH = 1920
export const MOBILE_BREAKPOINT = 576

export const ON_MOBILE = `@media (max-width: ${MOBILE_BREAKPOINT}px)`;

export const PageMargin = styled("div")({
  margin: "0 var(--page-margin)",
})

// Sizes are from Figma
export function scaledClamp(sizeAtMin: number, sizeAtMax: number, 
  min = MIN_SUPPORTED_WIDTH, max = MAX_SUPPORTED_WIDTH) {

  // Rem conversion
  sizeAtMax /= 16;
  sizeAtMin /= 16;

  function round(num: number, places = 4) {
    const factor = Math.pow(10, places);
    return Math.round((num + Number.EPSILON) * factor) / factor;
  }
  
  const slope = (sizeAtMax - sizeAtMin) / (max - min);
  const yIntercept = round(sizeAtMin - slope * min);
  return `clamp(${round(sizeAtMin)}rem, ${round(slope * 1600)}vw + ${yIntercept}rem, ${round(sizeAtMax)}rem)`;
}