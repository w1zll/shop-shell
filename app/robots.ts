import type { MetadataRoute } from "next";

import { getPublicSiteUrl } from "../lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getPublicSiteUrl();

  return {
    rules: {
      allow: ["/", "/catalog", "/category", "/product"],
      disallow: ["/cart", "/checkout", "/account", "/login", "/register", "/search"],
      userAgent: "*",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
