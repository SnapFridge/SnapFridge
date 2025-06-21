import { withPigment } from "@pigment-css/nextjs-plugin";

export default withPigment({
  experimental: {
    webpackBuildWorker: true,
    optimizePackageImports: [
      "@google/genai",
      "@radix-ui/react-dropdown-menu",
      "radix-ui",
      "react-loading-skeleton",
      "motion",
      "next",
      "next-themes",
    ],
  },

  images: {
    remotePatterns: [new URL('https://img.spoonacular.com/recipes/**')],
  },
  distDir: "build"
});
