import type { MetadataRoute } from "next";

function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://snapfridge.netlify.app/sitemap.xml",
  };
}

export default robots;
