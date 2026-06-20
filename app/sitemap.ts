import type { MetadataRoute } from "next";

import { getSitemapCatalogData } from "../lib/home-data";
import { getPublicSiteUrl } from "../lib/site-url";

export const dynamic = "force-dynamic";

function createSitemapEntry(siteUrl: string, path: string): MetadataRoute.Sitemap[number] {
  return {
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: path === "/" ? 1 : 0.7,
    url: `${siteUrl}${path}`,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getPublicSiteUrl();
  const entries: MetadataRoute.Sitemap = [
    createSitemapEntry(siteUrl, "/"),
    createSitemapEntry(siteUrl, "/catalog"),
  ];

  try {
    const { categories, products } = await getSitemapCatalogData();

    entries.push(
      ...categories.map((category) => createSitemapEntry(siteUrl, `/category/${category.slug}`)),
      ...products.map((product) => createSitemapEntry(siteUrl, `/product/${product.slug}`)),
    );
  } catch {
    // Sitemap остается валидным во время cold start API и заполнит динамические URL позже.
  }

  return entries;
}
