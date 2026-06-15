const DEFAULT_CATALOG_ORIGIN = "http://localhost:3001";

export type CatalogZoneRewrite = {
  source: string;
  destination: string;
};

const catalogRouteSources = [
  "/catalog",
  "/catalog/:path*",
  "/category/:path*",
  "/product/:path*",
  "/search",
  "/search/:path*",
  "/catalog-static/:path*",
] as const;

function normalizeOrigin(origin: string | undefined): string {
  const rawOrigin = origin?.trim() || DEFAULT_CATALOG_ORIGIN;
  const parsedOrigin = new URL(rawOrigin);

  return parsedOrigin.origin;
}

export function buildCatalogZoneRewrites(
  catalogOrigin = process.env.CATALOG_ORIGIN,
): CatalogZoneRewrite[] {
  const normalizedOrigin = normalizeOrigin(catalogOrigin);

  return catalogRouteSources.map((source) => ({
    source,
    destination: `${normalizedOrigin}${source}`,
  }));
}
