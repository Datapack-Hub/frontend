import { apiURL } from "$lib/globals/consts";
import { projectSchema } from "$lib/globals/schema";
import { shuffle } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch, url }) => {
  const params = url.searchParams;
  let sp = 1;
  if (params.has("page")) sp = parseInt(params.get("page") ?? "1");
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
