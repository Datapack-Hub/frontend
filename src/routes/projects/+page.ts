import { apiURL } from "$lib/globals/consts";
import { projectSchema } from "$lib/globals/schema";
import type { PageLoad } from "./$types";
import { shuffle } from "radash";

export const load = (async ({ fetch, url }) => {
  let sp = 1;
  if (url.searchParams.has("page"))
    sp = parseInt(url.searchParams.get("page") ?? "1");
  const projectsReq = await fetch(`${apiURL}/projects/?page=${sp}`);
  const featuredReq = await fetch(`${apiURL}/projects/featured`);

  if (projectsReq.ok) {
    const projects = await projectsReq.json();
    const featured = projectSchema
      .array()
      .parse((await featuredReq.json()).result);
    const data = projectSchema.array().parse(projects.result);
    const count = parseInt(projects.pages);

    return {
      projects: data,
      pages: count,
      featured: shuffle(featured),
      page: sp
    };
  }

  return {
    page: 0,
    pages: 0
  };
}) satisfies PageLoad;
