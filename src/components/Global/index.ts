export const ON_MOBILE = "@media (max-width: 576px)";

// Sizes are from Figma
export function linearClamp(sizeAtMin: number, sizeAtMax: number, min = 320, max = 1440) {
  // Rem conversion
  sizeAtMax /= 16;
  sizeAtMin /= 16;
  
  const slope = (sizeAtMax - sizeAtMin) / (max - min);
  const yIntercept = sizeAtMin - slope * min;
  return `clamp(${sizeAtMin.toFixed(4)}rem, ${(slope * 1600).toFixed(4)}vw + ${yIntercept.toFixed(4)}rem, ${sizeAtMax.toFixed(4)}rem)`;
}