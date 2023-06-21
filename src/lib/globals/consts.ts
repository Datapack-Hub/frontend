export const apiURL = "https://api.datapackhub.net";
export const categories = [
  "Adventure",
  "Magic",
  "Minecraft, but",
  "Cursed",
  "World Generation",
  "Tools & Equipment",
  "German",
  "Recipe",
  "Quality of Life",
  "Items & Blocks",
  "Cosmetics",
  "Miscellaneous",
  "Utility",
  "Vanilla+"
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

export const versions = [
  "1.13-1.14.4",
  "1.15-1.16.1",
  "1.16.2-1.16.5",
  "1.17.x",
  "1.18.x",
  "1.19-1.19.3",
  "1.19.4",
  "1.20"
];

export const badges = [
  {
    name: "betatester",
    description: "Given to people who participated in the initial closed beta of DatapackHub.net",
    tippy:{
      content:"<b style=\"font-size:24;\">Beta Tester</b><br />Given to people who participated in the initial closed beta of DatapackHub.net",
      placement:"top",
      allowHTML:true
    }
  },
  {
    name: "contributor",
    description: "Devlopers and contributors",
    tippy:{
      content:"<b style=\"font-size:24;\">Contributor</b><br />Have helped in the development of the site, whether that is through Github or development tasks.",
      placement:"top",
      allowHTML:true
    }
  }
]
