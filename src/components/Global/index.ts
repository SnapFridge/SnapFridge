export const ON_MOBILE = "@media (max-width: 576px)";

// Sizes are from Figma
export function linearClamp(sizeAtMin: number, sizeAtMax: number) {
  const MIN_SUPPORTED_WIDTH = 320;
  const MAX_SUPPORTED_WIDTH = 1440;
  
  // Rem conversion
  sizeAtMax /= 16;
  sizeAtMin /= 16;
  
  const slope = (sizeAtMax - sizeAtMin) / (MAX_SUPPORTED_WIDTH - MIN_SUPPORTED_WIDTH);
  const yIntercept = sizeAtMin - slope * MIN_SUPPORTED_WIDTH;
  return `clamp(${sizeAtMin.toFixed(4)}rem, ${(slope * 1600).toFixed(4)}vw + ${yIntercept.toFixed(4)}rem, ${sizeAtMax.toFixed(4)}rem)`;
}