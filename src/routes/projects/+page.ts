import { apiURL } from "$lib/globals/consts";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const proj = await fetch(`${apiURL}/projects/`);

  if (proj.ok) {
    const data = (await proj.json()).result as Project[];

    return {
      projects: data
    };
  }

  return {};
}) satisfies PageLoad;
