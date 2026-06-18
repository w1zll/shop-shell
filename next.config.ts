import type { NextConfig } from "next";

import { buildApiRewrites } from "./lib/api-rewrites";
import { buildCatalogZoneRewrites } from "./lib/catalog-zone-rewrites";

const nextConfig: NextConfig = {
  typedRoutes: true,
  rewrites() {
    return [...buildApiRewrites(), ...buildCatalogZoneRewrites()];
  },
};

export default nextConfig;
