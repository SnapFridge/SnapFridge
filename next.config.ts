import { withPigment } from "@pigment-css/nextjs-plugin";

export default withPigment({
  experimental: {
    typedRoutes: true,
    useLightningcss: true,
    reactCompiler: true,
    webpackBuildWorker: true,
    webpackMemoryOptimizations: true,

    optimizePackageImports: [
      "@google/genai",
      "@radix-ui/react-dialog",
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
  },
  poweredByHeader: false,

  // TODO: Add CSP
  async headers() {
    return [];
  },

  webpack(config) {
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
