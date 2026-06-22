const DEFAULT_CART_REMOTE_ORIGIN = "http://localhost:3002";
const DEFAULT_ACCOUNT_REMOTE_ORIGIN = "http://localhost:3003";

export type RemoteAssetRewrite = {
  source: string;
  destination: string;
};

function normalizeOrigin(origin: string | undefined, fallback: string): string {
  const rawOrigin = origin?.trim() || fallback;
  const parsedOrigin = new URL(rawOrigin);

  return parsedOrigin.origin;
}

export function buildRemoteAssetRewrites(
  cartRemoteOrigin = process.env.CART_REMOTE_ORIGIN,
  accountRemoteOrigin = process.env.ACCOUNT_REMOTE_ORIGIN,
): RemoteAssetRewrite[] {
  const normalizedCartOrigin = normalizeOrigin(cartRemoteOrigin, DEFAULT_CART_REMOTE_ORIGIN);
  const normalizedAccountOrigin = normalizeOrigin(accountRemoteOrigin, DEFAULT_ACCOUNT_REMOTE_ORIGIN);

  return [
    {
      source: "/mf/cart/:path*",
      destination: `${normalizedCartOrigin}/:path*`,
    },
    {
      source: "/mf/account/:path*",
      destination: `${normalizedAccountOrigin}/:path*`,
    },
  ];
}
