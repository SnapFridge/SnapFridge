import { withPigment } from "@pigment-css/nextjs-plugin";

export default withPigment({
  experimental: {
    reactCompiler: true,
    webpackBuildWorker: true,
    webpackMemoryOptimizations: true,

    optimizePackageImports: [
      "@google/genai",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-toast",
      "downshift",
      "heic-d-code",
      "immer",
      "lucide-react",
      "motion",
      "next",
      "next-themes",
      "radix-ui",
      "react",
      "react-dom",
      "react-loading-skeleton",
      "react-spinners",
      "use-immer",
    ],
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },

  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      layers: true,
      topLevelAwait: true,
    };
    return config;
  },

  images: {
    remotePatterns: [new URL("https://img.spoonacular.com/recipes/**")],
  },
  distDir: "build",
});
