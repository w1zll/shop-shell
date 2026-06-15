import { describe, expect, it } from "vitest";

import { buildCatalogZoneRewrites } from "./catalog-zone-rewrites";

describe("buildCatalogZoneRewrites", () => {
  it("строит rewrites на локальную catalog zone по умолчанию", () => {
    expect(buildCatalogZoneRewrites(undefined)).toEqual([
      {
        source: "/catalog",
        destination: "http://localhost:3001/catalog",
      },
      {
        source: "/catalog/:path*",
        destination: "http://localhost:3001/catalog/:path*",
      },
      {
        source: "/category/:path*",
        destination: "http://localhost:3001/category/:path*",
      },
      {
        source: "/product/:path*",
        destination: "http://localhost:3001/product/:path*",
      },
      {
        source: "/search",
        destination: "http://localhost:3001/search",
      },
      {
        source: "/search/:path*",
        destination: "http://localhost:3001/search/:path*",
      },
      {
        source: "/catalog-static/:path*",
        destination: "http://localhost:3001/catalog-static/:path*",
      },
    ]);
  });

  it("нормализует origin без завершающего слеша и path", () => {
    expect(buildCatalogZoneRewrites(" https://catalog.example.com/app/ ")[0]).toEqual({
      source: "/catalog",
      destination: "https://catalog.example.com/catalog",
    });
  });
});
