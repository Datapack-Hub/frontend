import { apiURL } from "$lib/globals/consts";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch, url }) => {
  let sp = 1
  if(typeof url.searchParams.get("page") == "string") {
    sp = parseInt(url.searchParams.get("page"))
  }
  const proj = await fetch(`${apiURL}/projects/?page=${sp}`);

  if (proj.ok) {
    const js = await proj.json()
    const data = js.result as Project[];
    const count = parseInt(js.pages)

    return {
      projects: data,
      pages: count,
      page: sp
    };
  }

  return {};
}) satisfies PageLoad;
