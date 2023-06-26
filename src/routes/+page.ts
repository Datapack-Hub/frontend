import { apiURL } from "$lib/globals/consts";
import { projectSchema } from "$lib/globals/schema";
import type { PageLoad } from "./$types";
import { shuffle } from "lodash-es";

export const load = (async ({ fetch }) => {
  const randomReq = await fetch(apiURL + "/projects/random?count=3");
  const random = await projectSchema
    .array()
    .parseAsync((await randomReq.json()).result);

  const featuredReq = await fetch(apiURL + "/projects/featured");
  let featured = await projectSchema
    .array()
    .parseAsync((await featuredReq.json()).result);

  featured = shuffle(featured);
  featured = featured.slice(0, 3);

  const countRes = await fetch(apiURL + "/projects/count");
  const count = (await countRes.json()).count;
  return {
    random: random,
    featured: featured,
    count: count
  };
}) satisfies PageLoad;
