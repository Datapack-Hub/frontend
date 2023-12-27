/** Shorthand for the API link */
// http://localhost:5000
// https://api.datapackhub.net
export const API = "https://api.datapackhub.net";

/** All supported categories */
export const categories = [
  "Adventure",
  "Cosmetics",
  "Cursed",
  "Challenge",
  "Items & Blocks",
  "Magic",
  "Minecraft but",
  "Miscellaneous",
  "Quality of Life",
  "Recipe",
  "Tools & Equipment",
  "Utility",
  "Vanilla+",
  "World Generation"
];

/** All role names */
export const roleNames = [
  "admin",
  "moderator",
  "helper",
  "verified",
  "nerd",
  "donator",
  "default"
];

export type FeaturedProjectTypes =
  | "random"
  | "featured"
  | "popular"
  | "new"
  | undefined;
