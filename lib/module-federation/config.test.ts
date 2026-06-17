import { describe, expect, it, vi } from "vitest";

import {
  DEFAULT_ACCOUNT_MANIFEST_URL,
  DEFAULT_CART_MANIFEST_URL,
  getAccountManifestUrl,
  getCartManifestUrl,
} from "./config";

describe("module federation config", () => {
  it("использует локальные manifest URL по умолчанию", () => {
    vi.stubEnv("NEXT_PUBLIC_CART_MANIFEST_URL", "");
    vi.stubEnv("NEXT_PUBLIC_ACCOUNT_MANIFEST_URL", " ");

    expect(getCartManifestUrl()).toBe(DEFAULT_CART_MANIFEST_URL);
    expect(getAccountManifestUrl()).toBe(DEFAULT_ACCOUNT_MANIFEST_URL);
  });

  it("читает публичные manifest URL из окружения", () => {
    vi.stubEnv("NEXT_PUBLIC_CART_MANIFEST_URL", "http://localhost:4102/mf-manifest.json");
    vi.stubEnv("NEXT_PUBLIC_ACCOUNT_MANIFEST_URL", "http://localhost:4103/mf-manifest.json");

    expect(getCartManifestUrl()).toBe("http://localhost:4102/mf-manifest.json");
    expect(getAccountManifestUrl()).toBe("http://localhost:4103/mf-manifest.json");
  });
});
