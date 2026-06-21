import { describe, expect, it } from "vitest";

import { buildApiRewrites } from "./api-rewrites";

describe("buildApiRewrites", () => {
  it("строит rewrite на локальный API по умолчанию", () => {
    expect(buildApiRewrites(undefined)).toEqual([
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:4000/api/v1/:path*",
      },
    ]);
  });

  it("нормализует API origin без завершающего path", () => {
    expect(buildApiRewrites(" https://api.example.com/internal/ ")).toEqual([
      {
        source: "/api/v1/:path*",
        destination: "https://api.example.com/api/v1/:path*",
      },
    ]);
  });

  it("keeps protocol, host and port while dropping path segments", () => {
    expect(buildApiRewrites("http://api.example.com:4100/base/path")).toEqual([
      {
        source: "/api/v1/:path*",
        destination: "http://api.example.com:4100/api/v1/:path*",
      },
    ]);
  });

  it("throws for invalid API origins", () => {
    expect(() => buildApiRewrites("not a url")).toThrow(TypeError);
  });
});
