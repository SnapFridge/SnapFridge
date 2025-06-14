import { styled } from '@pigment-css/react';

export const MOBILE_BREAKPOINT = 576
const MIN_SUPPORTED_WIDTH = 320
export const MAX_SUPPORTED_WIDTH = 1920

export const ON_MOBILE = `@media (max-width: ${MOBILE_BREAKPOINT}px)`;

export const PageMargin = styled("div")({
  margin: "0 var(--page-margin)",
})

// Sizes are from Figma

function round(num: number, places = 4) {
  const factor = Math.pow(10, places);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}
export function scaleClamped(sizeAtMin: number, sizeAtMax: number, 
  rem: boolean = true, min = MIN_SUPPORTED_WIDTH, max = MAX_SUPPORTED_WIDTH) {
  if(rem) {
    sizeAtMax /= 16;
    sizeAtMin /= 16;
  }
  const slope = (sizeAtMax - sizeAtMin) / (max - min);
  const yIntercept = round(sizeAtMin - slope * min);
  const unit = rem ? "rem" : "px";
  return `clamp(${round(sizeAtMin)}${unit}, ${round(slope * (rem ? 1600 : 100))}vw + ${yIntercept}${unit}, ${round(sizeAtMax)}${unit})`
}

export function scaleClampedDesktop(sizeAtMin: number, sizeAtMax: number) {
  return scaleClamped(sizeAtMin, sizeAtMax, false, MOBILE_BREAKPOINT);
}

export function scaleClampedMobile(sizeAtMin: number, sizeAtMax: number) {
  return scaleClamped(sizeAtMin, sizeAtMax, false, MIN_SUPPORTED_WIDTH, MOBILE_BREAKPOINT);
}