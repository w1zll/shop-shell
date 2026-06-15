import type { NextConfig } from "next";

import { buildCatalogZoneRewrites } from "./lib/catalog-zone-rewrites";

const nextConfig: NextConfig = {
  typedRoutes: true,
  rewrites() {
    return buildCatalogZoneRewrites();
  },
};

export default nextConfig;
