const DEFAULT_SITE_URL = "http://localhost:3000";

export function getPublicSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL) {
  const rawValue = value?.trim() || DEFAULT_SITE_URL;
  const parsedUrl = new URL(rawValue);

  return parsedUrl.origin;
}
