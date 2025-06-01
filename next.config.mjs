import { withPigment } from "@pigment-css/nextjs-plugin";

export default withPigment({
  // ... Your nextjs config.
  images: {
    remotePatterns: [new URL('https://img.spoonacular.com/recipes/**')],
  }
});
