import { apiURL } from "$lib/globals/consts";
import { projectSchema } from "$lib/globals/schema";
import { parallel, shuffle } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const [randomJson, featuredJson, countJson] = await parallel(
    3,
    await Promise.all([
      fetch(apiURL + "/projects/random?count=3"),
      fetch(apiURL + "/projects/featured"),
      fetch(apiURL + "/projects/count")
    ]),
    async res => await res.json()
  );

  const random = await projectSchema.array().parseAsync(randomJson.result);
  let featured = await projectSchema.array().parseAsync(featuredJson.result);

  featured = shuffle(featured);
  featured = featured.slice(0, 3);

  return {
    random: random,
    featured: featured,
    count: countJson.count
  };
}) satisfies PageLoad;
