/** Shorthand for the API link */
export const API = "https://api.datapackhub.net";

/** All supported categories */
export const categories = [
  "Adventure",
  "Cosmetics",
  "Cursed",
  "Challenge",
  "German",
  "Items & Blocks",
  "Magic",
  "Minecraft, but",
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

/** All Minecraft Versions */
export const minecraftVersions = [
  "1.13",
  "1.15",
  "1.16.2",
  "1.17.x",
  "1.18",
  "1.18.2",
  "1.19",
  "1.19.4",
  "1.20",
  "1.20.2"
];

export type FeaturedProjectTypes =
  | "random"
  | "featured"
  | "popular"
  | "new"
  | undefined;
