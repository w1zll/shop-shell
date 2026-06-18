const DEFAULT_API_ORIGIN = "http://localhost:4000";

export type ApiRewrite = {
  source: string;
  destination: string;
};

function normalizeOrigin(origin: string | undefined): string {
  const rawOrigin = origin?.trim() || DEFAULT_API_ORIGIN;
  const parsedOrigin = new URL(rawOrigin);

  return parsedOrigin.origin;
}

export function buildApiRewrites(apiOrigin = process.env.API_ORIGIN): ApiRewrite[] {
  const normalizedOrigin = normalizeOrigin(apiOrigin);

  return [
    {
      source: "/api/v1/:path*",
      destination: `${normalizedOrigin}/api/v1/:path*`,
    },
  ];
}
