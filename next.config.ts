import { extendTheme, withPigment } from "@pigment-css/nextjs-plugin";

const theme = extendTheme({
  colorSchemes: {
    light: {
      text: {
        50: "#e9fbfa",
        100: "#d4f7f5",
        200: "#a9efec",
        300: "#7ee7e2",
        400: "#53dfd8",
        500: "#28d7cf",
        600: "#20aca5",
        700: "#18817c",
        800: "#105653",
        900: "#082b29",
        950: "#041615",
      },
      background: {
        0: "#FFFFFF",
        50: "#eafbfa",
        100: "#d4f7f5",
        200: "#a9efea",
        300: "#7ee7e0",
        400: "#54ded5",
        500: "#29d6cb",
        600: "#21aba2",
        700: "#18817a",
        800: "#105651",
        900: "#082b29",
        950: "#041514",
      },
      primary: {
        50: "#eff6f5",
        100: "#deedec",
        200: "#bddbd9",
        300: "#9cc9c6",
        400: "#7bb7b3",
        500: "#5ba4a0",
        600: "#488480",
        700: "#366360",
        800: "#244240",
        900: "#122120",
        950: "#091010",
      },
      secondary: {
        50: "#ebf6fa",
        100: "#d7eef4",
        200: "#afdce9",
        300: "#87cbde",
        400: "#5fbad3",
        500: "#37a9c8",
        600: "#2c87a0",
        700: "#216578",
        800: "#164350",
        900: "#0b2228",
        950: "#051114",
      },
      accent: {
        50: "#eeeff7",
        100: "#dde0ee",
        200: "#bbc0dd",
        300: "#98a1cd",
        400: "#7682bc",
        500: "#5463ab",
        600: "#434f89",
        700: "#323b67",
        800: "#222744",
        900: "#111422",
        950: "#080a11",
      },
      error: {
        50: "#fbeae9",
        100: "#f8d5d3",
        200: "#f0aba8",
        300: "#e9827c",
        400: "#e15851",
        500: "#da2e25",
        600: "#ae251e",
        700: "#831c16",
        800: "#57120f",
        900: "#2c0907",
        950: "#160504",
      },
      warn: {
        50: "#fff5e6",
        100: "#feebcd",
        200: "#fed89a",
        300: "#fdc468",
        400: "#fdb035",
        500: "#fc9d03",
        600: "#ca7d02",
        700: "#975e02",
        800: "#653f01",
        900: "#321f01",
        950: "#191000",
      },
      success: {
        50: "#ebf9ef",
        100: "#d8f3de",
        200: "#b0e8bd",
        300: "#89dc9c",
        400: "#62d07c",
        500: "#3bc45b",
        600: "#2f9d49",
        700: "#237636",
        800: "#174f24",
        900: "#0c2712",
        950: "#061409",
      },
      hero: {
        radial: {
          1: "#969FCB",
          2: "#3ec1e3",
          3: "#28cac0",
        },
        linear: {
          1: "#b8b8b8",
          2: "#FFFFFF",
          3: "#FFFFFF",
        },
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
      skeleton: {
        base: "#ebebeb",
        highlight: "#f5f5f5",
      },
      shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    },
    dark: {
      text: {
        50: "#041615",
        100: "#082b29",
        200: "#105653",
        300: "#18817c",
        400: "#20aca5",
        500: "#28d7cf",
        600: "#53dfd8",
        700: "#7ee7e2",
        800: "#a9efec",
        900: "#d4f7f5",
        950: "#e9fbfa",
      },
      background: {
        0: "#000000",
        50: "#041514",
        100: "#082b29",
        200: "#105651",
        300: "#18817a",
        400: "#21aba2",
        500: "#29d6cb",
        600: "#54ded5",
        700: "#7ee7e0",
        800: "#a9efea",
        900: "#d4f7f5",
        950: "#eafbfa",
      },
      primary: {
        50: "#091010",
        100: "#122120",
        200: "#244240",
        300: "#366360",
        400: "#488480",
        500: "#5ba4a0",
        600: "#7bb7b3",
        700: "#9cc9c6",
        800: "#bddbd9",
        900: "#deedec",
        950: "#eff6f5",
      },
      secondary: {
        50: "#051114",
        100: "#0b2228",
        200: "#164450",
        300: "#216778",
        400: "#2c89a0",
        500: "#37abc8",
        600: "#5fbcd3",
        700: "#87cdde",
        800: "#afdde9",
        900: "#d7eef4",
        950: "#ebf7fa",
      },
      accent: {
        50: "#080a11",
        100: "#111422",
        200: "#222744",
        300: "#323b67",
        400: "#434f89",
        500: "#5463ab",
        600: "#7682bc",
        700: "#98a1cd",
        800: "#bbc0dd",
        900: "#dde0ee",
        950: "#eeeff7",
      },
      error: {
        50: "#160504",
        100: "#2c0907",
        200: "#57120f",
        300: "#831c16",
        400: "#ae251e",
        500: "#da2e25",
        600: "#e15851",
        700: "#e9827c",
        800: "#f0aba8",
        900: "#f8d5d3",
        950: "#fbeae9",
      },
      warn: {
        50: "#191000",
        100: "#321f01",
        200: "#653f01",
        300: "#975e02",
        400: "#ca7d02",
        500: "#fc9d03",
        600: "#fdb035",
        700: "#fdc468",
        800: "#fed89a",
        900: "#feebcd",
        950: "#fff5e6",
      },
      success: {
        50: "#061409",
        100: "#0c2712",
        200: "#174f24",
        300: "#237636",
        400: "#2f9d49",
        500: "#3bc45b",
        600: "#62d07c",
        700: "#89dc9c",
        800: "#b0e8bd",
        900: "#d8f3de",
        950: "#ebf9ef",
      },
      hero: {
        radial: {
          1: "#969FCB",
          2: "#194D5A",
          3: "#041514",
        },
        linear: {
          1: "#535353",
          2: "#10423f",
          3: "#000000",
        },
      },
      gray: {
        50: "#030712",
        100: "#111827",
        200: "#1f2937",
        300: "#374151",
        400: "#4b5563",
        500: "#6b7280",
        600: "#9ca3af",
        700: "#d1d5db",
        800: "#e5e7eb",
        900: "#f3f4f6",
        950: "#f9fafb",
      },
      skeleton: {
        base: "#333333",
        highlight: "#4d4d4d",
      },
      shadow:
        "0 10px 15px -3px rgb(100 100 100 / 0.2), 0 4px 6px -4px rgb(100 100 100 / 0.2)",
    },
  },
  getSelector: (theme) => `:root${theme === "dark" ? ".dark" : ""}`,
});

const devEnv = process.env.NODE_ENV === "development";
const CSP = `
  default-src 'self';
  img-src 'self' https://img.spoonacular.com blob:;
  script-src 'self' 'unsafe-inline' ${devEnv ? "'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline' ${devEnv ? "'unsafe-eval'" : ""};
  object-src 'none';
  frame-src 'none';
  frame-ancestors 'none';
  media-src 'none';
  manifest-src 'none';
  sandbox allow-forms allow-scripts allow-same-origin;
  upgrade-insecure-requests;
 `.replace(/\s{2,}/g, " ");

export default withPigment(
  {
    experimental: {
      inlineCss: true,
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
        "swr",
        "use-immer",
      ],
    },
    poweredByHeader: false,
    productionBrowserSourceMaps: true,

    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Cross-Origin-Embedder-Policy",
              value: "require-corp",
            },
            // Allow popups for OAUTH
            {
              key: "Cross-Origin-Opener-Policy",
              value: "same-origin-allow-popups",
            },
            {
              key: "Content-Security-Policy",
              value: CSP,
            },
          ],
        },
      ];
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
  },
  {
    theme,
  }
);
