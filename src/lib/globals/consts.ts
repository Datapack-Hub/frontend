export const apiURL = "https://api.datapackhub.net";

export const categories = [
  "Adventure",
  "Cosmetics",
  "Cursed",
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

export const roles = [
  "admin",
  "moderator",
  "helper",
  "verified",
  "nerd",
  "donator",
  "default"
];

export const minecraftVersions = [
  "1.13-1.14.4",
  "1.15-1.16.1",
  "1.16.2-1.16.5",
  "1.17.x",
  "1.18.x",
  "1.19-1.19.3",
  "1.19.4",
  "1.20-1.20.1"
];

export const badges = [
  {
    name: "betatester",
    description: "Given to those who participated in the initial closed beta",
    tippy: {
      content:
        '<b style="font-size:24;">Beta Tester</b><br />Given to those who participated in the initial closed beta',
      placement: "top",
      allowHTML: true
    }
  },
  {
    name: "contributor",
    description: "Developers and Contributors",
    tippy: {
      content:
        '<b style="font-size:24;">Contributor</b><br />Helped in the development of the site, whether that is through GitHub or development tasks.',
      placement: "top",
      allowHTML: true
    }
  },
  {
    name: "downloads-1000",
    description: "1000 Downloads",
    tippy: {
      content:
        '<b style="font-size:24;">1K Downloads</b><br />Awarded to people who have received over 1,000 total downloads',
      placement: "top",
      allowHTML: true
    }
  }
];
