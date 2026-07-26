export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://wigtn.github.io/wigtn-tech-report"
).replace(/\/$/, "");

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string) {
  return `${BASE_PATH}${path}`;
}
