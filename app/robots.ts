import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://dev-portfolio-beta-sandy.vercel.app/sitemap.xml", // update to match metadataBase
  };
}