import type { PageServerLoad } from "./$types";

const links = [
  "https://raw.githubusercontent.com/Datapack-Hub/bot/main/method/array%20iteration.md",
  "https://raw.githubusercontent.com/Datapack-Hub/bot/main/method/random%20number.md",
  "https://raw.githubusercontent.com/Datapack-Hub/bot/main/method/raycast.md",
  "https://raw.githubusercontent.com/Datapack-Hub/bot/main/method/rightclick%20detection%20coas.md",
  "https://raw.githubusercontent.com/Datapack-Hub/bot/main/method/rightclick%20detection%20eoe.md",
  "https://raw.githubusercontent.com/Datapack-Hub/bot/main/method/rightclick%20detection%20interaction.md",
  "https://raw.githubusercontent.com/Datapack-Hub/bot/main/method/rightclick%20detection.md",
];

export const load = (async () => {
  const content = []

  for (const link of links) {
    const file = await fetch(link);
    content.push({ title: decodeURIComponent(link).split("/").at(-1)!, content: await file.text() });
  }

  return {
    content
  };
}) satisfies PageServerLoad;
