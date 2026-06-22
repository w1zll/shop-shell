import { describe, expect, it } from "vitest";

import { buildRemoteAssetRewrites } from "./remote-asset-rewrites";

describe("buildRemoteAssetRewrites", () => {
  it("строит rewrites на локальные remotes по умолчанию", () => {
    expect(buildRemoteAssetRewrites(undefined, undefined)).toEqual([
      {
        source: "/mf/cart/:path*",
        destination: "http://localhost:3002/:path*",
      },
      {
        source: "/mf/account/:path*",
        destination: "http://localhost:3003/:path*",
      },
    ]);
  });

  it("нормализует origins remotes без path segments", () => {
    expect(
      buildRemoteAssetRewrites(
        " https://cart.example.com/base/path ",
        " https://account.example.com/app/ ",
      ),
    ).toEqual([
      {
        source: "/mf/cart/:path*",
        destination: "https://cart.example.com/:path*",
      },
      {
        source: "/mf/account/:path*",
        destination: "https://account.example.com/:path*",
      },
    ]);
  });

  it("throws for invalid remote origins", () => {
    expect(() => buildRemoteAssetRewrites("not a url", undefined)).toThrow(TypeError);
    expect(() => buildRemoteAssetRewrites(undefined, "not a url")).toThrow(TypeError);
  });
});
