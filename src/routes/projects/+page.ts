import { apiURL } from "$lib/globals/consts";
import { projectSchema } from "$lib/globals/schema";
import type { PageLoad } from "./$types";

function shuffle(array: any[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const load = (async ({ fetch, url }) => {
  let sp = 1;
  if (url.searchParams.has("page")) {
    sp = parseInt(url.searchParams.get("page") ?? "1");
  }
  const proj = await fetch(`${apiURL}/projects/?page=${sp}`);
  const feat = await fetch(`${apiURL}/projects/featured`);

  if (proj.ok) {
    const js = await proj.json();
    const fjs = await feat.json();
    const data = projectSchema.array().parse(js.result);
    const featured = projectSchema.array().parse(fjs.result);
    const count = parseInt(js.pages);

    return {
      projects: data,
      pages: count,
      featured:shuffle(featured),
      page: sp
    };
  }

  return {
    page: 0,
    pages: 0
  };
}) satisfies PageLoad;
