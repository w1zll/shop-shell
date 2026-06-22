import type { NextConfig } from "next";

import { buildApiRewrites } from "./lib/api-rewrites";
import { buildCatalogZoneRewrites } from "./lib/catalog-zone-rewrites";
import { buildRemoteAssetRewrites } from "./lib/remote-asset-rewrites";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
    ],
  },
  typedRoutes: true,
  rewrites() {
    return [...buildApiRewrites(), ...buildCatalogZoneRewrites(), ...buildRemoteAssetRewrites()];
  },
};

export default nextConfig;
