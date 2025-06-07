import { styled } from '@pigment-css/react';

export const ON_MOBILE = "@media (max-width: 576px)";

export const PageMargin = styled("div")({
  margin: "0 var(--page-margin)",
})

// Sizes are from Figma
export function linearClamp(sizeAtMin: number, sizeAtMax: number, min = 320, max = 1440) {
  // Rem conversion
  sizeAtMax /= 16;
  sizeAtMin /= 16;
  
  const slope = (sizeAtMax - sizeAtMin) / (max - min);
  const yIntercept = sizeAtMin - slope * min;
  return `clamp(${sizeAtMin.toFixed(4)}rem, ${(slope * 1600).toFixed(4)}vw + ${yIntercept.toFixed(4)}rem, ${sizeAtMax.toFixed(4)}rem)`;
}

// CSS number to string, zero trimmed
export function strTrim0(n: number, decimal = 4) {
  const str: string = n.toFixed(decimal);
  let end = str.length;
  while(end > 0 && str[end - 1] === '0') {
    --end;
  }
  return str.slice(0, end);
}