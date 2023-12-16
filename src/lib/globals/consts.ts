/** Shorthand for the API link */
// http://localhost:5000
// https://api.datapackhub.net
export const API = "http://localhost:3000";

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

export const dpPackFormats = [
  { format: 4, label: "1.13" },
  { format: 5, label: "1.15" },
  { format: 6, label: "1.16.2" },
  { format: 7, label: "1.17" },
  { format: 8, label: "1.18" },
  { format: 9, label: "1.18.2" },
  { format: 10, label: "1.19" },
  { format: 12, label: "1.19.4" },
  { format: 15, label: "1.20" },
  { format: 18, label: "1.20.2" },
  { format: 26, label: "1.20.3-pre1" }
];

export type FeaturedProjectTypes =
  | "random"
  | "featured"
  | "popular"
  | "new"
  | undefined;
