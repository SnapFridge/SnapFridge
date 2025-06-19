import { withPigment } from "@pigment-css/nextjs-plugin";

export default withPigment({
  // Neccessary for decoder
  webpack: (cfg) => {
    cfg.experiments = {
      layers: true,
      topLevelAwait: true
    };
    return cfg;
  },
  images: {
    remotePatterns: [new URL('https://img.spoonacular.com/recipes/**')],
  },
  distDir: "build"
});
