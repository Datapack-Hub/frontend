import { apiURL } from "$lib/globals/consts";
import { projectSchema } from "$lib/globals/schema";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch, url }) => {
  let sp = 1;
  if (url.searchParams.has("page")) {
    sp = parseInt(url.searchParams.get("page") ?? "1");
  }
  const proj = await fetch(`${apiURL}/projects/?page=${sp}`);

  if (proj.ok) {
    const js = await proj.json();
    const data = projectSchema.array().parse(js.result);
    const count = parseInt(js.pages);

    return {
      projects: data,
      pages: count,
      page: sp
    };
  }

  return {
    page: 0,
    pages: 0
  };
}) satisfies PageLoad;
