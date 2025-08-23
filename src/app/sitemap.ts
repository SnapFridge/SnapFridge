import type { MetadataRoute } from "next";

function sitemap() {
  const map: MetadataRoute.Sitemap = [
    {
      url: "",
      priority: 1,
    },
    {
      url: "snap",
      priority: 1,
    },
    {
      url: "login",
      priority: 0.75,
    },
    {
      url: "about",
      priority: 0.75,
    },
    {
      url: "privacy-policy",
      priority: 0.5,
    },
    {
      url: "credits",
      priority: 0.5,
    },
  ];
  const now = new Date();
  for (const site of map) {
    site.url = `https://snapfridge.netlify.app/${site.url}`;
    site.lastModified = now;
  }
  return map;
}

export default sitemap;
