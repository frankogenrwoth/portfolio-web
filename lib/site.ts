export const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, "") ?? "https://frankogenrwoth.dev";

export const SITE_NAME = "frankogenrwoth";
export const SITE_TITLE = "Software Engineer";
export const SITE_DESCRIPTION =
  "frankogenrwoth is a full-stack software engineer building production web applications with Django, FastAPI, Flask and React.";

export const DEFAULT_OG_IMAGE = "/assets/frankogenrwoth.webp";

export const AUTHOR = {
  name: "Ogenrwoth Jim Frank",
  shortName: "frankogenrwoth",
  email: "ogenrwothjimfrank@gmail.com",
  url: SITE_URL,
  sameAs: [
    "https://github.com/frankogenrwoth",
    "https://linkedin.com/in/ogenrwoth-jim-frank",
    "https://x.com/frankogenrwoth",
    "https://linktr.ee/frankogenrwoth",
  ],
  jobTitle: "Software Engineer",
  location: "Kampala, Uganda",
} as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
